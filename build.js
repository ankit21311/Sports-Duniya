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

// Now try an alternative approach - use create-react-app's build directly
try {
    console.log('Running build script...');

    // First try the standard build method
    try {
        execSync('node node_modules/react-scripts/scripts/build.js', {stdio: 'inherit'});
    } catch (buildError) {
        console.error('Standard build failed, trying alternative approach...');

        // Create a minimal webpack config
        const webpackConfigPath = path.join('webpack.config.js');
        const webpackConfig = `
      const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      
      module.exports = {
        mode: 'production',
        entry: './src/index.js',
        output: {
          path: path.resolve(__dirname, 'build'),
          filename: 'static/js/[name].[contenthash:8].js',
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(scss|sass)$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              type: 'asset/resource',
            },
          ],
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './public/index.html',
          }),
        ],
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      };
    `;

      // Install additional required dependencies for the fallback approach
      console.log('Installing webpack dependencies for fallback build...');
      execSync('npm install --no-save webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin style-loader css-loader sass-loader', {stdio: 'inherit'});

      // Write the webpack config file
      fs.writeFileSync(webpackConfigPath, webpackConfig);

      // Run webpack directly
      console.log('Running webpack build...');
      execSync('npx webpack', {stdio: 'inherit'});
  }

    console.log('Build completed successfully');
} catch (error) {
    console.error('All build attempts failed:', error);
    process.exit(1);
}
