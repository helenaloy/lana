# Supabase Setup - Editable Sections

Ovaj dokument objašnjava kako postaviti tablicu `editable_sections` u Supabase bazi podataka.

## Koraci za postavljanje

1. **Otvorite Supabase Dashboard**
   - Prijavite se na [Supabase Dashboard](https://supabase.com/dashboard)
   - Odaberite svoj projekt

2. **Otvorite SQL Editor**
   - U lijevom sidebaru kliknite na "SQL Editor"
   - Kliknite na "New query"

3. **Kopirajte i pokrenite SQL skriptu**
   - Otvorite fajl `supabase/migrations/create_editable_sections.sql`
   - Kopirajte cijeli SQL kod
   - Zalijepite ga u SQL Editor
   - Kliknite na "Run" ili pritisnite `Ctrl+Enter` (Windows/Linux) ili `Cmd+Enter` (Mac)

4. **Provjerite da je tablica kreirana**
   - U lijevom sidebaru kliknite na "Table Editor"
   - Provjerite da vidite tablicu `editable_sections`

## Što skripta radi?

SQL skripta kreira:
- **Tablicu `editable_sections`** za spremanje editabilnih sekcija web stranice
- **RLS (Row Level Security) politike** koje omogućavaju:
  - Autenticiranim korisnicima: čitanje, unos, ažuriranje i brisanje
  - Anonimnim korisnicima: samo čitanje (za prikaz na web stranici)
- **Automatski trigger** koji ažurira `updated_at` polje pri svakoj izmjeni
- **Index** na `section` polju za brže pretraživanje

## Struktura tablice

```sql
- id: UUID (primarni ključ)
- section: VARCHAR (npr. 'about') - jedinstveno
- content: JSONB (sadrži {text: "..."})
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Napomena

Nakon što kreirate tablicu, dashboard će automatski raditi i moći ćete:
- Učitati postojeći tekst iz translation fajlova kao početni
- Spremati promjene u bazu
- Vidjeti promjene na web stranici u real-time

