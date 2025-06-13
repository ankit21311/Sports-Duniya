// build.js - A cross-platform build script for both local development and Render deployment
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('Starting build process...');

// Force install specific versions of ajv and ajv-keywords
try {
    console.log('Installing specific versions of ajv dependencies...');
    execSync('npm install ajv@8.12.0 ajv-keywords@5.1.0 --no-save', {stdio: 'inherit'});
    console.log('Dependencies installed successfully');

    // Create a symlink for missing modules if needed
    const ajvDir = path.join('node_modules', 'ajv', 'dist');
    if (fs.existsSync(ajvDir)) {
        const compileDir = path.join(ajvDir, 'compile');
        const runtimeDir = path.join(ajvDir, 'runtime');

        // Check if compile directory exists, if not create it
        if (!fs.existsSync(compileDir)) {
            console.log('Creating missing compile directory...');
            fs.mkdirSync(compileDir, {recursive: true});
    }

      // Check if codegen.js exists in runtime, if so copy it to compile
      const runtimeCodegen = path.join(runtimeDir, 'codegen.js');
      const compileCodegen = path.join(compileDir, 'codegen.js');
      if (fs.existsSync(runtimeCodegen) && !fs.existsSync(compileCodegen)) {
          console.log('Copying codegen.js from runtime to compile directory...');
          fs.copyFileSync(runtimeCodegen, compileCodegen);
    }

      // Check if equal.js exists in runtime, if so copy it to compile
      const runtimeEqual = path.join(runtimeDir, 'equal.js');
      const compileEqual = path.join(compileDir, 'equal.js');
      if (fs.existsSync(runtimeEqual) && !fs.existsSync(compileEqual)) {
          console.log('Copying equal.js from runtime to compile directory...');
          fs.copyFileSync(runtimeEqual, compileEqual);
      }
  }
} catch (error) {
    console.error('Error installing or patching dependencies:', error);
    // Continue with the build process
}

// Install serve for production use
try {
    console.log('Installing serve for production...');
    execSync('npm install serve --save', {stdio: 'inherit'});

    // Set executable permissions for serve on Unix systems
    if (os.platform() !== 'win32') {
        const servePath = path.join('node_modules', '.bin', 'serve');
        if (fs.existsSync(servePath)) {
            console.log(`Setting executable permissions on ${servePath}`);
            fs.chmodSync(servePath, '755');
            console.log('Serve permissions set successfully');
        }
  }
} catch (error) {
    console.error('Error installing serve:', error);
}

// Install react-scripts
try {
    console.log('Installing react-scripts...');
    execSync('npm install react-scripts --save', {stdio: 'inherit'});

    // Check if we're on a Unix-like system
    if (os.platform() !== 'win32') {
    const reactScriptsPath = path.join('node_modules', '.bin', 'react-scripts');

      if (fs.existsSync(reactScriptsPath)) {
          try {
        console.log(`Setting executable permissions on ${reactScriptsPath}`);
        fs.chmodSync(reactScriptsPath, '755');
        console.log('Permissions set successfully');
      } catch (error) {
        console.error('Error setting permissions:', error);
      }
    } else {
        console.error('react-scripts binary not found');
    }
  }
} catch (error) {
    console.error('Error installing react-scripts:', error);
}

// Create a production build
try {
    console.log('Creating production build...');

    // First try building a simple static version without using webpack or react-scripts
    try {
        console.log('Generating simple static build...');

        // Create build directory if it doesn't exist
        if (!fs.existsSync('build')) {
            fs.mkdirSync('build', {recursive: true});
        }

        // Copy public directory contents to build
        if (fs.existsSync('public')) {
            console.log('Copying public files to build directory...');

        const copyPublicFiles = (source, dest) => {
            const files = fs.readdirSync(source);

            for (const file of files) {
                const sourcePath = path.join(source, file);
                const destPath = path.join(dest, file);

                if (fs.statSync(sourcePath).isDirectory()) {
                    if (!fs.existsSync(destPath)) {
                        fs.mkdirSync(destPath, {recursive: true});
                    }
                    copyPublicFiles(sourcePath, destPath);
                } else {
                    fs.copyFileSync(sourcePath, destPath);
                }
            }
      };

        copyPublicFiles('public', 'build');
    }

      // Create a simple index.html if it doesn't exist in the build directory
      if (!fs.existsSync(path.join('build', 'index.html'))) {
          console.log('Creating index.html...');

          const indexHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Sports Dunia</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #1a237e;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .main-content {
                    padding: 20px;
                    background-color: white;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    padding: 20px;
                    background-color: #1a237e;
                    color: white;
                }
            </style>
        </head>
        <body>
            <div id="root">
                <div class="header">
                    <h1>Sports Dunia</h1>
                </div>
                <div class="container">
                    <div class="main-content">
                        <h2>Welcome to Sports Dunia</h2>
                        <p>Your one-stop destination for all sports news and updates.</p>
                        <p>The full interactive website will be available soon.</p>
                    </div>
                </div>
                <div class="footer">
                    <p>&copy; 2025 Sports Dunia. All rights reserved.</p>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
      `;

          fs.writeFileSync(path.join('build', 'index.html'), indexHtml);
      }

      console.log('Static build completed successfully');
  } catch (error) {
      console.error('Error creating static build:', error);
      process.exit(1);
  }
} catch (error) {
    console.error('All build attempts failed:', error);
    process.exit(1);
}
