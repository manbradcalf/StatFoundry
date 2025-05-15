#!/bin/bash

# Install root dependencies
npm install

# Setup service
cd service
pyenv install 3.11.9
pyenv local 3.11.9
pip install -r requirements.txt
cd ..

# Setup UI
cd ui
npm install
cd ..

echo "Setup complete! You can now run 'npm run dev' to start the application." 