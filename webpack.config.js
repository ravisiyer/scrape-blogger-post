const path = require('path');

module.exports = {
  target: 'node',                          // bundle for Node.js
  mode: 'production',                      // optimize output
  entry: './scrapeBlogPost.js',            // your CLI entry
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scrapeBlogPost.js',
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        type: 'json',                      // let yargs load locale JSONs
      }
    ]
  },
  node: {
    __dirname: false,                      // preserve Node __dirname
    __filename: false,                     // preserve Node __filename
  }
};
