// This script uses Node.js, axios, cheerio, and yargs to scrape a Blogger post.

// Make sure you have the required dependencies installed:
// npm install axios cheerio yargs

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs/promises');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Define the command-line arguments using a command block.
const argv = yargs(hideBin(process.argv))
    .command('$0 <url>', 'Scrape a Blogger post.', (yargs) => {
        // Positional arguments are configured here, inside the command builder.
        yargs.positional('url', {
            describe: 'The URL of the blog post to scrape.',
            type: 'string',
            demandOption: true // This is the correct way to make a positional argument required.
        });
    })
    // Options are also defined here.
    .option('format', {
        alias: 'f',
        describe: 'The output format for the content.',
        choices: ['pure', 'full'],
        default: 'full'
    })
    .option('output', {
        alias: 'o',
        describe: 'The output file name. If not specified, content is printed to the console.',
        type: 'string'
    })
    .help('h')
    .alias('h', 'help')
    .parse(); // Explicitly call parse()

// Main function to run the scraping logic
async function main() {
    // Function to scrape the blog post content.
    async function scrapeBlogPost() {
        try {
            // Step 1: Make an HTTP request to the provided URL.
            const response = await axios.get(argv.url);
            const html = response.data;

            // Step 2: Load the HTML into Cheerio for parsing and manipulation.
            const $ = cheerio.load(html);

            // Scrape the post title, which is usually in the <title> tag.
            const postTitle = $('title').text().replace(/ - Blogger$/, '').trim();

            // Step 3: Identify the HTML element that contains the pure post content.
            const postContentElement = $('.post-body.entry-content');

            if (postContentElement.length === 0) {
                console.error('Could not find the main post content element. Please check your HTML selector.');
                process.exit(1);
            }

            // Step 4: Extract the HTML content of the identified element.
            const purePostHtml = postContentElement.html();

            let fileContent;
            let finalOutputFilename;

            // Determine the output content and filename based on the specified format and output options.
            if (argv.format === 'full') {
                // Construct the full HTML document for 'full' format.
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
                // If no output filename is provided, create one from the post title.
                finalOutputFilename = argv.output || postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '.html';
            } else { // 'pure' format
                fileContent = purePostHtml;
                finalOutputFilename = argv.output;
            }

            // Decide whether to print to console or write to a file.
            if (finalOutputFilename) {
                // Check if file already exists to prevent overwrite.
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
                console.log(fileContent);
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