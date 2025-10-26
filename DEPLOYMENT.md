# Deployment Guide

This guide covers deploying Mobile Home Lana website to various platforms.

## Prerequisites

Before deploying, ensure:
- ✅ All environment variables are configured
- ✅ Content files are updated with your data
- ✅ Images are added to `public/images/gallery/`
- ✅ Project builds successfully (`pnpm build`)

## Vercel (Recommended)

Vercel is the easiest and recommended platform for Next.js deployment.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.example`:
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_USER`
     - `SMTP_PASS`
     - `INQUIRY_TO`
     - `NEXT_PUBLIC_SITE_URL` (your production URL)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live! 🎉

### Custom Domain

1. In Vercel dashboard → Domains
2. Add your domain (e.g., `mobilehome-lana.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Netlify

### Steps:

1. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add all variables from `.env.example` in Site Settings

3. **Deploy**
   - Connect GitHub repository
   - Click "Deploy site"

## Self-Hosted (VPS/Dedicated Server)

### Requirements:
- Node.js 18+
- PM2 or similar process manager
- Nginx (recommended)

### Steps:

1. **Clone and Build**
   ```bash
   git clone your-repo-url
   cd Lana
   pnpm install
   pnpm build
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env.local
   nano .env.local  # Edit with your values
   ```

3. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start "pnpm start" --name mobile-home-lana
   pm2 save
   pm2 startup  # Follow instructions
   ```

4. **Nginx Configuration**
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
       }
   }
   ```

5. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Docker

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

### Build and Run

```bash
docker build -t mobile-home-lana .
docker run -p 3000:3000 --env-file .env.local mobile-home-lana
```

## Post-Deployment Checklist

After deployment, verify:

- [ ] All pages load correctly
- [ ] Language switcher works (HR ↔ EN)
- [ ] Gallery images display
- [ ] Map shows correct location
- [ ] Contact form sends emails
- [ ] Availability calendar displays correctly
- [ ] SEO metadata is correct (check page source)
- [ ] Mobile responsiveness
- [ ] SSL certificate is active (HTTPS)
- [ ] Run Lighthouse audit (target: 90+ scores)

## Monitoring & Maintenance

### Analytics

Add Google Analytics or similar:

1. Create `.env` variable: `NEXT_PUBLIC_GA_ID`
2. Add to `app/[locale]/layout.tsx`

### Error Tracking

Consider adding:
- Sentry
- LogRocket
- Datadog

### Performance Monitoring

- Use Vercel Analytics (built-in)
- Google PageSpeed Insights
- Lighthouse CI

### Regular Updates

- Keep dependencies updated: `pnpm update`
- Monitor security advisories
- Update content files regularly
- Backup database/content files

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### Email Not Sending in Production

- Verify SMTP credentials in environment variables
- Check firewall rules (port 587)
- Test SMTP connection separately
- Check logs for specific errors

### Images Not Loading

- Verify image paths are correct
- Check image files exist in build
- Ensure proper permissions on files
- Check Content Security Policy headers

## Support

For deployment issues, contact the development team or refer to:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)

