const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3000;

// Check if build directory exists and contains index.html
const buildDir = path.join(__dirname, 'build');
const indexPath = path.join(buildDir, 'index.html');
let needsBuild = false;

if (!fs.existsSync(buildDir) || !fs.existsSync(indexPath)) {
    console.log('Build directory is missing or incomplete. Running build first...');
    needsBuild = true;
}

// Create a simple server using Node's built-in http module
const startServer = () => {
    // Try to find a static file server first - try serve-static if available
    try {
        const finalhandler = require('finalhandler');
        const serveStatic = require('serve-static');

        console.log(`Starting server on port ${port} using serve-static...`);

        // Serve up build folder
        const serve = serveStatic(buildDir, {'index': ['index.html']});

        // Create server
        const server = http.createServer((req, res) => {
            serve(req, res, finalhandler(req, res));
        });

        // Listen
        server.listen(port);
        console.log(`Server running at http://localhost:${port}/`);

        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use. Try a different port.`);
            } else {
                console.error(`Server error: ${error.message}`);
            }
            process.exit(1);
        });
    } catch (err) {
        // If serve-static isn't available, fall back to using npx serve
        console.log(`serve-static not available, falling back to npx serve...`);

        const serveProcess = spawn('npx', ['serve', '-s', buildDir, '-p', port.toString()], {
            stdio: 'inherit',
            shell: true
        });

        serveProcess.on('error', (error) => {
            console.error(`Failed to start server: ${error.message}`);
            process.exit(1);
        });

        serveProcess.on('close', (code) => {
            console.log(`Server process exited with code ${code}`);
            process.exit(code);
        });
    }
};

// If we need to build first, do that and then start the server
if (needsBuild) {
    console.log('Creating build...');

    // First, try to install necessary packages
    const installProcess = spawn('npm', ['install', '--save', 'serve-static', 'finalhandler'], {
        stdio: 'inherit',
        shell: true
    });

    installProcess.on('close', () => {
        const buildProcess = spawn('node', ['build.js'], {
            stdio: 'inherit',
            shell: true
        });

        buildProcess.on('error', (error) => {
            console.error(`Failed to build: ${error.message}`);
            process.exit(1);
        });

        buildProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Build completed successfully.');
                startServer();
            } else {
                console.error(`Build failed with code ${code}`);
                process.exit(code);
            }
        });
    });
} else {
    startServer();
}

// Keep the script running by preventing it from exiting
process.stdin.resume();
console.log('Press Ctrl+C to stop the server.');

// Handle exit signals gracefully
process.on('SIGINT', () => {
    console.log('Server stopped.');
    process.exit(0);
});
