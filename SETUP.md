# Quick Setup Guide

Follow these steps to get the website running:

## 1. Install Dependencies

```bash
pnpm install
```

If you don't have pnpm installed:
```bash
npm install -g pnpm
```

## 2. Configure Environment

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
INQUIRY_TO=lana.mobilehome@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Add Your Content

### Update Site Information
Edit `content/site.json`:
- Change address
- Update contact info
- Set map coordinates

### Add Gallery Images
1. Place your images in `public/images/gallery/`
2. Update image list in `content/gallery.json`

### Set Booked Dates
Edit `content/availability.json` with your booked date ranges.

### Update Translations
Edit `messages/hr.json` and `messages/en.json` to customize text.

## 4. Run Development Server

```bash
pnpm dev
```

Open http://localhost:3000

## 5. Test Email Sending

1. Fill out the inquiry form on `/availability` page
2. Check that email is received at `INQUIRY_TO` address
3. If not working, check console for errors

## 6. Build for Production

```bash
pnpm build
pnpm start
```

## Common Issues

**Map not showing?**
- Check coordinates format in `content/site.json`
- Ensure Leaflet CSS is loaded

**Email not sending?**
- Verify SMTP credentials
- For Gmail, use App Password (not regular password)
- Check port 587 is not blocked

**Images not loading?**
- Verify paths in `content/gallery.json`
- Check images exist in `public/images/gallery/`
- File extensions must match exactly

## Next Steps

See `README.md` for detailed documentation.

