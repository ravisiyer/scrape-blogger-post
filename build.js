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
  banner: { js: '#!/usr/bin/env node' }, // shebang (Linux/macOS only, harmless on Windows)
  // packages: 'external',
  loader: { '.json': 'json' }, // allow bundling of JSON files  
  define: { 'import.meta.url': JSON.stringify(`file://${__filename}`) } // 👈 correct fix  
}).then(() => {
  console.log('Build successful!');
  console.log(`Optimized file saved to: ${outputFilePath}`);
}).catch(() => {
  console.error('Build failed.');
  process.exit(1);
});
