#!/bin/bash

# QuickFetch Setup Script
# This script helps you set up QuickFetch for local development

set -e

echo "🎬 QuickFetch Setup Script"
echo "=========================="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js 18 or higher from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old."
    echo "Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Setup environment variables
if [ ! -f .env ]; then
    echo "Setting up environment variables..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your YouTube API key to .env"
    echo ""
    echo "To get a YouTube API key:"
    echo "1. Go to https://console.cloud.google.com/"
    echo "2. Create a new project or select existing"
    echo "3. Enable YouTube Data API v3"
    echo "4. Create credentials (API Key)"
    echo "5. Copy the API key to your .env file"
    echo ""
    read -p "Press Enter to open .env file in default editor..."
    ${EDITOR:-nano} .env
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if API key is set
if grep -q "your_youtube_api_key_here" .env; then
    echo "⚠️  WARNING: YouTube API key is not configured!"
    echo "Please edit .env and add your YouTube API key."
    echo ""
fi

# Build check
echo "Running build check..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
echo ""

# Setup complete
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your YouTube API key is configured in .env"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Read CONTRIBUTING.md before making changes"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo ""
echo "Happy coding! 🚀"
