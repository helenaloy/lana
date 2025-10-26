# Project Structure Overview

Visual representation of the Mobile Home Lana project structure.

```
Lana/
│
├── 📱 app/                              # Next.js 14 App Router
│   ├── [locale]/                        # Internationalized routes (HR/EN)
│   │   ├── layout.tsx                  # Locale-specific layout
│   │   ├── page.tsx                    # 🏠 Home page
│   │   ├── accommodation/
│   │   │   └── page.tsx                # 🛏️ Accommodation details
│   │   ├── gallery/
│   │   │   └── page.tsx                # 🖼️ Photo gallery
│   │   ├── location/
│   │   │   └── page.tsx                # 🗺️ Location & map
│   │   ├── availability/
│   │   │   └── page.tsx                # 📅 Calendar & booking form
│   │   └── contact/
│   │       └── page.tsx                # 📧 Contact information
│   ├── api/
│   │   └── inquiry/
│   │       └── route.ts                # 📨 Inquiry submission API
│   ├── layout.tsx                       # Root layout
│   ├── globals.css                      # 🎨 Global styles
│   ├── robots.ts                        # 🤖 robots.txt generator
│   └── sitemap.ts                       # 🗺️ Sitemap generator
│
├── 🧩 components/                       # Reusable React components
│   ├── Header.tsx                       # 📍 Navigation header
│   ├── Footer.tsx                       # 📍 Site footer
│   ├── LangSwitcher.tsx                 # 🌐 Language toggle (HR/EN)
│   ├── AmenityList.tsx                  # ✨ Amenities grid
│   ├── GalleryGrid.tsx                  # 🖼️ Gallery with lightbox
│   ├── MapComponent.tsx                 # 🗺️ Map wrapper
│   ├── MapContent.tsx                   # 🗺️ Leaflet map
│   ├── MapPreview.tsx                   # 🗺️ Smaller map preview
│   ├── AvailabilityCalendar.tsx         # 📅 Booking calendar
│   └── InquiryForm.tsx                  # 📝 Contact form
│
├── 📄 content/                          # Content JSON files (easy to edit!)
│   ├── site.json                        # 🏠 Site info, amenities, rules
│   ├── gallery.json                     # 🖼️ Gallery images list
│   ├── availability.json                # 📅 Booked date ranges
│   └── meta.json                        # 🔍 SEO metadata per page
│
├── 🛠️ lib/                              # Utility libraries
│   ├── i18n.ts                          # 🌐 next-intl config
│   ├── validators.ts                    # ✅ Zod validation schemas
│   ├── email.ts                         # 📧 Nodemailer & rate limiting
│   └── date-utils.ts                    # 📅 Date helpers
│
├── 🌍 messages/                         # Translations
│   ├── hr.json                          # 🇭🇷 Croatian translations
│   └── en.json                          # 🇬🇧 English translations
│
├── 🖼️ public/                           # Static assets
│   └── images/
│       ├── gallery/                     # 📸 Gallery photos
│       │   ├── exterior-1.jpg
│       │   ├── living-room.jpg
│       │   ├── kitchen.jpg
│       │   ├── bedroom-1.jpg
│       │   ├── bedroom-2.jpg
│       │   ├── bathroom.jpg
│       │   ├── terrace.jpg
│       │   ├── exterior-2.jpg
│       │   ├── dining.jpg
│       │   └── surroundings.jpg
│       └── placeholder.svg              # Placeholder image
│
├── 🔧 scripts/                          # Helper scripts
│   └── check-setup.js                   # ✅ Setup validator
│
├── 📝 types/                            # TypeScript types
│   └── index.ts                         # Type definitions
│
├── ⚙️ Configuration Files
│   ├── .eslintrc.json                   # ESLint config
│   ├── .gitignore                       # Git ignore rules
│   ├── .npmrc                           # pnpm configuration
│   ├── .prettierrc                      # Prettier formatting
│   ├── .prettierignore                  # Prettier ignore
│   ├── middleware.ts                    # next-intl routing
│   ├── next-env.d.ts                    # Next.js types
│   ├── next.config.mjs                  # Next.js config
│   ├── package.json                     # Dependencies & scripts
│   ├── postcss.config.js                # PostCSS config
│   ├── tailwind.config.ts               # Tailwind CSS config
│   ├── tsconfig.json                    # TypeScript config
│   └── vercel.json                      # Vercel deployment
│
└── 📚 Documentation
    ├── README.md                        # 📖 Main documentation
    ├── QUICKSTART.md                    # 🚀 5-minute quick start
    ├── SETUP.md                         # 🔧 Setup instructions
    ├── CHECKLIST.md                     # ✅ Pre-launch checklist
    ├── DEPLOYMENT.md                    # 🌐 Deployment guide
    ├── FAQ.md                           # ❓ Common questions
    ├── PROJECT_STRUCTURE.md             # 🏗️ Detailed structure
    ├── STRUCTURE_OVERVIEW.md            # 📊 This file!
    └── CHANGELOG.md                     # 📝 Version history
```

## Key Directories Explained

### 📱 `/app` - Application Core
The heart of the Next.js application using App Router architecture. Contains all pages and API routes.

### 🧩 `/components` - UI Building Blocks
Reusable React components that make up the website. All are TypeScript-enabled and responsive.

### 📄 `/content` - Editable Content
**The easiest place to make changes!** Update these JSON files to change site content without touching code.

### 🛠️ `/lib` - Utilities
Helper functions and configurations that power the application behind the scenes.

### 🌍 `/messages` - Translations
All user-facing text in both Croatian and English. Edit these to change any text on the website.

### 🖼️ `/public` - Static Files
Images and other static assets. **Add your gallery photos here!**

## File Counts

- **Pages:** 6 (Home, Accommodation, Gallery, Location, Availability, Contact)
- **Components:** 10 reusable UI components
- **API Routes:** 1 (inquiry submission)
- **Content Files:** 4 JSON files
- **Translation Files:** 2 (HR & EN)
- **Documentation Files:** 9 markdown files
- **Configuration Files:** 12 config files

## Technologies Used

| Technology | Purpose | Files |
|------------|---------|-------|
| **Next.js 14** | Framework | `app/*`, `middleware.ts` |
| **TypeScript** | Type Safety | `*.ts`, `*.tsx` |
| **Tailwind CSS** | Styling | `tailwind.config.ts`, `globals.css` |
| **next-intl** | i18n | `lib/i18n.ts`, `messages/*` |
| **React Hook Form** | Forms | `InquiryForm.tsx` |
| **Zod** | Validation | `lib/validators.ts` |
| **Leaflet** | Maps | `MapContent.tsx` |
| **Nodemailer** | Emails | `lib/email.ts` |
| **date-fns** | Dates | `lib/date-utils.ts` |

## Quick Navigation

- **Want to change text?** → `messages/hr.json` or `messages/en.json`
- **Update contact info?** → `content/site.json`
- **Add photos?** → `public/images/gallery/` + `content/gallery.json`
- **Mark dates booked?** → `content/availability.json`
- **Change email settings?** → `.env.local`
- **Customize colors?** → `tailwind.config.ts`

## Size & Complexity

- **Total Lines of Code:** ~3,500 lines
- **Components:** 10 modular components
- **Pages:** 6 fully functional pages
- **API Endpoints:** 1 rate-limited endpoint
- **Languages:** 2 (Croatian & English)
- **Documentation:** Comprehensive (9 guides)

## What Makes This Special

✨ **Production-Ready** - Not a template, but a complete website
📱 **Responsive** - Works on all devices
🌐 **Bilingual** - Full Croatian & English support
🎨 **Modern Design** - Clean, professional UI
⚡ **Fast** - Optimized for performance
🔒 **Secure** - Rate limiting, validation, XSS protection
📖 **Well Documented** - 9 documentation files
🧪 **Type-Safe** - Full TypeScript coverage
♿ **Accessible** - ARIA attributes, semantic HTML
🚀 **SEO Optimized** - Metadata, sitemap, robots.txt

---

**Ready to start?** See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide!

