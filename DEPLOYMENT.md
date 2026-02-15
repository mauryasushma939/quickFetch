# Deployment Guide

This guide will help you deploy QuickFetch to various platforms.

## Prerequisites

Before deploying:
- ✅ All code tested locally
- ✅ YouTube API key obtained
- ✅ Environment variables configured
- ✅ Git repository set up

## Environment Variables

All platforms require these environment variables:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
ALLOWED_ORIGINS=https://yourdomain.com
```

## Vercel (Recommended)

### Why Vercel?
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- CDN included
- Generous free tier

### Deployment Steps

1. **Install Vercel CLI (optional)**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**
   ```bash
   vercel
   ```
   
   Or via GitHub:

3. **GitHub Integration**
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

4. **Configure Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required variables
   - Redeploy if needed

5. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Vercel Configuration

Create `vercel.json` (optional):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## Netlify

### Deployment Steps

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build Configuration**
   
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"

   [build.environment]
     NODE_VERSION = "18"
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```
   
   Or connect via GitHub in Netlify dashboard.

4. **Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add all required variables

## Docker

### Dockerfile

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t quickfetch .

# Run container
docker run -p 3000:3000 \
  -e YOUTUBE_API_KEY=your_key \
  -e RATE_LIMIT_MAX_REQUESTS=10 \
  -e RATE_LIMIT_WINDOW_MS=60000 \
  quickfetch
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  quickfetch:
    build: .
    ports:
      - "3000:3000"
    environment:
      - YOUTUBE_API_KEY=${YOUTUBE_API_KEY}
      - RATE_LIMIT_MAX_REQUESTS=10
      - RATE_LIMIT_WINDOW_MS=60000
      - ALLOWED_ORIGINS=http://localhost:3000
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## AWS Amplify

### Deployment Steps

1. **Install Amplify CLI**
   ```bash
   npm i -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Build Settings**
   
   Create `amplify.yml`:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

5. **Environment Variables**
   - Go to Amplify Console
   - Select your app
   - Go to Environment Variables
   - Add all required variables

## DigitalOcean App Platform

### Deployment Steps

1. **Connect Repository**
   - Go to DigitalOcean App Platform
   - Create new app
   - Connect GitHub repository

2. **Configure Build**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment: Node.js 18

3. **Environment Variables**
   - Add variables in app settings
   - Include all required variables

4. **Deploy**
   - Click "Deploy"
   - Monitor build logs

## Railway

### Deployment Steps

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - New Project > Deploy from GitHub
   - Select repository

2. **Environment Variables**
   - Go to Variables tab
   - Add all required variables

3. **Deploy**
   - Railway auto-detects Next.js
   - Automatic deployment on push

## Self-Hosted (VPS)

### Using PM2

1. **Install Node.js and PM2**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm i -g pm2
   ```

2. **Clone and Build**
   ```bash
   git clone https://github.com/yourusername/quickFetch.git
   cd quickFetch
   npm install
   npm run build
   ```

3. **Create Ecosystem File**
   
   Create `ecosystem.config.js`:
   ```javascript
   module.exports = {
     apps: [{
       name: 'quickfetch',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
         YOUTUBE_API_KEY: 'your_key_here',
         RATE_LIMIT_MAX_REQUESTS: 10,
         RATE_LIMIT_WINDOW_MS: 60000
       }
     }]
   };
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Nginx Reverse Proxy**
   
   Create `/etc/nginx/sites-available/quickfetch`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

6. **Enable and SSL**
   ```bash
   sudo ln -s /etc/nginx/sites-available/quickfetch /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   
   # Install SSL with Certbot
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Post-Deployment Checklist

After deploying:
- [ ] Test all functionality
- [ ] Verify HTTPS is working
- [ ] Test rate limiting
- [ ] Check API key works
- [ ] Verify security headers
- [ ] Test on mobile devices
- [ ] Monitor error logs
- [ ] Set up monitoring/alerts
- [ ] Test from different locations
- [ ] Verify legal disclaimer displays

## Monitoring

### Recommended Tools
- **Uptime:** UptimeRobot, Pingdom
- **Analytics:** Plausible (privacy-focused)
- **Errors:** Sentry (optional)
- **Performance:** Vercel Analytics

### YouTube API Quota
- Monitor your quota usage
- Default quota: 10,000 units/day
- Each metadata request: ~3 units
- Set up alerts at 80% usage

## Troubleshooting

### Build Failures
- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors

### API Errors
- Verify YouTube API key is correct
- Check API key restrictions
- Ensure YouTube Data API v3 is enabled

### Rate Limiting Issues
- Adjust `RATE_LIMIT_MAX_REQUESTS`
- Check client IP detection
- Review rate limit logs

## Security in Production

1. **Always use HTTPS**
2. **Set strong CORS policies**
3. **Enable security headers**
4. **Monitor API usage**
5. **Keep dependencies updated**
6. **Regular security audits**

## Scaling

### Performance Optimization
- Enable Vercel Edge Functions
- Use CDN for static assets
- Implement caching strategies
- Optimize images

### High Traffic
- Increase rate limits gradually
- Monitor API quotas
- Consider multiple YouTube API keys
- Use load balancing

## Updates

To update your deployment:
```bash
git pull origin main
npm install
npm run build
pm2 restart quickfetch  # If using PM2
```

Or commit to main branch for auto-deploy platforms.

---

**Need help?** Open an issue on GitHub or check the README for support options.
