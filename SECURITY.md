# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in QuickFetch, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email security concerns to: [your-email@example.com]
3. Include detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Security Features

### Data Privacy
- **No data storage**: Video URLs and metadata are never stored
- **No tracking**: No analytics, cookies, or user profiling
- **Real-time processing**: All requests processed in real-time only
- **No logs**: No logging of user activity (only error logs for debugging)

### Rate Limiting
- Default: 10 requests per 60 seconds per IP
- Prevents API abuse and quota exhaustion
- Configurable via environment variables

### Input Validation
- URL validation and sanitization
- Text content sanitization (removes HTML tags)
- Length limits on all inputs
- Type checking with TypeScript

### Security Headers
Implemented in middleware:
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection`
- `Referrer-Policy`
- `Permissions-Policy`

### API Security
- CORS restrictions
- Method validation (only POST for metadata endpoint)
- Client identification for rate limiting
- Error message sanitization

## Best Practices for Users

### API Keys
- Keep your YouTube API key secret
- Never commit `.env` files to version control
- Use environment variables in production
- Rotate keys periodically

### Deployment
- Use HTTPS in production
- Set appropriate CORS origins
- Configure rate limits based on expected traffic
- Monitor API usage and quotas

### Platform Compliance
- Always use official APIs
- Respect platform rate limits
- Follow terms of service
- Don't attempt to bypass restrictions

## Known Limitations

### Not Supported
- No direct video downloading (by design)
- No bypassing of DRM or protection
- No access to private/restricted content
- No storage of user data

### API Dependencies
- Requires valid YouTube API key for YouTube metadata
- Subject to platform API changes and rate limits
- Vimeo access limited to public videos

## Security Checklist for Contributors

When contributing, ensure:
- [ ] No new data storage mechanisms
- [ ] All inputs validated and sanitized
- [ ] No bypassing of platform restrictions
- [ ] Security headers maintained
- [ ] Rate limiting not compromised
- [ ] No sensitive data in logs
- [ ] Environment variables used for secrets
- [ ] HTTPS enforced in production configs

## Compliance

QuickFetch is designed to comply with:
- GDPR (no personal data collection)
- Platform terms of service
- Copyright laws
- Web security best practices

## Updates

This security policy may be updated as new security features are added or vulnerabilities are discovered.

Last updated: February 15, 2026
