# Frequently Asked Questions (FAQ)

Common questions and answers about the Mobile Home Lana website.

## General

### Q: What technologies are used in this project?
**A:** The project uses:
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- next-intl (internationalization)
- React Hook Form + Zod (forms)
- Leaflet (maps)
- Nodemailer (emails)

### Q: Do I need coding knowledge to update content?
**A:** No! Most content can be updated by editing JSON files:
- `content/site.json` - site information
- `content/gallery.json` - images
- `content/availability.json` - booking dates
- `messages/hr.json` & `messages/en.json` - translations

### Q: How do I change the website language?
**A:** The language switcher in the navigation allows users to toggle between Croatian (HR) and English (EN).

## Setup & Installation

### Q: I get an error when running `pnpm install`. What should I do?
**A:** Try these steps:
1. Make sure you have Node.js 18+ installed
2. Install pnpm globally: `npm install -g pnpm`
3. Delete `node_modules` and `pnpm-lock.yaml`
4. Run `pnpm install` again

### Q: The development server won't start. What's wrong?
**A:** Check these common issues:
- Port 3000 is already in use (kill other processes or use different port)
- Missing dependencies (run `pnpm install`)
- Syntax errors in code files (check console output)

### Q: How do I set up email sending?
**A:** 
1. Copy `.env.example` to `.env.local`
2. Fill in SMTP credentials (for Gmail, use App Password)
3. Test by submitting the inquiry form

## Content Management

### Q: How do I add new images to the gallery?
**A:**
1. Add image files to `public/images/gallery/`
2. Update `content/gallery.json`:
```json
{
  "src": "/images/gallery/your-image.jpg",
  "alt_hr": "Hrvatski opis",
  "alt_en": "English description"
}
```

### Q: How do I change the map location?
**A:** Edit `content/site.json`:
1. Find your coordinates at [latlong.net](https://www.latlong.net/)
2. Update `coordinates.lat` and `coordinates.lng`
3. Update the `address` section

### Q: How do I mark dates as booked?
**A:** Edit `content/availability.json`:
```json
{
  "startISO": "2025-11-01",
  "endISO": "2025-11-05"
}
```
Use ISO date format: YYYY-MM-DD

### Q: How do I change the contact information?
**A:** Edit `content/site.json`:
```json
"contact": {
  "email": "your-email@example.com",
  "phone": "+385 91 546 0088",
  "facebook": "https://facebook.com/your-page",
  "instagram": "https://instagram.com/your-account"
}
```

### Q: How do I add or remove amenities?
**A:** Edit the `amenities` array in `content/site.json`:
```json
{
  "icon": "wifi",
  "label_hr": "Besplatni Wi-Fi",
  "label_en": "Free Wi-Fi"
}
```

## Translations

### Q: How do I change text on the website?
**A:** Edit `messages/hr.json` (Croatian) or `messages/en.json` (English). For example, to change the hero title:
```json
"home": {
  "hero": {
    "title": "Your New Title"
  }
}
```

### Q: Can I add more languages?
**A:** Yes, but it requires code changes:
1. Add new locale to `lib/i18n.ts`
2. Create `messages/de.json` (for German, etc.)
3. Update middleware and language switcher

### Q: What if I want different content for each language, not just translations?
**A:** Use the locale-specific fields in JSON files (like `label_hr` and `label_en`), or create separate JSON files per locale.

## Features

### Q: How does the booking calendar work?
**A:** 
- Dates in `content/availability.json` are marked as booked
- Users can select available dates
- Selected dates can be pre-filled in the inquiry form
- No actual booking happens - it's an inquiry system

### Q: Does the form actually send emails?
**A:** Yes, if SMTP is configured correctly in `.env.local`. The email goes to the address specified in `INQUIRY_TO`.

### Q: What is rate limiting?
**A:** The inquiry form is limited to 5 submissions per hour per IP address to prevent spam. This is a simple in-memory limiter; for production, consider Redis-based rate limiting.

### Q: Can I integrate with Google Calendar for availability?
**A:** Yes! See the "Replacing Availability Source" section in README.md. You can:
- Fetch ICS feed from public Google Calendar
- Use Google Calendar API
- Update `content/availability.json` via cron job

### Q: Can users book directly on the website?
**A:** Not currently. The form sends an inquiry email. To add booking functionality, you'd need:
- Payment integration (Stripe, PayPal)
- Database for bookings
- Booking confirmation system
- Consider using a booking platform API

## Email Issues

### Q: Emails are not being sent. What should I check?
**A:**
1. Verify SMTP credentials in `.env.local`
2. For Gmail, use App Password (not regular password)
3. Check that port 587 is not blocked by firewall
4. Look at console/logs for error messages
5. Test SMTP credentials with a separate email client

### Q: Can I use a different email provider?
**A:** Yes! Update SMTP settings in `.env.local`. Supported providers:
- Gmail (smtp.gmail.com:587)
- SendGrid (smtp.sendgrid.net:587)
- Mailgun (smtp.mailgun.org:587)
- Any SMTP server

### Q: How do I change the email template?
**A:** Edit the HTML in `lib/email.ts`, in the `sendInquiryEmail` function.

## Deployment

### Q: How do I deploy the website?
**A:** Easiest way:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See DEPLOYMENT.md for detailed instructions.

### Q: Do I need a server to host this?
**A:** No! You can use serverless platforms like:
- Vercel (recommended, free tier available)
- Netlify
- Cloudflare Pages
- Alternatively, self-host on VPS with Node.js

### Q: How much does hosting cost?
**A:** Vercel offers a free tier that's sufficient for most mobile home websites. Paid plans start at ~$20/month for higher traffic.

### Q: Can I use my own domain?
**A:** Yes! In Vercel:
1. Go to project settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL is automatic

## Performance

### Q: How can I improve website speed?
**A:**
- Compress images before uploading (use TinyPNG, Squoosh)
- Use WebP format for images
- Minimize number of gallery images (or lazy load)
- Enable caching on hosting platform
- Use CDN (most hosts include this)

### Q: What should Lighthouse scores be?
**A:** Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

Run audit: Chrome DevTools → Lighthouse tab

### Q: Images are loading slowly. How to fix?
**A:**
1. Compress images (aim for < 200KB per image)
2. Use WebP or AVIF format
3. Ensure `next/image` is used (it is by default)
4. Consider using CDN

## Customization

### Q: How do I change colors?
**A:** Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Change this
    600: '#0284c7',
    // ...
  }
}
```

### Q: How do I change fonts?
**A:** 
1. Update Google Fonts import in `app/globals.css`
2. Update `tailwind.config.ts` font family

### Q: Can I add a blog or news section?
**A:** Yes, but requires development:
1. Create blog content files or integrate CMS
2. Add `/blog` route in `app/[locale]/blog/`
3. Create blog listing and single post pages

### Q: Can I add more pages?
**A:** Yes!
1. Create `app/[locale]/new-page/page.tsx`
2. Add translations
3. Add navigation link in Header
4. Update sitemap

## Troubleshooting

### Q: The map doesn't show. What's wrong?
**A:**
- Check that coordinates in `content/site.json` are valid numbers
- Verify Leaflet CSS is loaded
- Check browser console for errors
- Map may be blocked by ad-blockers

### Q: Language switcher doesn't work
**A:**
- Clear browser cache
- Verify both `messages/hr.json` and `messages/en.json` exist
- Check `middleware.ts` configuration

### Q: Images show as broken
**A:**
- Verify image files exist in `public/images/gallery/`
- Check paths in `content/gallery.json` are correct
- File extensions must match exactly (case-sensitive on Linux)

### Q: Form validation errors don't show in correct language
**A:** Make sure validation message keys in `lib/validators.ts` match keys in `messages/[locale].json` under `availability.validation`.

## Security

### Q: Is the website secure?
**A:** The website includes:
- CSRF protection (Next.js built-in)
- Input validation (Zod)
- Rate limiting
- XSS prevention
- HTTPS (when deployed)

For production, consider adding:
- CAPTCHA on forms
- WAF (Web Application Firewall)
- Security headers

### Q: How is sensitive data protected?
**A:** 
- Environment variables (`.env.local`) are never committed to git
- SMTP credentials are stored securely
- API rate limiting prevents abuse
- No user data is stored (inquiry-only system)

## Support

### Q: I found a bug. What should I do?
**A:** 
1. Check if it's a known issue in CHANGELOG.md
2. Verify your setup with `pnpm check-setup`
3. Check console/terminal for error messages
4. Contact the development team with details

### Q: I need custom functionality. Can I hire developers?
**A:** Yes! The codebase is well-documented and follows Next.js best practices, making it easy for developers to extend.

### Q: Where can I learn more about the technologies used?
**A:** Official documentation:
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [next-intl](https://next-intl-docs.vercel.app)

## Additional Resources

- **README.md** - Complete documentation
- **SETUP.md** - Quick setup guide
- **DEPLOYMENT.md** - Deployment instructions
- **PROJECT_STRUCTURE.md** - Detailed code structure
- **CHANGELOG.md** - Version history

---

**Still have questions?** Contact the development team or check the documentation files listed above.

