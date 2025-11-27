import os

def update_nav_classes():
    base_path = "."

    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith(".html"):
                full_path = os.path.join(root, file)

                with open(full_path, "r", encoding="utf8") as f:
                    content = f.read()

                new_content = content.replace(
                    "navbar-expand-lg",
                    "navbar-expand-xl"
                )

                if new_content != content:
                    with open(full_path, "w", encoding="utf8") as f:
                        f.write(new_content)
                    print("updated:", full_path)
                else:
                    print("no change:", full_path)

update_nav_classes()
