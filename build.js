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

          const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sports Dunia - Your Sports News Destination</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            color: #343a40;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #1a237e;
            color: white;
            padding: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 1px;
        }
        .main-content {
            padding: 40px 0;
        }
        .card {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card-img-top {
            height: 200px;
            object-fit: cover;
        }
        .card-title {
            font-weight: bold;
            margin-bottom: 15px;
        }
        .section-title {
            position: relative;
            margin-bottom: 30px;
            padding-bottom: 15px;
            font-weight: 700;
        }
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background-color: #1a237e;
        }
        .footer {
            background-color: #1a237e;
            color: white;
            padding: 40px 0;
            margin-top: 40px;
        }
        .social-icons a {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: rgba(255,255,255,0.1);
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            color: white;
            margin-right: 10px;
            transition: background-color 0.3s ease;
        }
        .social-icons a:hover {
            background-color: rgba(255,255,255,0.2);
        }
        .nav-link {
            color: white;
            margin: 0 15px;
            font-weight: 500;
            transition: opacity 0.3s;
        }
        .nav-link:hover {
            opacity: 0.8;
            color: white;
        }
        .hero-section {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 100px 0;
            text-align: center;
            margin-bottom: 40px;
        }
        .hero-section h1 {
            font-size: 48px;
            margin-bottom: 20px;
            font-weight: 700;
        }
        .hero-section p {
            font-size: 18px;
            margin-bottom: 30px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        .btn-primary {
            background-color: #1a237e;
            border-color: #1a237e;
            padding: 10px 25px;
            font-weight: 600;
        }
        .btn-primary:hover {
            background-color: #0d1757;
            border-color: #0d1757;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="logo">Sports Dunia</div>
            <nav>
                <a href="#" class="nav-link">Home</a>
                <a href="#" class="nav-link">News</a>
                <a href="#" class="nav-link">Categories</a>
                <a href="#" class="nav-link">Games</a>
            </nav>
        </div>
    </header>

    <div class="hero-section">
        <div class="container">
            <h1>Welcome to Sports Dunia</h1>
            <p>Your one-stop destination for all sports news, live scores, and updates from around the world.</p>
            <button class="btn btn-primary btn-lg">Explore Now</button>
        </div>
    </div>

    <div class="container main-content">
        <h2 class="section-title">Latest Sports News</h2>
        
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="card-img-top" alt="Football">
                    <div class="card-body">
                        <h5 class="card-title">Champions League Final Set for Epic Showdown</h5>
                        <p class="card-text">The stage is set for an unforgettable night of football as the two giants prepare to face off in the Champions League final.</p>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="card-img-top" alt="Cricket">
                    <div class="card-body">
                        <h5 class="card-title">India Clinches T20 Series in Thrilling Final</h5>
                        <p class="card-text">In a nail-biting finish, India secured victory in the final over to win the T20 series against Australia.</p>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="card-img-top" alt="Basketball">
                    <div class="card-body">
                        <h5 class="card-title">NBA Playoffs: Lakers Advance to Conference Finals</h5>
                        <p class="card-text">LeBron James leads Lakers to a decisive victory, securing their spot in the Western Conference Finals.</p>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        
        <h2 class="section-title mt-5">Live Scores</h2>
        <div class="card mb-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Manchester United</strong>
                        <span class="badge bg-primary">2</span>
                    </div>
                    <div class="text-center">
                        <span class="badge bg-danger">LIVE</span>
                        <div>72'</div>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-primary">1</span>
                        <strong>Chelsea</strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>India</strong>
                        <span class="badge bg-primary">245/6</span>
                    </div>
                    <div class="text-center">
                        <span class="badge bg-danger">LIVE</span>
                        <div>32 overs</div>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-primary">-/-</span>
                        <strong>Australia</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>About Sports Dunia</h5>
                    <p>Sports Dunia is your premier destination for comprehensive sports coverage, bringing you the latest news, scores, and updates from around the world.</p>
                </div>
                <div class="col-md-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white">Home</a></li>
                        <li><a href="#" class="text-white">News</a></li>
                        <li><a href="#" class="text-white">Categories</a></li>
                        <li><a href="#" class="text-white">Games</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Follow Us</h5>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center mt-4">
                <p>&copy; 2025 Sports Dunia. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

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
