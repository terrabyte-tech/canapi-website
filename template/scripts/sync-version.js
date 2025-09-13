const fs = require('fs');
const path = require('path');

// Paths to files
const packagePath = path.resolve(__dirname, '../package.json');
const sitePath = path.resolve(__dirname, '../_data/site.json');

// Read package.json
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const version = pkg.version;
console.log(`Package version: ${version}`);


// Read site.json
const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

// Update templateVersion
site.templateVersion = version;

// Write back to site.json
fs.writeFileSync(sitePath, JSON.stringify(site, null, 2));

console.log(`Changed templateVersion to ${version} in site.json`);
