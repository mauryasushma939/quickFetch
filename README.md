# QuickFetch 🎬

A legally compliant, privacy-focused video metadata and embedding tool built with Next.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 🎯 What is QuickFetch?

QuickFetch is a web application designed exclusively for **legal** and **ethical** video content access. It allows users to:

- ✅ Fetch public metadata from video platforms (YouTube, Vimeo)
- ✅ Embed videos using official platform APIs
- ✅ View information about legally accessible content
- ✅ Organize personal media libraries

**What QuickFetch Does NOT Do:**
- ❌ Download copyrighted content without permission
- ❌ Bypass platform terms of service or DRM
- ❌ Store user data or video URLs
- ❌ Track user activity

## 🚀 Features

### Legal & Ethical
- Full compliance with platform terms of service
- Uses official APIs (YouTube Data API v3, Vimeo oEmbed)
- Clear legal disclaimer and user agreements
- No copyright infringement mechanisms

### Privacy & Security
- **Zero data storage** - All requests processed in real-time
- **No tracking** - No analytics, cookies, or user profiling
- **Rate limiting** - Prevents abuse and API quota exhaustion
- **Security headers** - HSTS, CSP, XSS protection, and more
- **Input validation** - Sanitized inputs and URL validation

### User Experience
- Clean, modern UI with dark mode support
- Responsive design for all devices
- Real-time metadata fetching
- Official video embedding
- Clear error messages

## 📋 Supported Platforms

| Platform | Metadata | Embedding | Notes |
|----------|----------|-----------|-------|
| YouTube | ✅ | ✅ | Via official YouTube Data API v3 |
| Vimeo | ✅ | ✅ | Via oEmbed API (public videos only) |
| Direct Links | ⚠️ | ❌ | Limited metadata, no embedding for security |

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **APIs:** YouTube Data API v3, Vimeo oEmbed
- **Security:** Custom rate limiting, input sanitization
- **Deployment:** Vercel-ready

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- YouTube Data API v3 key (for YouTube metadata)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quickFetch.git
   cd quickFetch
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your YouTube API key:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   RATE_LIMIT_MAX_REQUESTS=10
   RATE_LIMIT_WINDOW_MS=60000
   ALLOWED_ORIGINS=http://localhost:3000
   ```

4. **Get a YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Copy the API key to your `.env` file

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Rate Limiting

Adjust rate limits in `.env`:
```env
RATE_LIMIT_MAX_REQUESTS=10    # Max requests per window
RATE_LIMIT_WINDOW_MS=60000    # Window duration (milliseconds)
```

### Security Headers

Security headers are configured in [middleware.ts](middleware.ts) and [next.config.js](next.config.js).

## 📖 Usage

1. **Accept Legal Terms**
   - First-time users must read and accept the legal disclaimer
   - Terms are stored in localStorage (no server-side tracking)

2. **Enter Video URL**
   - Paste a YouTube or Vimeo URL
   - Click "Fetch Metadata"

3. **View Results**
   - See video metadata (title, description, views, etc.)
   - Watch embedded video using official platform player
   - All embeds use official APIs

## 🔒 Legal Compliance

### Terms of Service Compliance

QuickFetch complies with:
- **YouTube Terms of Service** - Uses official API, no downloading
- **Vimeo Terms of Service** - Uses oEmbed, respects privacy settings
- **Copyright Laws** - No mechanism to infringe intellectual property

### User Responsibilities

Users must:
- Verify they have legal rights to access content
- Comply with all platform terms of service
- Respect copyright and intellectual property laws
- Use the tool only for lawful purposes

### Platform API Usage

- **YouTube:** Uses YouTube Data API v3 for metadata only
- **Vimeo:** Uses public oEmbed API for public videos
- **No scraping:** All data fetched through official channels

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/quickFetch)

### Other Platforms

QuickFetch can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Docker

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. All contributions maintain legal compliance
2. No features that violate platform terms of service
3. Code follows existing style and patterns
4. Add tests for new features
5. Update documentation

## ⚠️ Disclaimer

QuickFetch is provided "as is" without warranties. The developers are not responsible for:
- Misuse of the tool by users
- Copyright infringement by users
- Changes to third-party platform APIs or policies
- Any legal consequences of improper use

**Use this tool responsibly and legally.**

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- YouTube Data API v3
- Vimeo oEmbed API
- Next.js and Vercel teams
- Open source community

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review legal terms before use

---

**Remember:** Always use QuickFetch legally and ethically. Respect content creators' rights and platform terms of service.