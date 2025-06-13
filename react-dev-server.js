// react-dev-server.js - Development server for React app
const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting React development server...');

// First, ensure all dependencies are installed
console.log('Making sure all dependencies are installed...');
try {
    const npmInstall = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true
    });

    npmInstall.on('close', (code) => {
        if (code !== 0) {
            console.error('Failed to install dependencies');
            process.exit(code);
        }

        console.log('Dependencies installed successfully');
        console.log('Starting development server...');

        // Start the React development server
        const reactStart = spawn('npx', ['react-scripts', 'start'], {
            stdio: 'inherit',
            shell: true,
            env: {...process.env, BROWSER: 'none'} // Don't auto-open browser
        });

        reactStart.on('error', (error) => {
            console.error('Failed to start development server:', error);
        });

        // Keep the script running until the server is stopped
        reactStart.on('close', (code) => {
            console.log(`Development server exited with code ${code}`);
            process.exit(code);
        });

        console.log('\n-------------------------------------------------');
        console.log('IMPORTANT: Open your browser to http://localhost:3000');
        console.log('You should now see your React application running.');
        console.log('Press Ctrl+C to stop the server.');
        console.log('-------------------------------------------------\n');
    });
} catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
}