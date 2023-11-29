# EasySwim - Sphinx Documentation

### Step 1: Build the documentation

Once you've written your documentation, build it using Sphinx:


```bash
sphinx-build -b html ./source ./build
```

This command generates HTML output in the `build` directory based on the `.rst` files in the `source` directory.

### Step 2: View your generated documentation

Open the generated HTML files located in the `build/html` directory using a web browser to view your documentation. The `index.html` file is the main entry point for your documentation.You can do it using this commands:

```bash
cd  ./build
open index.txt
```