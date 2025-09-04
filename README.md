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
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/09/example-post.html
    ```

* **To save to a file:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/09/example-post.html output.html
    ```
    *Note: The script will abort if output.html already exists to prevent overwriting.*

**2. Create a Full HTML Backup**

This mode is designed for backing up a single post. It retrieves the post title and content, then wraps them in a complete HTML document (`<html>`, `<head>`, `<body>` tags) and saves the file with a clean name based on the post title.

* **To create a backup:**

    ```
    node scrapeBlogPost.js https://raviswdev.blogspot.com/2025/09/example-post.html --backup
    ```
    The script will automatically generate a filename like example-post.html and save the complete HTML document to that file.

    *Note: The script will abort if the generated filename already exists to prevent overwriting.*

---

#### Blogger Pages Support

The script seems to work with Blogger pages as well, but it has only been tested with one small blog page.

---

#### Author

This extension was developed by Ravi S. Iyer with assistance from Gemini.

---

#### License

This extension is licensed under the MIT License. The full text of the license can be found in the LICENSE file in the project's repository.
