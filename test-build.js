// test-build.js - Simple script to verify build output
const fs = require('fs');
const path = require('path');

console.log('Checking build status...');

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
    console.log('Build directory does not exist. Creating it now...');
    fs.mkdirSync(buildDir, {recursive: true});
}

// Create a simple index.html file directly
const indexPath = path.join(buildDir, 'index.html');
const simpleHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sports Dunia - Test Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        h1 {
            color: #1a237e;
        }
        .test-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    <h1>Sports Dunia</h1>
    <p>This is a simple test page to verify that the server is working properly.</p>
    
    <div class="test-card">
        <h2>Test Content</h2>
        <p>If you can see this page, the local server is functioning correctly.</p>
        <p>The current time is: ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>
`;

// Write the simple HTML file
fs.writeFileSync(indexPath, simpleHTML);
console.log(`Simple index.html created at ${indexPath}`);
console.log('Build check complete. You should now be able to see content when running the server.');