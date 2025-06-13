const http = require('http');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const port = process.env.PORT || 3000;

// Function to check if build exists and create if needed
function ensureBuildExists() {
    const buildDir = path.join(__dirname, 'build');
    const indexPath = path.join(buildDir, 'index.html');

    if (!fs.existsSync(buildDir) || !fs.existsSync(indexPath)) {
        console.log('Build directory is missing or incomplete. Running build...');

        try {
            execSync('node build.js', {stdio: 'inherit'});
            console.log('Build completed successfully');
            return true;
        } catch (error) {
            console.error('Build failed:', error);
            return false;
    }
  }
    return true;
}

// Ensure build exists
if (!ensureBuildExists()) {
    console.error('Cannot start server without a build');
    process.exit(1);
}

// Create a simple server
const server = http.createServer((req, res) => {
    // Parse URL
    let filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);

    // If the path doesn't have an extension, serve index.html (for SPAs)
    if (!path.extname(filePath) && !filePath.endsWith('/')) {
        filePath = path.join(__dirname, 'build', 'index.html');
    }

    // Get the extension of the file
    const extname = String(path.extname(filePath)).toLowerCase();

    // MIME types
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    const contentType = contentTypes[extname] || 'application/octet-stream';

    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            // If the file doesn't exist, serve index.html for SPA routing
            if (error.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'build', 'index.html'), (error, content) => {
                    if (error) {
                        res.writeHead(500);
                        res.end('Error loading index.html');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success - return the file
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
});
