// very-simple-server.js - Extremely basic HTTP server for static files
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Create HTTP server
const server = http.createServer((req, res) => {
    console.log('Request received for:', req.url);

    // Serve index.html for root path
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'build', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html: ' + err.message);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    // Try to serve other files
    else {
        const filePath = path.join(__dirname, 'build', req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // File not found, serve index.html instead
                fs.readFile(path.join(__dirname, 'build', 'index.html'), (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error loading index.html');
                        return;
                    }
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                });
                return;
            }

            // Determine content type based on file extension
            let contentType = 'text/plain';
            const ext = path.extname(filePath);
            if (ext === '.html') contentType = 'text/html';
            else if (ext === '.css') contentType = 'text/css';
            else if (ext === '.js') contentType = 'text/javascript';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        });
    }
});

// Start server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log('');
    console.log('IMPORTANT: Open your browser and visit http://localhost:3000');
    console.log('You should now see the Sports Dunia website.');
    console.log('Press Ctrl+C to stop the server.');
});