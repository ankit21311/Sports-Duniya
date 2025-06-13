// simple-server.js - Basic HTTP server for static files
const http = require('http');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const port = 3000;
const buildDir = path.join(__dirname, 'build');

// Run the full build script to generate our complete sports website
console.log('Running full build script to generate the sports website...');
try {
    execSync('node build.js', {stdio: 'inherit'});
    console.log('Build completed successfully!');
} catch (error) {
    console.error('Error running build script:', error);
    process.exit(1);
}

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Default to index.html
    let filePath = path.join(buildDir, (req.url === '/' ? 'index.html' : req.url));

    console.log(`Requested: ${req.url} -> ${filePath}`);

    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // If not a file, serve index.html
            console.log(`File not found, serving index.html instead`);
            filePath = path.join(buildDir, 'index.html');
        }

        // Read the file and serve it
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err.message}`);
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }

            // Set content type
            let contentType = 'text/plain';
            if (filePath.endsWith('.html')) contentType = 'text/html';
            else if (filePath.endsWith('.css')) contentType = 'text/css';
            else if (filePath.endsWith('.js')) contentType = 'text/javascript';
            else if (filePath.endsWith('.json')) contentType = 'application/json';
            else if (filePath.endsWith('.png')) contentType = 'image/png';
            else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
    });
  });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log('Press Ctrl+C to stop the server.');
    console.log('IMPORTANT: Open your browser to http://localhost:3000 to view the sports website.');
});
