# Frequently Asked Questions (FAQ)

## General Questions

### What is QuickFetch?
QuickFetch is a web application that fetches video metadata and embeds videos using official platform APIs. It's designed exclusively for legal and ethical use.

### Is QuickFetch free to use?
Yes, QuickFetch is open-source and free. However, you'll need your own YouTube API key, which has a free tier with daily quotas.

### Can I download videos with QuickFetch?
No. QuickFetch is designed exclusively for legal use and does not provide video downloading functionality that would violate platform terms of service.

## Legal & Compliance

### Is it legal to use QuickFetch?
Yes, when used properly. QuickFetch only uses official APIs and respects platform terms of service. Users are responsible for ensuring they use the tool legally.

### Can I use this for copyrighted content?
QuickFetch only fetches public metadata and embeds videos using official methods. Embedding is allowed by platforms for their content. However, you must respect copyright laws and platform terms.

### What about YouTube's terms of service?
QuickFetch complies with YouTube's terms by:
- Using the official YouTube Data API v3
- Not downloading video files
- Not bypassing any restrictions
- Properly attributing content
- Using official embed codes

### Can I get in trouble for using this?
Not if you use it legally and ethically. QuickFetch is a tool - like a web browser. The responsibility lies with how you use it. Always ensure you have the right to access content.

## Technical Questions

### What platforms are supported?
- **YouTube**: Full metadata and embedding via YouTube Data API v3
- **Vimeo**: Public videos via oEmbed API
- **Direct Links**: Limited support (metadata only, no embedding)

### Why do I need a YouTube API key?
YouTube requires API authentication for all metadata requests. The API key is free and allows you to make 10,000 units worth of requests per day.

### How do I get a YouTube API key?
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Go to Credentials > Create Credentials > API Key
5. Copy the key to your `.env` file

### What happens if I exceed my API quota?
YouTube limits free usage to 10,000 units per day. If exceeded:
- API requests will fail until the quota resets (daily)
- Users will see an error message
- Consider implementing additional rate limiting
- For high usage, request a quota increase from Google

### Does QuickFetch store my data?
No. QuickFetch:
- Does not store video URLs
- Does not collect personal information
- Does not use cookies for tracking
- Processes all requests in real-time only
- Does not log user activity (only error logs for debugging)

### Is my YouTube API key safe?
Your API key should be kept secret:
- Store it in `.env` file (never commit to git)
- Use environment variables in production
- Set up API key restrictions in Google Cloud Console
- Rotate keys periodically

### Can I self-host QuickFetch?
Yes! QuickFetch can be deployed to:
- Vercel (recommended)
- Netlify
- AWS
- DigitalOcean
- Your own VPS
- Docker containers

See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions.

## Features

### Can I add support for other platforms?
Yes, but only if:
- The platform provides an official API
- Using the API doesn't violate terms of service
- It's for legal, metadata-fetching purposes only
- See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines

### Can I customize the UI?
Yes! QuickFetch is open-source. You can:
- Modify the design
- Change colors and styling
- Add features (that comply with legal requirements)
- Customize for your use case

### Does it work on mobile?
Yes, QuickFetch is fully responsive and works on:
- Desktop browsers
- Mobile phones
- Tablets
- Any device with a modern web browser

## Privacy & Security

### What data does QuickFetch collect?
QuickFetch collects:
- **Nothing persistent**: No user data is stored
- **Rate limiting**: IP addresses for rate limiting (in-memory only)
- **Error logs**: Server errors for debugging (no user data)

### How is my privacy protected?
- No tracking scripts
- No analytics (optional: use privacy-focused analytics)
- No cookies for tracking
- No user accounts
- All processing is real-time

### Is it secure?
Yes, QuickFetch implements:
- HTTPS (in production)
- Security headers (HSTS, CSP, etc.)
- Input validation and sanitization
- Rate limiting
- CORS restrictions
- No data storage vulnerabilities

## Usage

### Why is my video not found?
Possible reasons:
- Video is private or unlisted
- Video has been deleted
- Invalid URL format
- Geographic restrictions
- API key issues

### What's the rate limit?
Default: 10 requests per minute per IP address. This is configurable in `.env`:
```env
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

### Can I increase the rate limit?
Yes, but be mindful of:
- YouTube API quotas
- Server resources
- Potential abuse
- Platform rate limits

### Why are some videos not embeddable?
Some videos have embedding disabled by their creators. QuickFetch respects this setting and will indicate when a video cannot be embedded.

### Can I use this for a commercial project?
Yes, QuickFetch is MIT licensed. However:
- You must use it legally
- Respect platform terms of service
- Acquire your own API keys
- Don't use it to violate copyright

## Development

### How do I contribute?
See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines. In summary:
1. Fork the repository
2. Create a feature branch
3. Make your changes (legal and ethical only)
4. Submit a pull request

### What technologies are used?
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **APIs**: YouTube Data API v3, Vimeo oEmbed
- **Deployment**: Vercel-ready

### Can I report a bug?
Yes! Please:
1. Check existing issues first
2. Open a new issue on GitHub
3. Include reproduction steps
4. Provide error messages
5. Describe expected vs actual behavior

### Can I request a feature?
Yes, but it must be:
- Legal and ethical
- Compliant with platform terms
- Privacy-respecting
- Within the scope of the project

Open a GitHub issue with your feature request.

## Troubleshooting

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### API key not working
- Check if YouTube Data API v3 is enabled
- Verify API key is correct in `.env`
- Check API key restrictions in Google Cloud Console
- Ensure no extra spaces in `.env` file

### Rate limit errors appearing
- Check your rate limit configuration
- Client IP detection might be incorrect
- Adjust `RATE_LIMIT_MAX_REQUESTS` if needed

### Videos not loading
- Verify URL format is correct
- Check if video is public
- Try a different video
- Check browser console for errors

### Styling issues
```bash
# Rebuild Tailwind
npm run build
```

## Support

### Where can I get help?
- **Documentation**: README.md, DEPLOYMENT.md, CONTRIBUTING.md
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Security**: Email privately (see SECURITY.md)

### How do I report a security vulnerability?
See [SECURITY.md](SECURITY.md) for responsible disclosure process. Do not open public issues for security vulnerabilities.

### Can I use this for learning?
Absolutely! QuickFetch is a great learning resource for:
- Next.js App Router
- TypeScript
- API integration
- Security best practices
- Legal and ethical coding

## Miscellaneous

### Why was QuickFetch created?
To provide a legal, ethical, and privacy-respecting way to interact with video platforms while demonstrating best practices in web development.

### What's the future of QuickFetch?
Planned improvements:
- More platform support (where legal)
- Better accessibility
- Performance optimizations
- Enhanced error handling
- Improved documentation

### Can I donate or support the project?
The best support is:
- Using it responsibly
- Reporting bugs
- Contributing code
- Spreading the word
- Following legal and ethical practices

---

**Still have questions?** Open an issue on GitHub or start a discussion!
