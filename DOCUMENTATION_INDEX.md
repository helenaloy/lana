# 📚 Documentation Index

Complete guide to all documentation for Mobile Home Lana website.

---

## 🚀 Getting Started (Choose Your Path)

### For First-Time Users
Start here if this is your first time with the project:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡ - Get running in 5 minutes
2. **[SETUP.md](SETUP.md)** 🔧 - Detailed setup instructions
3. **[CHECKLIST.md](CHECKLIST.md)** ✅ - Pre-launch checklist

### For Content Editors
Non-technical users who want to update content:

1. **[FAQ.md](FAQ.md)** ❓ - See "Content Management" section
2. **Content Files Guide** (below)
3. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - "Content Update Workflow" section

### For Developers
Technical users who want to understand or modify code:

1. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** 🏗️ - Detailed code structure
2. **[STRUCTURE_OVERVIEW.md](STRUCTURE_OVERVIEW.md)** 📊 - Visual overview
3. **[README.md](README.md)** 📖 - Complete technical documentation

---

## 📖 All Documentation Files

### Core Documentation

#### [README.md](README.md) 📖
**The main documentation file**
- Complete project overview
- Installation instructions
- Customization guide
- Email configuration
- Troubleshooting
- Deployment basics

**Read if:** You want comprehensive information about the project

---

#### [QUICKSTART.md](QUICKSTART.md) ⚡
**5-minute quick start guide**
- Minimal steps to get running
- Install dependencies
- Setup environment
- Run development server
- Quick deployment to Vercel

**Read if:** You want to get started immediately without details

---

#### [SETUP.md](SETUP.md) 🔧
**Detailed setup instructions**
- Step-by-step configuration
- Common issues and solutions
- Content update instructions
- Email setup examples

**Read if:** You need detailed guidance through setup process

---

### Planning & Checklists

#### [CHECKLIST.md](CHECKLIST.md) ✅
**Pre-launch checklist**
- Initial setup tasks
- Email configuration
- Content updates needed
- Testing checklist
- Deployment steps
- Post-launch tasks

**Read if:** You want a systematic approach to launching the site

---

#### [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) 📊
**Complete project overview**
- Feature list
- Technology stack
- Project statistics
- Content management workflow
- Success metrics
- Quality assurance

**Read if:** You want a high-level overview of the entire project

---

### Technical Documentation

#### [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 🏗️
**Detailed code organization**
- Directory structure explained
- Key files breakdown
- Data flow diagrams
- Component descriptions
- API documentation
- Development workflow

**Read if:** You're a developer who needs to understand or modify code

---

#### [STRUCTURE_OVERVIEW.md](STRUCTURE_OVERVIEW.md) 📊
**Visual project structure**
- Visual tree diagram
- File counts
- Technology breakdown
- Quick navigation guide
- Size & complexity metrics

**Read if:** You want a quick visual understanding of project layout

---

### Deployment & Operations

#### [DEPLOYMENT.md](DEPLOYMENT.md) 🌐
**Deployment instructions**
- Vercel deployment (recommended)
- Netlify deployment
- Self-hosted deployment
- Docker deployment
- Post-deployment checklist
- Monitoring & maintenance

**Read if:** You're ready to deploy the site to production

---

### Help & Support

#### [FAQ.md](FAQ.md) ❓
**Frequently asked questions**
- General questions
- Setup & installation
- Content management
- Features explanation
- Email issues
- Deployment help
- Performance tips
- Security info

**Read if:** You have a specific question or problem

---

### Project Information

#### [CHANGELOG.md](CHANGELOG.md) 📝
**Version history**
- Release notes
- Feature additions
- Technical stack details
- Version 1.0.0 information

**Read if:** You want to know what's included in this version

---

## 📁 Content Files Guide

These JSON files control website content (no coding required):

### [content/site.json](content/site.json)
**What it contains:**
- Site name and tagline
- Address and coordinates
- Contact information
- Social media links
- Amenities list
- House rules (bilingual)

**Edit when:**
- Changing contact information
- Moving location
- Adding/removing amenities
- Updating house rules

---

### [content/gallery.json](content/gallery.json)
**What it contains:**
- List of gallery images
- Image file paths
- Croatian descriptions (alt_hr)
- English descriptions (alt_en)

**Edit when:**
- Adding new photos
- Removing photos
- Changing image descriptions
- Reordering gallery

**Related files:** Images in `public/images/gallery/`

---

### [content/availability.json](content/availability.json)
**What it contains:**
- Booked date ranges
- Start dates (ISO format)
- End dates (ISO format)

**Edit when:**
- Marking dates as booked
- Opening up availability
- Managing calendar

**Format:** `YYYY-MM-DD` (e.g., `2025-11-01`)

---

### [content/meta.json](content/meta.json)
**What it contains:**
- Page titles (HR/EN)
- Meta descriptions (HR/EN)
- SEO information

**Edit when:**
- Optimizing for search engines
- Changing page titles
- Updating descriptions

---

## 🌐 Translation Files Guide

### [messages/hr.json](messages/hr.json)
**Croatian translations**
- All website text in Croatian
- Navigation labels
- Page content
- Form labels
- Error messages

**Edit when:** Changing any text on Croatian version

---

### [messages/en.json](messages/en.json)
**English translations**
- All website text in English
- Should match Croatian structure
- Same keys as hr.json

**Edit when:** Changing any text on English version

---

## 🎯 Quick Reference by Task

### "I want to..."

#### Update Contact Information
1. Edit `content/site.json`
2. Update `contact` section
3. Save and rebuild

**See:** FAQ.md → "How do I change the contact information?"

---

#### Add Gallery Images
1. Add images to `public/images/gallery/`
2. Edit `content/gallery.json`
3. Add entries with src and descriptions

**See:** FAQ.md → "How do I add new images to the gallery?"

---

#### Mark Dates as Booked
1. Edit `content/availability.json`
2. Add date range objects
3. Use YYYY-MM-DD format

**See:** FAQ.md → "How do I mark dates as booked?"

---

#### Change Website Text
1. Edit `messages/hr.json` (Croatian)
2. Edit `messages/en.json` (English)
3. Find the section and key you want to change

**See:** FAQ.md → "How do I change text on the website?"

---

#### Change Map Location
1. Get coordinates from [latlong.net](https://www.latlong.net)
2. Edit `content/site.json`
3. Update `coordinates.lat` and `coordinates.lng`

**See:** FAQ.md → "How do I change the map location?"

---

#### Setup Email Sending
1. Copy `.env.example` to `.env.local`
2. Add SMTP credentials
3. For Gmail: use App Password

**See:** README.md → "Email Configuration"

---

#### Deploy to Vercel
1. Push code to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

**See:** DEPLOYMENT.md → "Vercel (Recommended)"

---

#### Understand Code Structure
1. Read PROJECT_STRUCTURE.md
2. Check STRUCTURE_OVERVIEW.md
3. Browse actual files

**See:** PROJECT_STRUCTURE.md → "Directory Overview"

---

## 📞 Getting Help

### Problem-Solving Flow

1. **Check FAQ.md** - Most common issues are covered
2. **Check appropriate guide** - Use task reference above
3. **Check console/terminal** - Error messages give clues
4. **Run setup checker** - `pnpm check-setup`
5. **Contact development team** - With error details

---

## 🎓 Learning Path

### Level 1: Content Editor
**Goal:** Update content without touching code

1. Read QUICKSTART.md (5 min)
2. Read "Content Files Guide" section above (5 min)
3. Try editing `content/site.json` (5 min)
4. Check FAQ.md "Content Management" section

**Time:** ~20 minutes

---

### Level 2: Site Administrator
**Goal:** Manage and deploy the site

1. Complete Level 1
2. Read SETUP.md (15 min)
3. Read CHECKLIST.md (10 min)
4. Read DEPLOYMENT.md (20 min)
5. Practice deploying to Vercel

**Time:** ~1 hour

---

### Level 3: Developer
**Goal:** Understand and modify code

1. Complete Level 2
2. Read README.md (30 min)
3. Read PROJECT_STRUCTURE.md (30 min)
4. Browse actual code files
5. Read Next.js documentation

**Time:** ~2-3 hours

---

## 📊 Documentation Statistics

- **Total Files:** 10 markdown documents
- **Total Words:** ~15,000 words
- **Topics Covered:** 50+ topics
- **Examples Included:** 100+ code examples
- **Sections:** 200+ documented sections

---

## 🔍 Search Tips

Can't find what you need? Try searching for these keywords:

- **Email:** FAQ.md, SETUP.md, README.md
- **Gallery:** FAQ.md, Content Files Guide
- **Calendar:** FAQ.md, PROJECT_STRUCTURE.md
- **Deployment:** DEPLOYMENT.md, QUICKSTART.md
- **Translations:** FAQ.md, Translation Files Guide
- **Maps:** FAQ.md, README.md
- **Setup:** SETUP.md, QUICKSTART.md, CHECKLIST.md

---

## 📅 Keep Documentation Updated

When making changes to the site:

1. **Update CHANGELOG.md** with new features
2. **Update FAQ.md** if you solve a new issue
3. **Update content guides** if structure changes
4. **Update README.md** for major changes

---

## ✨ Documentation Philosophy

This documentation follows these principles:

- **Practical:** Focus on real-world tasks
- **Progressive:** Start simple, go deeper as needed
- **Visual:** Use examples and diagrams
- **Searchable:** Clear sections and keywords
- **Complete:** Cover all aspects of the project

---

**Choose a document above and start your journey!** 🚀

*Last Updated: October 2025*

