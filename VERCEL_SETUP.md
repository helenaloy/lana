# Vercel Deployment Settings

Use the following settings in your Vercel project:

## Project Settings

### Build & Development Settings

**Install Command:**
```
npm ci
```

**Build Command:**
```
npm run build
```

**Development Command:**
```
npm run dev
```

**Output Directory:**
```
.next
```
(This is automatically detected by Vercel)

### Environment Variables

No environment variables required for basic operation.

### Node.js Version

**Node Version:** `20.x` (recommended)
or `18.x` (minimum supported)

---

## Build Settings Summary

- **Framework Preset:** Next.js (auto-detected)
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Version:** 20 (or 18 minimum)

## Notes

- The project uses npm (not pnpm) as package manager
- Node 20.x is recommended for best compatibility
- No custom rewrites needed - Next.js handles routing automatically
- The project is a bilingual app with internationalization (HR/EN)

