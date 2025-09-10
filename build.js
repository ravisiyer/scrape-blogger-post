#!/usr/bin/env node

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Define input and output paths
const inputFilePath = path.resolve(__dirname, 'scrapeBlogPost.js');
const outputDir = path.resolve(__dirname, 'dist');
const outputFilePath = path.join(outputDir, 'scrapeBlogPost.js');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// esbuild configuration
esbuild.build({
  entryPoints: [inputFilePath],
  bundle: true,
  outfile: outputFilePath,
  platform: 'node',
  target: 'node18', // Use a modern Node.js version
  minify: true,
  sourcemap: false,
  // This tells esbuild to exclude node built-in modules and yargs
  // so they are not bundled into the output file.
  external: ['fs', 'path', 'http', 'https', 'yargs'],
}).then(() => {
  console.log('Build successful!');
  console.log(`Optimized file saved to: ${outputFilePath}`);
}).catch(() => {
  console.error('Build failed.');
  process.exit(1);
});
// esbuild.build({
//   entryPoints: [inputFilePath],
//   bundle: true,
//   outfile: outputFilePath,
//   platform: 'node',
//   target: 'node18', // Use a modern Node.js version
//   minify: true,
//   sourcemap: false,
//   // This tells esbuild to exclude node built-in modules
//   // so they are not bundled into the output file.
//   external: ['fs', 'path', 'http', 'https'], 
// }).then(() => {
//   console.log('Build successful!');
//   console.log(`Optimized file saved to: ${outputFilePath}`);
// }).catch(() => {
//   console.error('Build failed.');
//   process.exit(1);
// });
