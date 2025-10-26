# 📋 Setup Checklist

Complete this checklist before launching your Mobile Home Lana website.

## 🔧 Initial Setup

- [ ] Install Node.js 18+ ([nodejs.org](https://nodejs.org))
- [ ] Install pnpm: `npm install -g pnpm`
- [ ] Clone/download the project
- [ ] Run `pnpm install` to install dependencies

## 📧 Email Configuration

- [ ] Copy `.env.example` to `.env.local`
- [ ] Set up SMTP credentials:
  - [ ] `SMTP_HOST` (e.g., smtp.gmail.com)
  - [ ] `SMTP_PORT` (e.g., 587)
  - [ ] `SMTP_USER` (your email)
  - [ ] `SMTP_PASS` (App Password for Gmail)
  - [ ] `INQUIRY_TO` (where inquiries should be sent)
- [ ] Test email sending by submitting inquiry form

## 📝 Content Updates

### Site Information (`content/site.json`)
- [ ] Update site name
- [ ] Change address details
- [ ] Update contact information (email, phone)
- [ ] Add social media links (Facebook, Instagram)
- [ ] Set correct map coordinates ([use latlong.net](https://www.latlong.net))
- [ ] Customize amenities list
- [ ] Update house rules

### Gallery (`content/gallery.json`)
- [ ] Add your photos to `public/images/gallery/`
- [ ] Update image list with correct filenames
- [ ] Add Croatian descriptions (alt_hr)
- [ ] Add English descriptions (alt_en)
- [ ] Optimize images (compress to < 300KB each)

### Availability (`content/availability.json`)
- [ ] Remove example booked dates
- [ ] Add your actual booked date ranges
- [ ] Keep dates in YYYY-MM-DD format

### SEO Metadata (`content/meta.json`)
- [ ] Update page titles for each page (HR & EN)
- [ ] Write unique descriptions for each page (HR & EN)
- [ ] Keep titles under 60 characters
- [ ] Keep descriptions under 160 characters

## 🌐 Translations

### Croatian (`messages/hr.json`)
- [ ] Review all text content
- [ ] Customize hero section text
- [ ] Update accommodation details
- [ ] Personalize contact page text

### English (`messages/en.json`)
- [ ] Review all text content
- [ ] Ensure translations match Croatian version
- [ ] Check for grammar and spelling

## 🎨 Customization (Optional)

- [ ] Change color scheme in `tailwind.config.ts`
- [ ] Update fonts (Google Fonts in `app/globals.css`)
- [ ] Adjust container widths and spacing
- [ ] Customize header/footer styling

## ✅ Testing

- [ ] Run `pnpm dev` - site loads without errors
- [ ] Test on desktop browser
- [ ] Test on mobile browser
- [ ] Check all pages (6 total)
- [ ] Test language switcher (HR ↔ EN)
- [ ] Open gallery and test lightbox
- [ ] Verify map shows correct location
- [ ] Select dates on availability calendar
- [ ] Submit inquiry form and receive email
- [ ] Test form validation (try submitting empty form)
- [ ] Check responsiveness on different screen sizes

## 🚀 Pre-Deployment

- [ ] Run `pnpm build` successfully
- [ ] Run `pnpm typecheck` with no errors
- [ ] Run `pnpm lint` and fix any issues
- [ ] Test production build locally (`pnpm start`)
- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Verify all images display correctly
- [ ] Check page load speed
- [ ] Test forms in production mode

## 🌍 Deployment

- [ ] Choose hosting platform (Vercel recommended)
- [ ] Set up GitHub repository
- [ ] Push code to GitHub
- [ ] Connect repository to hosting platform
- [ ] Add environment variables on hosting platform
- [ ] Deploy and verify deployment success
- [ ] Test live website thoroughly

## 🔒 Security

- [ ] Environment variables are NOT committed to git
- [ ] `.gitignore` includes `.env.local`
- [ ] SMTP credentials are secure
- [ ] Test rate limiting (try 6+ form submissions)

## 📊 Post-Launch

- [ ] Add Google Analytics (optional)
- [ ] Set up Google Search Console
- [ ] Submit sitemap to search engines
- [ ] Test website on multiple devices
- [ ] Share with test users for feedback
- [ ] Monitor email delivery
- [ ] Check error logs regularly

## 🎯 Custom Domain (Optional)

- [ ] Purchase domain name
- [ ] Configure DNS settings
- [ ] Add custom domain in hosting platform
- [ ] Verify SSL certificate is active
- [ ] Update `NEXT_PUBLIC_SITE_URL` in environment variables
- [ ] Test website on custom domain

## 📱 Social Media

- [ ] Share website on Facebook
- [ ] Share website on Instagram
- [ ] Add link to social media bios
- [ ] Consider creating booking button/link

## 🔄 Ongoing Maintenance

- [ ] Update availability regularly
- [ ] Check and respond to inquiries promptly
- [ ] Update gallery with new photos
- [ ] Monitor website performance
- [ ] Update dependencies monthly: `pnpm update`
- [ ] Keep content fresh and accurate

## 📝 Documentation Review

- [ ] Read README.md
- [ ] Review SETUP.md
- [ ] Check FAQ.md for common issues
- [ ] Understand PROJECT_STRUCTURE.md
- [ ] Bookmark DEPLOYMENT.md for future updates

## ✨ Nice to Have

- [ ] Set up automatic availability sync with Google Calendar
- [ ] Add reviews/testimonials section
- [ ] Create blog for local tips
- [ ] Add pricing information
- [ ] Integrate with booking platforms (Airbnb, Booking.com)
- [ ] Add more languages (German, Italian, etc.)
- [ ] Set up automated backups
- [ ] Add live chat support

---

## 🎉 Launch Day

When all checkboxes above are complete:

1. ✅ Announce launch on social media
2. ✅ Share with friends and family
3. ✅ Submit to search engines
4. ✅ Add to online directories
5. ✅ Start accepting bookings!

**Congratulations on launching your Mobile Home Lana website! 🏡✨**

