# 🎨 Fontovi Ažurirani - Patrick Hand + Inter

Fontovi su ažurirani za živahniji, personalniji izgled! 🌟

---

## ✨ **Novi fontovi:**

### **Patrick Hand** (Display font)
- **Gdje:** Hero naslov, logo
- **Stil:** Handwritten, casual, friendly
- **Svrha:** Dodaje osobni, topli touch

### **Patrick Hand SC** (Small Caps - Headings)
- **Gdje:** Svi naslovi (h1-h6), navigation, buttons, labels
- **Stil:** Handwritten small caps
- **Svrha:** Strukturirani ali friendly look

### **Inter** (Body font)
- **Gdje:** Sav body tekst, opisi, paragrafi
- **Stil:** Modern, clean, čitljiv
- **Svrha:** Odlična čitljivost za dugački tekst

---

## 📁 **Datoteke promijenjene:**

### 1. **`app/globals.css`** ⚙️

**Dodano:**
```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Patrick+Hand+SC&family=Inter:wght@400;500;600;700&display=swap');

/* CSS varijable */
:root {
  --font-inter: 'Inter', system-ui, sans-serif;
  --font-patrick: 'Patrick Hand', cursive;
  --font-patrick-sc: 'Patrick Hand SC', cursive;
}

/* Global heading styles */
h1, h2, h3, h4, h5, h6 {
  @apply font-heading;
}

/* Labels use Patrick Hand */
label {
  @apply font-heading;
}

/* Buttons use Patrick Hand SC */
button {
  @apply font-heading;
}
```

---

### 2. **`tailwind.config.ts`** ⚙️

**Dodano:**
```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],       // Body tekst
  display: ['Patrick Hand', 'cursive'],             // Hero/display
  heading: ['Patrick Hand SC', 'cursive'],          // Naslovi
}
```

---

### 3. **`components/Header.tsx`** 📍

**Logo:**
```tsx
<span className="font-display text-2xl font-bold">
  Mobile Home Lana
</span>
```

**Navigation linkovi:**
```tsx
<a className="font-heading">Smještaj</a>
```

---

### 4. **`components/Footer.tsx`** 📍

**Naslovi:**
```tsx
<h3 className="font-display text-xl font-bold">
<h4 className="font-heading font-bold">
```

---

### 5. **`app/[locale]/page.tsx`** 🏠

**Hero:**
```tsx
<h1 className="font-display text-5xl">Mobile Home Lana</h1>
<p className="font-heading text-xl">Subtitle</p>
<a className="font-heading text-lg">CTA Button</a>
```

---

### 6. **`components/WhyUs.tsx`** ⭐

**Naslovi:**
```tsx
<h2 className="font-display text-3xl">Zašto baš kod nas?</h2>
<h3 className="font-heading text-xl">Razlog</h3>
<div className="font-display">1, 2, 3, 4</div>
```

---

### 7. **`components/CampInfo.tsx`** 🏖️

**Naslovi:**
```tsx
<h2 className="font-display text-3xl">Kamp Dalmacija</h2>
<h3 className="font-heading text-2xl">Savršeno za mališane</h3>
```

---

## 🎨 **Kako se koristi:**

### Font klase u Tailwind-u:

```tsx
// 1. Display font (Patrick Hand) - za hero i posebne naslove
className="font-display text-4xl"

// 2. Heading font (Patrick Hand SC) - za sve naslove
className="font-heading text-2xl"

// 3. Sans font (Inter) - za body (default)
className="text-base"  // Automatski Inter
```

---

## 🎯 **Primjeri korištenja:**

### Hero naslov:
```tsx
<h1 className="font-display text-5xl font-bold">
  Mobile Home Lana
</h1>
```

### Sekcijski naslovi:
```tsx
<h2 className="font-heading text-3xl font-bold">
  Zašto baš kod nas?
</h2>
```

### Body tekst:
```tsx
<p className="text-lg">
  Opis koji koristi Inter automatski
</p>
```

### Buttons:
```tsx
<button className="font-heading text-lg font-bold">
  Provjeri dostupnost
</button>
```

### Labels:
```tsx
<label className="font-heading">
  Ime i prezime
</label>
```

---

## 📊 **Font hijerarhija:**

```
┌─────────────────────────────────────┐
│ Hero Naslov (h1)                    │ → font-display (Patrick Hand)
│   text-5xl md:text-6xl lg:text-7xl  │
├─────────────────────────────────────┤
│ Section Naslovi (h2)                │ → font-heading (Patrick Hand SC)
│   text-3xl md:text-4xl              │
├─────────────────────────────────────┤
│ Sub-naslovi (h3, h4)                │ → font-heading (Patrick Hand SC)
│   text-xl md:text-2xl               │
├─────────────────────────────────────┤
│ Navigation                          │ → font-heading (Patrick Hand SC)
├─────────────────────────────────────┤
│ Buttons & CTA                       │ → font-heading (Patrick Hand SC)
├─────────────────────────────────────┤
│ Labels                              │ → font-heading (Patrick Hand SC)
├─────────────────────────────────────┤
│ Body tekst                          │ → font-sans (Inter)
│   text-base, text-lg                │
└─────────────────────────────────────┘
```

---

## 🌟 **Benefiti novih fontova:**

### Patrick Hand / SC:
✅ **Personalizirano** - rukopisni stil dodaje topao touch  
✅ **Zabavno** - savršeno za obiteljski odmor  
✅ **Pristupačno** - friendly i welcoming  
✅ **Prepoznatljivo** - izdvaja se od standardnih fontova  
✅ **Emoji friendly** - dobro se slaže s emoji ikonama 😊  

### Inter (Body):
✅ **Čitljivo** - optimirano za screen reading  
✅ **Moderno** - clean, professional look  
✅ **Fleksibilno** - radi u svim veličinama  
✅ **Web optimizirano** - brzo učitavanje  

---

## 🎭 **Prije vs. Poslije:**

### PRIJE:
```
Naslovi: System font (bezličan)
Body: System font (generički)
Feeling: Korporativno, hladno
```

### POSLIJE:
```
Naslovi: Patrick Hand SC (friendly, personal)
Hero: Patrick Hand (warm, inviting)
Body: Inter (clean, modern)
Feeling: Toplo, prijateljsko, profesionalno 😎
```

---

## 🚀 **Performance:**

**Google Fonts CDN:**
- Optimiziran za brzinu
- Automatic caching
- WOFF2 format (compressed)

**Load time:**
- Patrick Hand: ~15KB
- Patrick Hand SC: ~18KB  
- Inter (4 weights): ~60KB
- **Total:** ~93KB (prihvatljivo)

**Display strategy:** `display=swap`
- Koristi fallback dok se font učitava
- Eliminira FOIT (Flash of Invisible Text)

---

## 🎨 **Customization:**

### Promjena font-a za naslove:

**1. U `tailwind.config.ts`:**
```typescript
fontFamily: {
  heading: ['Tvoj Font', 'cursive'],
}
```

**2. U `globals.css`:**
```css
@import url('https://fonts.googleapis.com/css2?family=Tvoj+Font&display=swap');
```

---

## 📱 **Mobile friendly:**

Fontovi su optimizirani za:
- ✅ Retina displays
- ✅ Touch interfaces
- ✅ Različite screen sizes
- ✅ Light/dark mode (ako se doda)

---

## ✨ **Dodatni detalji:**

### Line height:
```css
/* Naslovi - tighter */
h1, h2, h3 { line-height: 1.2; }

/* Body - relaxed */
p { line-height: 1.6; }
```

### Font weights korištene:

**Inter:**
- 400 (regular) - body tekst
- 500 (medium) - sub-headings
- 600 (semibold) - emphasis
- 700 (bold) - strong emphasis

**Patrick Hand / SC:**
- 400 (regular) - jedini weight (handwritten style)

---

## 🧪 **Testiranje:**

```bash
pnpm dev
# Otvori http://localhost:3000/hr
```

**Provjeri:**
- ✅ Logo - Patrick Hand display font
- ✅ Hero naslov - Patrick Hand bold
- ✅ Navigation - Patrick Hand SC
- ✅ Sekcijski naslovi - Patrick Hand SC
- ✅ Body tekst - Inter (readable)
- ✅ Buttons - Patrick Hand SC
- ✅ Forms labels - Patrick Hand SC

---

## 📝 **Fallback fontovi:**

Ako Google Fonts nije dostupan:

```
Patrick Hand → cursive → Arial → sans-serif
Patrick Hand SC → cursive → Arial → sans-serif
Inter → system-ui → -apple-system → sans-serif
```

---

## 🎯 **Rezultat:**

**Website sada ima:**
✨ **Personaliziran look** - rukopisni fontovi za naslove  
📖 **Odlična čitljivost** - Inter za body tekst  
😊 **Friendly vibe** - savršeno za obiteljski odmor  
🎨 **Profesionalno** - balans između casual i clean  
🏖️ **Beach mood** - opušteno, летње, zabavno  

---

**Fontovi su postavljeni! Uživajte u novom look-u! 🎉**

*Ažurirano: 21. listopad 2025*

