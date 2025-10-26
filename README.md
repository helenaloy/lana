# Mobile Home Lana / Mobilna kućica Lana

Production-ready, bilingual website for Mobile Home Lana rental business. Built with Next.js 14, TypeScript, Tailwind CSS, and next-intl.

## 🚀 Features

- ✅ **Bilingual (HR/EN)** - Full internationalization with next-intl
- ✅ **Modern Stack** - Next.js 14 App Router, TypeScript, Tailwind CSS
- ✅ **Responsive Design** - Mobile-first, beautiful UI
- ✅ **Gallery with Lightbox** - Image gallery with yet-another-react-lightbox
- ✅ **Interactive Map** - Leaflet/React-Leaflet integration
- ✅ **Availability Calendar** - Visual booking calendar with disabled dates
- ✅ **Inquiry Form** - React Hook Form + Zod validation
- ✅ **Email Notifications** - Nodemailer integration for inquiry submissions
- ✅ **SEO Optimized** - Metadata, sitemap, robots.txt
- ✅ **Type-safe** - Full TypeScript coverage
- ✅ **Performance** - Optimized images, lazy loading, ISR/SSG

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+ (or npm/yarn)

## 🛠️ Installation

1. **Clone or download the project**

```bash
cd Lana
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
INQUIRY_TO=lana.mobilehome@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note for Gmail users:** You need to use an [App Password](https://support.google.com/accounts/answer/185833?hl=en), not your regular Gmail password.

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
.
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── layout.tsx         # Locale layout with next-intl
│   │   ├── page.tsx           # Home page
│   │   ├── accommodation/     # Accommodation details
│   │   ├── gallery/           # Image gallery
│   │   ├── location/          # Location with map
│   │   ├── availability/      # Calendar & inquiry form
│   │   └── contact/           # Contact page
│   ├── api/
│   │   └── inquiry/           # Inquiry submission endpoint
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   ├── robots.ts              # Robots.txt generation
│   └── sitemap.ts             # Sitemap generation
├── components/
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Footer
│   ├── LangSwitcher.tsx       # Language switcher (HR/EN)
│   ├── AmenityList.tsx        # Amenities grid
│   ├── GalleryGrid.tsx        # Gallery with lightbox
│   ├── MapComponent.tsx       # Map wrapper (SSR-safe)
│   ├── MapContent.tsx         # Leaflet map implementation
│   ├── MapPreview.tsx         # Map preview for home page
│   ├── AvailabilityCalendar.tsx # Booking calendar
│   └── InquiryForm.tsx        # Inquiry form with validation
├── content/                   # Content JSON files
│   ├── site.json             # Site info, amenities, rules
│   ├── gallery.json          # Gallery images
│   ├── availability.json     # Booked date ranges
│   └── meta.json             # SEO metadata per page
├── lib/
│   ├── i18n.ts               # next-intl configuration
│   ├── validators.ts         # Zod schemas
│   ├── email.ts              # Nodemailer & rate limiting
│   └── date-utils.ts         # Date utilities
├── messages/
│   ├── hr.json               # Croatian translations
│   └── en.json               # English translations
├── public/
│   └── images/               # Static images
│       └── gallery/          # Gallery images
├── middleware.ts             # next-intl middleware
├── next.config.mjs           # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── package.json
```

## 🎨 Customizing Content

### 1. Site Information (`content/site.json`)

Update your mobile home details:

```json
{
  "name": "Mobile Home Lana / Mobilna kućica Lana",
  "address": {
    "street": "Your Street 123",
    "city": "12345 Your City",
    "country": "Croatia"
  },
  "contact": {
    "email": "your-email@example.com",
    "phone": "+385 91 546 0088"
  },
  "coordinates": {
    "lat": 43.5081,
    "lng": 16.4402
  }
}
```

**To change map location:**
1. Find your coordinates (use [latlong.net](https://www.latlong.net/))
2. Update `coordinates.lat` and `coordinates.lng`

### 2. Amenities

Edit the `amenities` array in `content/site.json`:

```json
{
  "icon": "wifi",
  "label_hr": "Besplatni Wi-Fi",
  "label_en": "Free Wi-Fi"
}
```

### 3. Gallery Images

1. **Add your images** to `public/images/gallery/`
2. **Update** `content/gallery.json`:

```json
[
  {
    "src": "/images/gallery/your-image.jpg",
    "alt_hr": "Croatian description",
    "alt_en": "English description"
  }
]
```

**Image recommendations:**
- Format: JPG or WebP
- Dimensions: 1920x1080 or similar
- File size: < 500KB (use compression tools)

### 4. Availability / Booked Dates

Edit `content/availability.json`:

```json
[
  {
    "startISO": "2025-11-01",
    "endISO": "2025-11-05"
  }
]
```

**Format:** ISO date strings (YYYY-MM-DD)

### 5. Translations

Edit `messages/hr.json` and `messages/en.json` to change any text on the website.

Example - changing hero text:

```json
// messages/hr.json
{
  "home": {
    "hero": {
      "title": "Vaš novi naslov",
      "subtitle": "Vaš novi podnaslov"
    }
  }
}
```

### 6. SEO Metadata

Update page titles and descriptions in `content/meta.json`:

```json
{
  "home": {
    "title_hr": "Your Croatian Title",
    "title_en": "Your English Title",
    "description_hr": "Your Croatian description",
    "description_en": "Your English description"
  }
}
```

## 📧 Email Configuration

### Using Gmail

1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Use these settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

### Using Other SMTP Providers

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

## 📅 Replacing Availability Source

Currently, availability is read from `content/availability.json`. To integrate with Google Calendar:

### Option 1: Google Calendar ICS Feed

1. Make your Google Calendar public
2. Get the ICS URL from Calendar Settings
3. Create a new file `lib/calendar-sync.ts`:

```typescript
export async function fetchGoogleCalendarEvents(icsUrl: string) {
  const response = await fetch(icsUrl);
  const icsData = await response.text();
  // Parse ICS format and return booked intervals
  // Use a library like 'node-ical' or 'ical.js'
}
```

4. Update `content/availability.json` via a cron job or on-demand

### Option 2: Google Calendar API

1. Set up Google Calendar API credentials
2. Install `googleapis` package
3. Fetch events and transform to `BookedInterval[]` format

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

**Build for production:**

```bash
pnpm build
```

**Start production server:**

```bash
pnpm start
```

**Environment variables** must be set on your hosting platform.

## 🧪 Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript type checking
```

## 🎯 Lighthouse Score Goals

Target scores (on Home page):

- **Performance:** ≥ 90
- **Accessibility:** ≥ 90
- **Best Practices:** ≥ 90
- **SEO:** 100

**Tips to maintain scores:**
- Optimize images (use WebP, compress)
- Use `next/image` component (already implemented)
- Keep bundle size small
- Ensure proper heading hierarchy
- Add alt texts to all images

## 🛠️ Rate Limiting

The inquiry API has a simple in-memory rate limiter:
- **5 requests per hour per IP**

For production, consider:
- Redis-based rate limiting
- CAPTCHA integration (e.g., reCAPTCHA)
- Cloudflare rate limiting

## 🐛 Troubleshooting

### Map not showing

- Ensure Leaflet CSS is imported in `MapContent.tsx`
- Check browser console for errors
- Verify coordinates are valid numbers

### Email not sending

- Check SMTP credentials in `.env.local`
- Verify firewall/port 587 is open
- Check console logs for error messages
- Test with a simple email client first

### Images not displaying

- Verify image paths in `content/gallery.json`
- Check that images exist in `public/images/gallery/`
- Ensure image file extensions match (case-sensitive on Linux)

### Language switcher not working

- Clear browser cache
- Check that both locale message files exist
- Verify middleware configuration in `middleware.ts`

## 📝 License

This project is private and proprietary for Mobile Home Lana.

## 🤝 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for Mobile Home Lana**

