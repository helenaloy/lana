# 🎯 One-Page Website Konverzija

Website je sada **one-page** sa smooth scroll navigacijom! 🚀

---

## ✅ Što je promijenjeno:

### 1. **Home page (`app/[locale]/page.tsx`)** 🏠

Sada sadrži **SVE sekcije** na jednoj stranici:

```
├── #home (Hero)
├── About
├── Why Us
├── Camp Info
├── #accommodation (Detalji, amenities, camp features, distances, house rules)
├── #gallery (Sve slike s lightbox-om)
├── #location (Karta + adresa)
├── #availability (Kalendar + inquiry form)
└── #contact (Kontakt info)
```

**Svaka sekcija ima:**
- Jedinstveni `id` atribut (npr. `id="accommodation"`)
- `scroll-mt-20` class za offset ispod sticky header-a
- Puni sadržaj koji je bio na odvojenim stranicama

---

### 2. **Header navigacija (`components/Header.tsx`)** 📍

**PRIJE:** Linkovi na zasebne stranice
```tsx
<Link href="/hr/accommodation">Smještaj</Link>
```

**SADA:** Anchor linkovi s smooth scroll-om
```tsx
<a href="#accommodation" onClick={handleClick}>Smještaj</a>
```

**Dodane funkcionalnosti:**
- ✅ **Smooth scroll** - animirani prelazak na sekciju
- ✅ **Active tracking** - automatsko označavanje aktivne sekcije dok scrollate
- ✅ **Offset handling** - uzima u obzir sticky header (80px)
- ✅ **Mobile friendly** - zatvara mobilni menu pri kliku

---

### 3. **Footer (`components/Footer.tsx`)** 📍

Također koristi anchor linkove umjesto navigacije na stranice.

---

### 4. **Stare stranice - Redirecti** 🔄

Stare rute su pretvorene u redirecte na home page s anchor:

- `/hr/accommodation` → redirect → `/#accommodation`
- `/hr/gallery` → redirect → `/#gallery`
- `/hr/location` → redirect → `/#location`
- `/hr/availability` → redirect → `/#availability`
- `/hr/contact` → redirect → `/#contact`

**Zašto?**
- Održava postojeće linkove (bookmarks, Google indexing)
- Automatski preusmjerava na pravu sekciju

---

### 5. **Smooth Scroll Config** ⚙️

U `app/globals.css` dodano:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Offset za sticky header */
}
```

---

## 🎨 Kako funkcionira:

### Smooth Scroll Mehanika:

```typescript
// 1. Klik na navigation link
<a href="#gallery" onClick={handleClick}>

// 2. handleClick funkcija:
const handleClick = (e, href) => {
  e.preventDefault(); // Zaustavi default anchor behavior
  const element = document.getElementById('gallery');
  
  // Scroll s offsetom za header
  window.scrollTo({
    top: elementPosition - 80,
    behavior: 'smooth'
  });
};
```

### Active Section Tracking:

```typescript
// useEffect prati scroll poziciju
useEffect(() => {
  const handleScroll = () => {
    // Provjeri koja sekcija je trenutno u viewportu
    if (scrollPosition in section) {
      setActiveSection(sectionId);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
}, []);
```

---

## 🚀 Prednosti One-Page pristupa:

### Za korisnike:
✅ **Brže browsing** - sve na jednom mjestu, bez page load-a  
✅ **Smooth navigacija** - animirani scroll između sekcija  
✅ **Bolji overview** - vide sve odjednom scrollom  
✅ **Mobile friendly** - prirodnije za touch devices  

### Za SEO:
✅ **Jedan jak page** - sav sadržaj na jednom URL-u  
✅ **Anchor links** - Google indexira i anchor tagove  
✅ **Brže učitavanje** - jedna stranica = manji Time to Interactive  

### Za maintenance:
✅ **Jednostavnije** - sve na jednom mjestu  
✅ **Manje datoteka** - lakše ažuriranje  

---

## 📱 Testiranje:

```bash
pnpm dev
# Otvori http://localhost:3000/hr
```

### Provjeri:

1. **Navigation linkovi:**
   - Klikni na "Smještaj" → scroll do accommodation sekcije
   - Klikni na "Galerija" → scroll do gallery sekcije
   - Klikni na "Dostupnost" → scroll do availability sekcije

2. **Active state:**
   - Scrollaj manualno dolje
   - Vidi da se navigation link highlighta ovisno o sekciji

3. **Mobile menu:**
   - Otvori na mobitelu (ili dev tools mobile view)
   - Klikni na menu link
   - Menu se zatvara + scroll do sekcije

4. **Redirects:**
   - Idi na `/hr/accommodation`
   - Automatski redirect na `/#accommodation`

5. **Logo:**
   - Klikni na logo
   - Scroll do vrha (home sekcija)

---

## 🔧 Customization:

### Promjena scroll offset-a:

Ako želite veći/manji razmak ispod header-a:

**1. U `globals.css`:**
```css
html {
  scroll-padding-top: 100px; /* Promijeni ovo */
}
```

**2. U `Header.tsx` i `Footer.tsx`:**
```typescript
const headerOffset = 100; // Promijeni ovo
```

**3. U sekcijama (`page.tsx`):**
```tsx
<section className="scroll-mt-24"> // Promijeni class (mt-20 = 80px, mt-24 = 96px)
```

### Dodavanje nove sekcije:

```tsx
// 1. Dodaj u page.tsx
<section id="nova-sekcija" className="scroll-mt-20">
  <h2>Nova Sekcija</h2>
  {/* sadržaj */}
</section>

// 2. Dodaj u Header.tsx navigation array
const navigation = [
  // ...
  { name: 'Nova Sekcija', href: '#nova-sekcija', id: 'nova-sekcija' },
];
```

---

## 📊 Struktura stranice:

```
┌─────────────────────────────┐
│ Sticky Header (80px)        │ ← Uvijek vidljiv
├─────────────────────────────┤
│                             │
│ #home (Hero)                │
│   ↓ scroll                  │
│ About                       │
│   ↓ scroll                  │
│ Why Us                      │
│   ↓ scroll                  │
│ Camp Info                   │
│   ↓ scroll                  │
│ #accommodation              │ ← Klik na "Smještaj" scrolls here
│   - Details                 │
│   - Amenities               │
│   - Camp Features           │
│   - Distances               │
│   - House Rules             │
│   ↓ scroll                  │
│ #gallery                    │ ← Klik na "Galerija" scrolls here
│   - Sve slike               │
│   ↓ scroll                  │
│ #location                   │ ← Klik na "Lokacija" scrolls here
│   - Karta                   │
│   - Adresa                  │
│   ↓ scroll                  │
│ #availability               │ ← Klik na "Dostupnost" scrolls here
│   - Kalendar                │
│   - Inquiry Form            │
│   ↓ scroll                  │
│ #contact                    │ ← Klik na "Kontakt" scrolls here
│   - Kontakt info            │
│                             │
├─────────────────────────────┤
│ Footer                      │
└─────────────────────────────┘
```

---

## 🎯 Acceptance criteria - One Page:

✅ **Sav sadržaj na jednoj stranici**  
✅ **Menu linkovi scrollaju na sekcije**  
✅ **Smooth animirani scroll**  
✅ **Active section highlighting**  
✅ **Mobile friendly**  
✅ **Stari linkovi redirectaju**  
✅ **Offset za sticky header**  

---

## 🔄 Vraćanje na multi-page (ako treba):

Ako želite vratiti na originalnu multi-page strukturu:

1. **Restore stare page datoteke** iz git history-a
2. **Ažuriraj Header.tsx** - vrati Link komponente
3. **Ažuriraj Footer.tsx** - vrati Link komponente
4. **Makni redirecte** iz stranica

Backup: Sve stare verzije su u git history-u!

---

## 💡 Pro Tips:

### Za najbolji UX:

1. **Kratke sekcije** - ne predugo scrollanje
2. **Clear visual separation** - koristiti gradijente između sekcija
3. **CTA buttons** - linkovi koji vode na availability
4. **Scroll to top button** - ako stranica jako dugačka (opciono)

### Za SEO:

1. **Heading hierarchy** - h1 samo jednom (hero), zatim h2, h3...
2. **Anchor links u sitemap** - dodati u sitemap.xml (opciono)
3. **Schema markup** - strukturirani podaci za Google

---

## 📝 Datoteke promijenjene:

```
Modified:
✏️ app/[locale]/page.tsx          - Dodane sve sekcije
✏️ components/Header.tsx          - Anchor linkovi + smooth scroll
✏️ components/Footer.tsx          - Anchor linkovi
✏️ app/globals.css                - scroll-padding-top
✏️ app/[locale]/accommodation/page.tsx  - Redirect
✏️ app/[locale]/gallery/page.tsx       - Redirect
✏️ app/[locale]/location/page.tsx      - Redirect
✏️ app/[locale]/availability/page.tsx  - Redirect
✏️ app/[locale]/contact/page.tsx       - Redirect
```

---

## ✨ Rezultat:

**One-page website** s:
- 🎯 Smooth scroll navigacijom
- 📍 Active section tracking
- 📱 Mobile-friendly
- ⚡ Super brz (jedan page load)
- 😄 Živahni sadržaj s humorom i emoji
- 🏖️ Fokus na obiteljski odmor

---

**Website je spreman! Scrollajte i uživajte! 🎉**

*Konverzija napravljena: 21. listopad 2025*

