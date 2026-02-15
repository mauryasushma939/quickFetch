# QuickFetch Project Overview

## 📁 Project Structure

```
quickFetch/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── metadata/
│   │       └── route.ts         # API endpoint for fetching metadata
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── LegalDisclaimer.tsx      # Legal terms modal
│   ├── VideoInput.tsx           # URL input form
│   ├── MetadataDisplay.tsx      # Video metadata display
│   └── ErrorDisplay.tsx         # Error message component
│
├── lib/                         # Utility libraries
│   ├── legal.ts                 # Legal notice constants
│   ├── rateLimit.ts             # Rate limiting implementation
│   └── utils.ts                 # URL parsing and utilities
│
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Shared types
│
├── public/                      # Static assets
│   └── video-placeholder.png    # Placeholder image
│
├── middleware.ts                # Security headers middleware
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
│
├── README.md                    # Main documentation
├── FAQ.md                       # Frequently asked questions
├── API.md                       # API documentation
├── DEPLOYMENT.md                # Deployment guide
├── CONTRIBUTING.md              # Contribution guidelines
├── SECURITY.md                  # Security policy
├── LICENSE                      # MIT license
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── .eslintrc.json               # ESLint configuration
└── setup.sh                     # Setup script
```

## 🏗️ Architecture

### Frontend (Next.js App Router)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React hooks (useState, useEffect)
- **Client-Side Storage**: localStorage for legal disclaimer acceptance

### Backend (API Routes)
- **API**: Next.js API routes (serverless)
- **YouTube Integration**: YouTube Data API v3
- **Vimeo Integration**: oEmbed API
- **Rate Limiting**: In-memory implementation
- **Security**: Input validation, output sanitization

### Security Layer
- **Middleware**: Security headers (HSTS, CSP, XSS protection)
- **Rate Limiting**: Per-IP request throttling
- **Input Validation**: URL parsing and sanitization
- **CORS**: Configurable origins

## 🔑 Key Features

### Legal & Ethical Design
1. **Legal Disclaimer**: Mandatory acceptance before use
2. **Terms of Service**: Clear usage guidelines
3. **Platform Compliance**: Uses only official APIs
4. **No Downloads**: Metadata and embedding only
5. **User Responsibility**: Clear legal obligations

### Privacy & Security
1. **Zero Data Storage**: No persistent user data
2. **No Tracking**: No analytics or cookies
3. **Security Headers**: HSTS, CSP, XSS protection
4. **Rate Limiting**: Prevents abuse
5. **Input Sanitization**: XSS prevention

### User Experience
1. **Responsive Design**: Mobile and desktop
2. **Dark Mode**: System preference detection
3. **Error Handling**: Clear error messages
4. **Loading States**: User feedback
5. **Accessibility**: Semantic HTML and ARIA labels

## 📊 Data Flow

```
User Input (URL)
    ↓
[VideoInput Component]
    ↓
[Client-side validation]
    ↓
POST /api/metadata
    ↓
[Rate Limiting Check]
    ↓
[URL Parsing & Platform Detection]
    ↓
[Platform API Call]
├── YouTube Data API v3
├── Vimeo oEmbed API
└── Direct Link Processing
    ↓
[Data Sanitization]
    ↓
[Response to Client]
    ↓
[MetadataDisplay Component]
    ↓
[User Views Results]
```

## 🔐 Security Measures

### Input Security
- URL format validation
- Platform detection
- Length limits (5000 chars)
- HTML tag removal
- Special character escaping

### Rate Limiting
```typescript
Default Configuration:
- Max Requests: 10 per window
- Window Duration: 60 seconds
- Identifier: Client IP address
- Storage: In-memory (cleared on restart)
```

### Security Headers
```
- Strict-Transport-Security: max-age=31536000
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 🌐 API Integration

### YouTube Data API v3
**Purpose**: Fetch video metadata
**Authentication**: API Key (server-side)
**Quota**: 10,000 units/day (free tier)
**Cost per request**: ~3 units
**Rate**: ~3,300 videos/day

**Data Retrieved**:
- Video ID, title, description
- Thumbnail images
- Channel/author name
- View count, duration
- Publication date
- Embeddability status

### Vimeo oEmbed API
**Purpose**: Fetch public video metadata
**Authentication**: None required
**Quota**: No official limit (fair use)
**Restrictions**: Public videos only

**Data Retrieved**:
- Video ID, title, description
- Thumbnail URL
- Author name
- Embed URL

## 🚀 Deployment Options

### Recommended: Vercel
- Zero configuration
- Automatic HTTPS
- Edge network
- Environment variables
- Free tier available

### Alternatives
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Docker (self-hosted)
- VPS with PM2 + Nginx

## 📦 Dependencies

### Production Dependencies
```json
{
  "next": "^14.1.0",           // React framework
  "react": "^18.2.0",          // UI library
  "react-dom": "^18.2.0",      // React DOM renderer
  "axios": "^1.6.5",           // HTTP client
  "zod": "^3.22.4"             // Validation (future use)
}
```

### Development Dependencies
```json
{
  "typescript": "^5.3.3",      // Type checking
  "tailwindcss": "^3.4.1",     // CSS framework
  "eslint": "^8.56.0",         // Code linting
  "@types/*": "..."            // TypeScript types
}
```

## 🎯 Key Design Decisions

### Why Next.js?
- Full-stack framework (frontend + API)
- Server-side rendering for SEO
- API routes for backend logic
- Excellent developer experience
- Easy deployment

### Why TypeScript?
- Type safety prevents bugs
- Better IDE support
- Self-documenting code
- Easier refactoring

### Why Tailwind CSS?
- Utility-first approach
- Responsive design built-in
- Dark mode support
- Small production bundle
- Fast development

### Why In-Memory Rate Limiting?
- No database required
- Simple implementation
- Fast performance
- Privacy-friendly (no persistent storage)
- Suitable for serverless

### Why No Database?
- Privacy by design
- Simpler deployment
- Lower costs
- Fewer security concerns
- GDPR compliance

## ⚠️ Important Limitations

### By Design (Legal/Ethical)
- No video downloading
- No DRM bypassing
- No scraping
- No private content access
- No terms of service violations

### Technical
- YouTube API quota: 10,000 units/day
- Rate limiting: 10 requests/minute
- No caching (privacy)
- No offline mode
- Requires active internet

### Platform Restrictions
- YouTube: Public/unlisted only
- Vimeo: Public only
- No age-restricted content (may require auth)
- Subject to platform changes

## 🔄 Future Enhancements

### Planned
- Playlist support (YouTube)
- Channel information
- Search functionality
- Better error messages
- Improved accessibility

### Considered (Legal Only)
- More platforms (if APIs available)
- Export metadata to JSON
- Batch URL processing
- History (client-side only)

### Not Planned (Violates Principles)
- Video downloading
- DRM circumvention
- Scraping/unofficial APIs
- User data collection

## 📝 File Descriptions

### Core Application Files
- **app/page.tsx**: Main UI with state management
- **app/layout.tsx**: Root layout and metadata
- **app/api/metadata/route.ts**: API endpoint logic

### Component Files
- **LegalDisclaimer.tsx**: Legal terms modal
- **VideoInput.tsx**: URL input with validation
- **MetadataDisplay.tsx**: Results display
- **ErrorDisplay.tsx**: Error messages

### Library Files
- **lib/legal.ts**: Legal notice content
- **lib/rateLimit.ts**: Rate limiting logic
- **lib/utils.ts**: Helper functions

### Configuration Files
- **next.config.js**: Next.js settings
- **tailwind.config.js**: Tailwind configuration
- **tsconfig.json**: TypeScript settings
- **middleware.ts**: Security headers

### Documentation Files
- **README.md**: Main documentation
- **FAQ.md**: Common questions
- **API.md**: API reference
- **DEPLOYMENT.md**: Deployment guide
- **CONTRIBUTING.md**: Contribution guide
- **SECURITY.md**: Security policy

## 🎓 Learning Resources

This project demonstrates:
- Next.js 14 App Router
- TypeScript best practices
- API integration
- Security implementation
- Legal compliance in software
- Privacy-first design
- Responsive UI with Tailwind
- Error handling
- Rate limiting
- Input validation

## 📊 Code Statistics

- **Total Files**: ~30
- **TypeScript/TSX Files**: 18
- **Components**: 4
- **API Routes**: 1
- **Documentation Files**: 7
- **Lines of Code**: ~2,500+

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code of conduct
- Development setup
- Pull request process
- Code style guidelines
- Legal requirements

## 📞 Support

- **Documentation**: README.md, FAQ.md, API.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Security**: See SECURITY.md

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

**Important**: Using this software does not exempt users from legal responsibilities.

---

**Built with ❤️ for legal and ethical media access**

*Last Updated: February 15, 2026*
