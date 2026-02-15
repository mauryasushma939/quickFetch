# QuickFetch - Quick Start Guide

Get QuickFetch running in 5 minutes!

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone or navigate to the repository
cd /workspaces/quickFetch

# Run the automated setup script
./setup.sh
```

The script will:
- ✅ Check Node.js version
- ✅ Install dependencies
- ✅ Create `.env` file
- ✅ Prompt for YouTube API key
- ✅ Verify build works

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env and add your YouTube API key
# Get it from: https://console.cloud.google.com/
nano .env  # or use your preferred editor

# 4. Run development server
npm run dev

# 5. Open browser
# Navigate to http://localhost:3000
```

## 🔑 Getting a YouTube API Key

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com/)

2. **Create or Select Project**
   - Click "Select a project" > "New Project"
   - Name it (e.g., "QuickFetch")
   - Click "Create"

3. **Enable YouTube Data API v3**
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

5. **Add to .env**
   ```env
   YOUTUBE_API_KEY=your_api_key_here
   ```

6. **Optional: Restrict API Key**
   - Click on your API key in credentials list
   - Set "Application restrictions" (e.g., HTTP referrers)
   - Set "API restrictions" to "YouTube Data API v3"
   - Save

## 📝 Environment Variables

Edit `.env`:

```env
# Required
YOUTUBE_API_KEY=your_youtube_api_key_here

# Optional (has defaults)
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
ALLOWED_ORIGINS=http://localhost:3000
```

## 🎯 First Run

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

3. **Accept legal terms**
   - Read and accept the legal disclaimer

4. **Test with a video**
   - Try: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Click "Fetch Metadata"
   - View results!

## 🧪 Test URLs

Use these to verify everything works:

### YouTube
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/jNQXAC9IVRw
```

### Vimeo
```
https://vimeo.com/148751763
```

## ✅ Verification Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created
- [ ] YouTube API key configured
- [ ] Dev server starts without errors
- [ ] Legal disclaimer displays
- [ ] YouTube video metadata loads
- [ ] Vimeo video metadata loads
- [ ] Video embedding works

## 🐛 Troubleshooting

### "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "YouTube API key not configured"
- Check `.env` file exists
- Verify API key is correct
- Ensure no extra spaces or quotes
- Restart dev server after changes

### "Build errors"
```bash
npm run build
# Check error messages
# Common: TypeScript errors or missing dependencies
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### API quota exceeded
- YouTube free tier: 10,000 units/day
- Each metadata request: ~3 units
- Limit: ~3,300 videos/day
- Wait 24 hours or request quota increase

## 📚 Next Steps

### Explore the Code
- `app/page.tsx` - Main application UI
- `app/api/metadata/route.ts` - API endpoint
- `components/` - React components
- `lib/` - Utility functions

### Read Documentation
- [README.md](README.md) - Full documentation
- [FAQ.md](FAQ.md) - Common questions
- [API.md](API.md) - API reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

### Customize
- Modify styles in Tailwind classes
- Adjust rate limits in `.env`
- Add features (legally!)
- See [CONTRIBUTING.md](CONTRIBUTING.md)

### Deploy
Choose a platform:
- **Vercel** (recommended): Push to GitHub, import
- **Netlify**: Connect repository
- **Docker**: Use provided Dockerfile
- **VPS**: PM2 + Nginx setup

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions

## 🎓 Learning Path

If you're new to the stack:

1. **Next.js Basics**
   - [Next.js Tutorial](https://nextjs.org/learn)
   - App Router concepts
   - API routes

2. **TypeScript**
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
   - Type annotations
   - Interfaces

3. **Tailwind CSS**
   - [Tailwind Docs](https://tailwindcss.com/docs)
   - Utility classes
   - Responsive design

4. **APIs**
   - YouTube Data API v3
   - RESTful principles
   - Error handling

## 💡 Tips

### Development
- Use `npm run dev` for hot reload
- Check browser console for errors
- Use React DevTools
- Monitor API quota usage

### Best Practices
- Never commit `.env` file
- Keep dependencies updated
- Test on multiple browsers
- Follow legal guidelines
- Respect API rate limits

### Performance
- Build for production: `npm run build`
- Use `npm start` for production mode
- Monitor bundle size
- Optimize images

## 🆘 Getting Help

### Documentation
- Start with [README.md](README.md)
- Check [FAQ.md](FAQ.md)
- Review [API.md](API.md)

### Common Issues
- Most issues: restart dev server
- API errors: check YouTube API key
- Build errors: reinstall dependencies
- TypeScript errors: check imports

### Community
- Open GitHub issue
- Check existing issues
- Use GitHub Discussions
- Read contribution guidelines

## 🎉 Success!

If you can:
- ✅ Load http://localhost:3000
- ✅ Accept legal disclaimer
- ✅ Fetch YouTube video metadata
- ✅ View embedded video

**Congratulations! You're ready to go!** 🚀

## 📋 Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Setup
./setup.sh          # Automated setup
npm install         # Install dependencies

# Deployment
vercel              # Deploy to Vercel
netlify deploy      # Deploy to Netlify
docker build        # Build Docker image
```

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [YouTube API Console](https://console.cloud.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel](https://vercel.com/)

---

**Ready to deploy?** See [DEPLOYMENT.md](DEPLOYMENT.md)

**Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md)

**Need more help?** Check [FAQ.md](FAQ.md)
