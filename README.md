### Blogger Post HTML Scraper & Backup Utility

This Node.js script allows you to scrape the HTML content of a Blogger post from its public URL. It can be used to extract just the post HTML content or to create a full, self-contained HTML document for backup purposes.

#### About 'Post HTML'

By 'Post HTML', I mean the HTML content shown in Blogger's Edit Post in 'HTML View'. This is the raw markup that represents the content of a single blog post, separate from the blog post title and surrounding blog template or design.

#### Disclaimer

This tool is intended for personal use and for scraping content from your own blog. Web scraping can be a sensitive topic. Please be a good web citizen and check the website's `robots.txt` file and terms of service before using this script on any other website.

#### Features

* **Post HTML Content Extraction:** Fetches and extracts only the HTML content of the main blog post body. This is useful to edit the HTML of a post in an external editor like VS Code and then paste it back into Blogger's HTML view. Note that Blogger's Edit Post HTML view is limited in its editing capabilities.

* **Full HTML Backup:** Creates a complete, self-contained HTML document with a clean filename based on the post's title.

* **Safe and Efficient:** Includes a pre-fetch file existence check to prevent accidental overwrites and unnecessary network requests.

* **Character Encoding:** Correctly handles UTF-8 characters, preventing corruption when saving to a file.

* **HTML5 Conversion:** The script uses Cheerio to parse the HTML content and then extract the relevant parts. As part of this process, some self-closing tags (like \<br />) may be converted to their HTML5 equivalents (like \<br>). This is a standard normalization practice and should not affect the visual rendering of the content in a web browser.

#### Prerequisites

* **Node.js**: Make sure you have Node.js installed on your system.

* **Dependencies**: This script uses `axios` for HTTP requests and `cheerio` for HTML parsing. You can install them with npm:

    ```
    npm install axios cheerio
    ```

#### Usage

The script takes one required argument (the URL) and an optional second argument (either an output filename or a backup flag).

**1. Scrape Post HTML (Default)**

This mode extracts only the HTML content within the main blog post body and prints it to the console or saves it to a specified file.

* **To print to console:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html
    ```

* **To save to a file:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html output.html
    ```
    *Note: The script will abort if output.html already exists to prevent overwriting.*

**2. Create a Full HTML Backup**

This mode is designed for backing up a single post. It retrieves the post title and content, then wraps them in a complete HTML document (`<html>`, `<head>`, `<body>` tags) and saves the file with a clean name based on the post title.

* **To create a backup:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --backup
    ```
    The script will automatically generate a filename like example-post.html and save the complete HTML document to that file.

    *Note: The script will abort if the generated filename already exists to prevent overwriting.*

---

**Building a Minified and Bundled Version**

For a smaller file size and faster startup, you can create a minified and bundled version of the scraper. This process combines all dependencies into a single file in the `dist` folder.

To create the build, ensure `esbuild` is installed as a dev dependency, then run the following command:

    npm run build
This will generate an optimized `scrapeBlogPost.js` file in the `dist` directory.

---

**Using a Command to Run the Bundled Version**

Once the bundled version is created, on Windows OS, you can create a simple Powershell command to run the scraper from any location on your system.

1. Edit the file scrape-blogger-post.ps1.txt and update the distPath variable to point to the location of your bundled `scrapeBlogPost.js` file.
1. Rename the file to scrape-blogger-post.ps1 (remove the .txt extension).
1. Optionally, move the file to a directory of your choice (e.g., C:\Users\user-abc\Scripts).
1. If needed, add the directory containing scrape-blogger-post.ps1 to your PATH environment variable.
1. You can now run the command from any directory in your file system:

    ```
    scrape-blogger-post.ps1 https://raviswdev.blogspot.com/2025/08/notes-on-webview-chatgpt.html --backup
    ```
1. The script will create any output file requested in the current working directory.

For other operating systems, you can create a similar shell script to achieve the same functionality.

---

#### Blogger Pages Support

The script seems to work with Blogger pages as well, but it has only been tested with one small blog page.

---

#### Author

This script was developed by Ravi S. Iyer with assistance from Gemini.

---

#### License

This script is licensed under the MIT License. The full text of the license can be found in the LICENSE file in the project's repository.
