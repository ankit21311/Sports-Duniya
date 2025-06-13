#!/bin/bash

# This script handles the build process for Render deployment
# It will be used by render.yaml

# Set executable permissions for react-scripts on Unix systems
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Setting executable permissions for react-scripts"
  chmod +x node_modules/.bin/react-scripts
fi

# Run the build command
echo "Running build command..."
npm run build