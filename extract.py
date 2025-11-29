import re
import os

def extract_site():
    with open('legacy_index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract CSS
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    if style_match:
        css_content = style_match.group(1)
        with open('css/styles.css', 'w', encoding='utf-8') as f:
            f.write(css_content)
        print("CSS extracted to css/styles.css")
    else:
        print("No CSS found")

    # Extract Body Content
    # We want everything inside <body>...</body>
    # But we also want to preserve the scripts at the end, or handle them separately.
    
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    if body_match:
        body_content = body_match.group(1)
        
        # Extract scripts from body
        scripts = []
        def replace_script(match):
            scripts.append(match.group(0))
            return ""
            
        # Remove scripts from body content to place them cleanly later or keep them?
        # The user wants a clean build. 
        # Let's keep external scripts in the HTML but move inline scripts if any.
        # Looking at the file, they are external scripts.
        # We can just keep the body content as is, but maybe clean it up.
        
        # Actually, let's just create the new index.html with the extracted body
        # and link to the new CSS.
        
        new_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monk Agency</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    {body_content}
    <script src="js/scripts.js"></script>
</body>
</html>"""
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("HTML extracted to index.html")
        
        # Check for scripts to put in js/scripts.js
        # If there were inline scripts, we'd move them.
        # The original file had external scripts. We should probably keep them in the HTML
        # or download them? The user said "use the file... to clone".
        # Usually cloning means keeping functionality.
        # The external scripts are jquery and webflow.js. We should keep those links.
        # I'll modify the regex to finding scripts and appending them to the body of new html
        
        # Let's re-read the body content and NOT remove scripts, but we need to make sure
        # we don't duplicate the js/scripts.js reference if I added it.
        
    else:
        print("No Body found")

if __name__ == "__main__":
    extract_site()
