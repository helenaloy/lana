# 🚀 Quick Start Guide

Get Mobile Home Lana website running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- pnpm (or npm/yarn)

## Step 1: Install Dependencies

```bash
cd Lana
pnpm install
```

Don't have pnpm? Install it:
```bash
npm install -g pnpm
```

## Step 2: Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your email settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
INQUIRY_TO=lana.mobilehome@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Gmail users:** Create an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

## Step 3: Customize Content (Optional)

### Update Site Info
Edit `content/site.json`:
- Change address
- Update contact details
- Set your map coordinates

### Add Your Images
1. Place images in `public/images/gallery/`
2. Update `content/gallery.json` with image paths

### Set Booked Dates
Edit `content/availability.json`:
```json
[
  {
    "startISO": "2025-11-01",
    "endISO": "2025-11-05"
  }
]
```

## Step 4: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Step 5: Test Everything

- ✅ Browse all pages (Home, Accommodation, Gallery, Location, Availability, Contact)
- ✅ Switch language (HR ↔ EN)
- ✅ Check gallery lightbox
- ✅ Verify map shows correct location
- ✅ Test inquiry form (check email arrives)

## Step 6: Build for Production

```bash
pnpm build
pnpm start
```

## Verify Setup

Run the setup checker:
```bash
pnpm check-setup
```

## Common Issues

**Map not showing?**
→ Update coordinates in `content/site.json`

**Email not sending?**
→ Check SMTP credentials in `.env.local`

**Images not loading?**
→ Verify paths in `content/gallery.json`

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) to go live
- ❓ Check [FAQ.md](FAQ.md) for common questions
- 🏗️ Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) to understand the code

## Deploy to Vercel (Optional)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy! 🎉

---

**That's it!** Your website is ready. 🏡✨

