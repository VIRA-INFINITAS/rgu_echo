import os
import re

head_template = """
<head>
    <script defer src="js/seo.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ADD_TEXT">
    <title>RGU Echo | Mental Health Support for Students</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet">
    <meta name="robots" content="index, follow">
    <meta name="keywords" content="ADD_TEXT">
</head>
""".strip()


def clean_single_line_links(html):
    # This collapses multi line <link ...> into one line
    html = re.sub(r"<link[^>]+>", lambda m: re.sub(r"\s+", " ", m.group(0)), html)
    return html


def replace_head_block(html):
    # Find existing head block
    head_pattern = re.compile(r"<head>.*?</head>", re.DOTALL | re.IGNORECASE)

    if head_pattern.search(html):
        new_html = head_pattern.sub(head_template, html)
    else:
        # If missing (rare) just insert at top
        new_html = head_template + html

    return new_html


def process_html_file(path):
    with open(path, "r", encoding="utf8") as f:
        html = f.read()

    html = replace_head_block(html)
    html = clean_single_line_links(html)

    with open(path, "w", encoding="utf8") as f:
        f.write(html)

    print("Fixed:", path)


# Run for all html files in this folder
for file in os.listdir("."):
    if file.lower().endswith(".html"):
        process_html_file(file)
