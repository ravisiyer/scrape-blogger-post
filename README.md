### Blogger Post HTML Scraper & Backup Utility

This Node.js script allows you to scrape the HTML content of a Blogger post from its public URL. It can be used to extract just the post HTML content or to create a full, self-contained HTML document for backup purposes.

#### About 'Post HTML'

By 'Post HTML', I mean the HTML content shown in Blogger's Edit Post in 'HTML View'. This is the raw markup that represents the content of a single blog post, separate from the blog post title and surrounding blog template or design.

#### Disclaimer

This tool is intended for personal use and for scraping content from your own blog. Web scraping can be a sensitive topic. Please be a good web citizen and check the website's `robots.txt` file and terms of service before using this script on any other website.

#### Features

* **Post HTML Content Extraction:** Fetches and extracts only the HTML content of the main blog post body. This is useful to edit the HTML of a post in an external editor like VS Code and then paste it back into Blogger's HTML view. Note that Blogger's Edit Post HTML view is limited in its editing capabilities.

* **Full HTML Backup:** Creates a complete, self-contained HTML document with a clean filename based on the post's title.

* **Safe:** Includes a pre-write file existence check to prevent accidental overwrites.

* **Character Encoding:** Correctly handles UTF-8 characters, preventing corruption when saving to a file.

* **HTML5 Conversion:** The script uses Cheerio to parse the HTML content and then extract the relevant parts. As part of this process, some self-closing tags (like `<br />`) may be converted to their HTML5 equivalents (like `<br>`). This is a standard normalization practice and should not affect the visual rendering of the content in a web browser.

#### Prerequisites

* **Node.js**: Make sure you have Node.js installed on your system.

* **Dependencies**: This script uses `axios` for HTTP requests and `cheerio` for HTML parsing. You can install them with npm:

    ```
    npm install axios cheerio
    ```

#### Usage

The script takes one required argument (`url`) and a set of options (`--format`, `--output`).

* **url** (positional): The URL of the blog post to scrape.

* **--format** or **-f** (optional): Specifies the output format for the content.
    * `pure`: Extracts only the post's HTML content.
    * `full`: Wraps the post content in a complete HTML document with basic styling. This is the default format.

* **--output** or **-o** (optional): Specifies the output file name. If this option is not used, the content is printed to the console.

**1. Scrape Pure Post HTML**

This mode extracts only the HTML content within the main blog post body and prints it to the console or saves it to a specified file.

* **To print to console:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --format pure
    ```

* **To save to a file:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --format pure --output my-output.html
    ```
    *Note: The script will abort if `my-output.html` already exists to prevent overwriting.*

**2. Create a Full HTML Backup**

This mode is designed for backing up a single post. It retrieves the post title and content, then wraps them in a complete HTML document (`<html>`, `<head>`, `<body>` tags). This is the default format.

* **To create a backup with an automatically generated filename:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --format full
    ```
    The script will automatically generate a filename from the post title (e.g., `notes-on-webview-chatgpt.html`). The filename is limited to the first **34 characters** of the formatted title to roughly match Blogger's URL conventions.

* **To create a backup with a custom filename:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --format full --output my-backup.html
    ```

*Note: The script will abort if the generated or specified filename already exists to prevent overwriting.*

#### Challenges Faced In Building a Single-File Version

The addition of the `yargs` package (suggested by Gemini), while simplifying command-line argument handling, introduced a challenge in creating a single, bundled `.js` file for distribution. The `esbuild` tool succeeded in creating the single .js file but I encountered runtime errors when trying to run the single .js file.

I explored various `esbuild` configurations and attempted a solution using Webpack based on instructions from both Gemini and ChatGPT, but was unable to create a truly self-contained file.

The current `build.js` script successfully resolves this issue by externalizing `yargs` from the bundle. While the `esbuild` build succeeds and the resulting `dist/scrapeBlogPost.js` file runs correctly, it means the user must first run `npm install` for the project. The Node.js runtime then locates the `yargs` package in the `node_modules` directory one level up from the `dist` folder.

The primary advantage of this bundled version is that it combines the main script with other large dependencies like `axios` and `cheerio` into a single, optimized file, which can slightly improve startup performance.

To create the build, ensure `esbuild` is installed as a dev dependency, then run the following command:

    npm run build
This will generate an optimized `scrapeBlogPost.js` file in the `dist` directory that does not include the `yargs` package.

#### Using a Command to Run the Bundled Version

Once the bundled version is created, on Windows OS, you can create a simple Powershell command to run the scraper from any location on your system.

1.  Edit the file `scrape-blogger-post.ps1.txt` and update the `distPath` variable to point to the location of your bundled `scrapeBlogPost.js` file.
2.  Rename the file to `scrape-blogger-post.ps1` (remove the `.txt` extension).
3.  Optionally, move the file to a directory of your choice (e.g., `C:\Users\user-abc\Scripts`).
4.  If needed, add the directory containing `scrape-blogger-post.ps1` to your PATH environment variable.
5.  You can now run the command from any directory in your file system:

    ```
    scrape-blogger-post.ps1 https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --output my-backup.html
    ```
6.  The script will create any output file requested in the current working directory.

For other operating systems, you can create a similar shell script to achieve the same functionality.

#### Blogger Pages Support

The script seems to work with Blogger pages as well, but it has only been tested with one small blog page.

#### Author

This script was developed by Ravi S. Iyer with assistance from Gemini.

#### License

This script is licensed under the MIT License. The full text of the license can be found in the LICENSE file in the project's repository.