// This script uses Node.js, axios, and cheerio to scrape a Blogger post.

// Make sure you have the required dependencies installed:
// npm install axios cheerio

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises'); // Import the file system module for direct file writing

// Define variables to store command-line arguments.
const blogPostUrl = process.argv[2];
const thirdArgument = process.argv[3]; // Can be an output filename or the backup flag

// Main function to run the scraping logic
async function main() {
    if (!blogPostUrl) {
        console.error('Please provide a URL as a command-line argument.');
        console.error('Usage: node scrapeBlogPost.js <url> [output-file] or node scrapeBlogPost.js <url> --backup');
        process.exit(1);
    }

    const isBackupMode = thirdArgument === '--backup';
    const outputFilenameFromArg = isBackupMode ? null : thirdArgument;

    // Check for output file existence at the very beginning for the explicit filename case.
    if (outputFilenameFromArg) {
        try {
            await fs.access(outputFilenameFromArg);
            console.error(`Error: The file "${outputFilenameFromArg}" already exists. Aborting to prevent overwrite.`);
            process.exit(1);
        } catch (error) {
            // File does not exist, so we can proceed with the fetch.
        }
    }

    // Function to scrape the blog post content.
    async function scrapeBlogPost() {
        try {
            // Step 1: Make an HTTP request to the provided URL.
            const response = await axios.get(blogPostUrl);
            const html = response.data;

            // Step 2: Load the HTML into Cheerio for parsing and manipulation.
            const $ = cheerio.load(html);

            // Scrape the post title, which is usually in the <title> tag.
            const postTitle = $('title').text().replace(/ - Blogger$/, '').trim();

            // Step 3: Identify the HTML element that contains the pure post content.
            const postContentElement = $('.post-body.entry-content');

            if (postContentElement.length === 0) {
                console.error('Could not find the main post content element. Please check your HTML selector.');
                console.error('Look for a unique class or ID for the main post content, for example, ".post-body" or "#main-content".');
                process.exit(1);
            }

            // Step 4: Extract the HTML content of the identified element.
            const purePostHtml = postContentElement.html();

            let finalOutputFilename;
            let fileContent;

            // Handle the case for backup mode.
            if (isBackupMode) {
                // Sanitize the title to create a safe filename.
                finalOutputFilename = postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '.html';
                
                // Construct the full HTML document.
                fileContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${postTitle}</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 2em auto; padding: 0 1em; }
        h1 { color: #333; }
        .post-content { margin-top: 2em; }
    </style>
</head>
<body>
    <h1>${postTitle}</h1>
    <div class="post-content">
        ${purePostHtml}
    </div>
</body>
</html>`;
            } else {
                // Default mode: use the filename provided by the user.
                finalOutputFilename = outputFilenameFromArg;
                fileContent = purePostHtml;
            }

            // Perform the final safety check just before writing to the file.
            // This is crucial for backup mode and prevents race conditions.
            if (finalOutputFilename) {
                try {
                    await fs.access(finalOutputFilename);
                    console.error(`Error: The file "${finalOutputFilename}" already exists. Aborting to prevent overwrite.`);
                    process.exit(1);
                } catch (error) {
                    // File does not exist, so we can proceed with the write operation.
                }

                await fs.writeFile(finalOutputFilename, fileContent, 'utf8');
                console.log(`Successfully saved blog post content to ${finalOutputFilename}`);
            } else {
                // Print to console if no output filename was provided.
                console.log(purePostHtml);
            }

        } catch (error) {
            console.error(`Error scraping the URL: ${error.message}`);
        }
    }

    // Execute the function.
    await scrapeBlogPost();
}

// Execute the main function.
main();
