// build.js - A cross-platform build script for both local development and Render deployment
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('Starting build process...');

// Check if we're on a Unix-like system
if (os.platform() !== 'win32') {
    const reactScriptsPath = path.join('node_modules', '.bin', 'react-scripts');

    try {
        console.log(`Setting executable permissions on ${reactScriptsPath}`);
        fs.chmodSync(reactScriptsPath, '755');
        console.log('Permissions set successfully');
    } catch (error) {
        console.error('Error setting permissions:', error);
    }
}

// Run the build command using the direct path to build.js
try {
    console.log('Running build script...');
    execSync('node node_modules/react-scripts/scripts/build.js', {stdio: 'inherit'});
    console.log('Build completed successfully');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}