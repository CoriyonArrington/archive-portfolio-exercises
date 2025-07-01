const fs = require('fs');
const path = require('path');

// Get paths from command line arguments
const backupPath = process.argv[2];
const v0Path = process.argv[3];

// Read the package.json files
const originalPackagePath = path.join(backupPath, 'package.json');
const v0PackagePath = path.join(v0Path, 'package.json');

if (!fs.existsSync(originalPackagePath)) {
  console.error(`Error: Original package.json not found at ${originalPackagePath}`);
  process.exit(1);
}

if (!fs.existsSync(v0PackagePath)) {
  console.error(`Error: v0 package.json not found at ${v0PackagePath}`);
  process.exit(1);
}

const originalPackage = JSON.parse(fs.readFileSync(originalPackagePath, 'utf8'));
const v0Package = JSON.parse(fs.readFileSync(v0PackagePath, 'utf8'));

// Get the original React versions
const reactVersion = originalPackage.dependencies.react || '^18.0.0';
const reactDomVersion = originalPackage.dependencies['react-dom'] || '^18.0.0';

// Merge dependencies
const mergedDependencies = {
  ...originalPackage.dependencies,
  ...v0Package.dependencies,
  // Preserve original React versions
  react: reactVersion,
  'react-dom': reactDomVersion
};

// Create the merged package.json
const mergedPackage = {
  ...originalPackage,
  dependencies: mergedDependencies
};

// Write the merged package.json
fs.writeFileSync('package.json', JSON.stringify(mergedPackage, null, 2));
console.log('Successfully merged package.json files while preserving React version');

// Generate a report of new dependencies
const newDeps = {};
for (const [key, value] of Object.entries(v0Package.dependencies)) {
  if (!originalPackage.dependencies[key]) {
    newDeps[key] = value;
  }
}

if (Object.keys(newDeps).length > 0) {
  console.log('\nNew dependencies added:');
  for (const [key, value] of Object.entries(newDeps)) {
    console.log(`- ${key}: ${value}`);
  }
}
