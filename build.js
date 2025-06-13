// build.js - A cross-platform build script for both local development and Render deployment
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('Starting build process...');

// Check if we need to fix the ajv-keywords module
try {
    console.log('Checking for missing dependencies...');

    // Try to resolve the missing module to see if it exists
    try {
        require.resolve('ajv');
    } catch (e) {
        console.log('Installing missing ajv dependency...');
        execSync('npm install ajv@8.12.0', {stdio: 'inherit'});
    }

    // Fix for ajv-keywords
    const ajvKeywordsDir = path.join('node_modules', 'ajv-keywords', 'dist', 'definitions');
    if (fs.existsSync(ajvKeywordsDir)) {
        const typeofFile = path.join(ajvKeywordsDir, 'typeof.js');
        if (fs.existsSync(typeofFile)) {
            let content = fs.readFileSync(typeofFile, 'utf8');

            // Check if file needs patching
            if (content.includes("require('ajv/dist/compile/equal')")) {
                console.log('Patching ajv-keywords to fix build issue...');
                content = content.replace(
                    "require('ajv/dist/compile/equal')",
                    "require('ajv/dist/runtime/equal')"
                );
                fs.writeFileSync(typeofFile, content);
                console.log('ajv-keywords patched successfully');
            }
    }
  }
} catch (error) {
    console.error('Error fixing dependencies:', error);
    // Continue with build process even if fixing fails
}

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
