# Project Structure

Detailed overview of the Mobile Home Lana project structure.

## 📂 Directory Overview

```
Lana/
├── app/                          # Next.js 14 App Router
│   ├── [locale]/                # Internationalized routes
│   │   ├── layout.tsx          # Locale-specific layout (with next-intl provider)
│   │   ├── page.tsx            # Home page
│   │   ├── accommodation/      # Accommodation details page
│   │   ├── gallery/            # Image gallery page
│   │   ├── location/           # Location with map page
│   │   ├── availability/       # Availability calendar & inquiry form
│   │   └── contact/            # Contact information page
│   ├── api/                    # API routes
│   │   └── inquiry/            # POST endpoint for inquiry submissions
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles and Tailwind imports
│   ├── robots.ts               # robots.txt generation
│   └── sitemap.ts              # sitemap.xml generation
│
├── components/                  # React components
│   ├── Header.tsx              # Main navigation header with mobile menu
│   ├── Footer.tsx              # Site footer with links and contact info
│   ├── LangSwitcher.tsx        # Language switcher (HR/EN)
│   ├── AmenityList.tsx         # Grid of amenities with icons
│   ├── GalleryGrid.tsx         # Gallery grid with lightbox
│   ├── MapComponent.tsx        # Map wrapper (client-side only)
│   ├── MapContent.tsx          # Leaflet map implementation
│   ├── MapPreview.tsx          # Smaller map for home page
│   ├── AvailabilityCalendar.tsx # Interactive calendar with booked dates
│   └── InquiryForm.tsx         # Inquiry form with validation
│
├── content/                     # Content JSON files (easy to edit)
│   ├── site.json               # Site information, coordinates, amenities
│   ├── gallery.json            # List of gallery images with captions
│   ├── availability.json       # Booked date ranges
│   └── meta.json               # SEO metadata for each page
│
├── lib/                         # Utility libraries
│   ├── i18n.ts                 # next-intl configuration
│   ├── validators.ts           # Zod validation schemas
│   ├── email.ts                # Nodemailer setup and rate limiting
│   └── date-utils.ts           # Date manipulation utilities
│
├── messages/                    # Internationalization files
│   ├── hr.json                 # Croatian translations
│   └── en.json                 # English translations
│
├── public/                      # Static assets
│   └── images/
│       ├── gallery/            # Gallery images
│       └── placeholder.svg     # Placeholder image
│
├── scripts/                     # Helper scripts
│   └── check-setup.js          # Setup validation script
│
├── types/                       # TypeScript type definitions
│   └── index.ts                # Content type definitions
│
├── middleware.ts                # next-intl middleware for i18n routing
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── README.md                    # Main documentation
├── SETUP.md                     # Quick setup guide
├── DEPLOYMENT.md                # Deployment instructions
├── CHANGELOG.md                 # Version history
└── vercel.json                  # Vercel deployment config
```

## 📄 Key Files Explained

### Configuration Files

#### `next.config.mjs`
- Configures Next.js with next-intl plugin
- Image optimization settings
- Package import optimizations

#### `middleware.ts`
- Handles locale detection and routing
- Redirects users to appropriate language version
- Runs on every request

#### `tailwind.config.ts`
- Custom color palette (primary, accent)
- Container settings
- Extended theme configuration

#### `tsconfig.json`
- TypeScript compiler options
- Path aliases (`@/*` → project root)
- Strict mode enabled for type safety

### Content Files

#### `content/site.json`
Main site configuration:
- Site name and tagline
- Address and coordinates
- Contact information (email, phone, social media)
- List of amenities
- House rules (bilingual)

**Edit this file to:**
- Change site name
- Update address
- Modify map location
- Add/remove amenities
- Update contact details

#### `content/gallery.json`
Gallery image definitions:
```json
{
  "src": "/images/gallery/image.jpg",
  "alt_hr": "Croatian description",
  "alt_en": "English description"
}
```

**Edit this file to:**
- Add new images
- Change image captions
- Reorder gallery images

#### `content/availability.json`
Booked date ranges:
```json
{
  "startISO": "2025-11-01",
  "endISO": "2025-11-05"
}
```

**Edit this file to:**
- Mark dates as booked
- Update availability
- Can be replaced with Google Calendar sync

#### `content/meta.json`
SEO metadata per page:
- Page titles (HR/EN)
- Meta descriptions (HR/EN)
- Used for `<title>` and Open Graph tags

### Translation Files

#### `messages/hr.json` & `messages/en.json`
All UI strings in Croatian and English:
- Navigation labels
- Page content
- Form labels and validation messages
- Button text
- Error messages

**Structure:**
```json
{
  "navigation": { ... },
  "home": { ... },
  "accommodation": { ... },
  "gallery": { ... },
  "location": { ... },
  "availability": { ... },
  "contact": { ... },
  "footer": { ... },
  "common": { ... }
}
```

### Components

#### Layout Components

**`Header.tsx`**
- Main navigation bar
- Language switcher
- Responsive mobile menu
- Active link highlighting

**`Footer.tsx`**
- Footer with navigation links
- Contact information
- Social media icons
- Copyright notice

**`LangSwitcher.tsx`**
- Toggle between HR/EN
- Updates URL path
- Maintains current page

#### Feature Components

**`GalleryGrid.tsx`**
- Grid layout of images
- Opens lightbox on click
- Responsive (1/2/3 columns)
- Uses `yet-another-react-lightbox`

**`MapComponent.tsx` & `MapContent.tsx`**
- Interactive Leaflet map
- Marker with popup
- Dynamic loading (no SSR issues)
- Customizable zoom level

**`AvailabilityCalendar.tsx`**
- Visual calendar display
- Shows booked dates
- Date range selection
- Integration with inquiry form

**`InquiryForm.tsx`**
- Validated form (React Hook Form + Zod)
- All required fields
- Success/error feedback
- Rate-limited API submission

**`AmenityList.tsx`**
- Grid display of amenities
- Icon + label per item
- Bilingual support
- Responsive grid

### API Routes

#### `app/api/inquiry/route.ts`
POST endpoint for inquiry submissions:
- Validates form data with Zod
- Applies rate limiting (5 req/hour per IP)
- Sends email via Nodemailer
- Returns success/error response

**Input:**
```typescript
{
  name: string;
  email: string;
  phone: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message?: string;
  locale: string;
}
```

**Output:**
```typescript
{
  success: boolean;
  message: string;
}
```

### Library Files

#### `lib/i18n.ts`
- next-intl configuration
- Loads translation messages
- Defines available locales
- Sets default locale

#### `lib/validators.ts`
- Zod schemas for forms
- Inquiry form validation
- Contact form validation
- TypeScript type inference

#### `lib/email.ts`
- Nodemailer transporter setup
- Email sending function
- In-memory rate limiter
- HTML email templates

#### `lib/date-utils.ts`
- Date formatting helpers
- Check if date is booked
- Get all booked dates
- ISO string conversion

## 🎯 Adding New Features

### Add a New Page

1. Create page file: `app/[locale]/new-page/page.tsx`
2. Add translations to `messages/hr.json` and `messages/en.json`
3. Add navigation link in `components/Header.tsx`
4. Add metadata in `content/meta.json`
5. Update sitemap in `app/sitemap.ts`

### Add a New Component

1. Create file in `components/MyComponent.tsx`
2. Use TypeScript for props
3. Make it responsive (mobile-first)
4. Import where needed

### Add New Content Type

1. Create JSON in `content/new-content.json`
2. Define types in `types/index.ts`
3. Import in components/pages as needed

## 🔄 Data Flow

### Page Rendering
```
User visits /hr/availability
↓
middleware.ts validates locale
↓
app/[locale]/availability/page.tsx
↓
Loads translations from messages/hr.json
↓
Fetches data from content/availability.json
↓
Renders with React components
```

### Form Submission
```
User submits inquiry form
↓
Client-side validation (Zod)
↓
POST to /api/inquiry
↓
Rate limit check
↓
Server-side validation
↓
Send email via Nodemailer
↓
Return success/error response
```

## 🛠️ Development Workflow

1. **Start dev server:** `pnpm dev`
2. **Edit content:** Modify JSON files in `content/`
3. **Edit translations:** Update `messages/hr.json` and `messages/en.json`
4. **Create components:** Add to `components/`
5. **Build:** `pnpm build`
6. **Deploy:** Push to GitHub → Vercel auto-deploys

## 📊 Build Output

After `pnpm build`:
- Static pages (SSG): Home, Accommodation, Gallery, Location, Contact
- Server-rendered: Availability (for fresh calendar data)
- API routes: Built and optimized
- Optimized assets in `.next/static/`

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Responsive:** Mobile-first breakpoints
- **Colors:** Custom palette in `tailwind.config.ts`
- **Fonts:** Inter (Google Fonts)
- **Icons:** Emoji placeholders (can be replaced with icon library)

## 🔒 Security Features

- CSRF protection (Next.js built-in)
- Rate limiting on API routes
- Input validation (Zod)
- XSS prevention (React auto-escaping)
- Environment variable protection

## 📈 Performance Optimizations

- Image optimization (`next/image`)
- Static generation where possible
- Dynamic imports for maps (no SSR)
- Lazy loading images
- Font optimization
- Bundle size optimization

## 🧪 Testing Strategy

**Recommended:**
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright or Cypress
- Type checking: `pnpm typecheck`
- Linting: `pnpm lint`

## 📝 Maintenance

**Regular tasks:**
- Update dependencies: `pnpm update`
- Check for security issues: `pnpm audit`
- Review analytics data
- Update content as needed
- Monitor email delivery

---

**Need help?** Check README.md for detailed documentation.

