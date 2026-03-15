## SYNC BRIEFING: Current State of the Main MuslimWiki (as of 2026-03-15)

The main wiki at `C:\Users\dalil\Desktop\GMP\Prog\wikipedia` has had significant updates. Here is everything the admin panel needs to match:

---

### 1. ARTICLE TYPES (4 types)

The wiki supports 4 article types stored in the `article_type` column:
- `article` — generic article with optional custom infobox
- `mosque` — mosque with `mosque_data` JSON column (MosqueData)
- `imam` — imam with `imam_data` JSON column (ImamData)
- `burial` — burial/grave record with `burial_data` JSON column (BurialData)

---

### 2. TYPE DEFINITIONS (`src/types/mosque.ts`)

```ts
export interface MosqueFounder {
  name: string
  nationality?: string
}

export interface MosqueImam {
  name: string
  from?: string
  to?: string
}

export interface CommitteeMember {
  name: string
  nationality?: string
  from?: string
  to?: string
}

export interface MosqueData {
  name?: string
  headerColor?: string
  image?: { src: string; caption: string }
  localisation?: string
  constructionDate?: string
  inaugurationDate?: string
  capacity?: number
  prayerHallArea?: number
  totalArea?: number
  minaretHeight?: number
  architect?: string
  founders?: MosqueFounder[]
  previousCommittee?: CommitteeMember[]
  currentCommittee?: CommitteeMember[]
  facilities?: string[]
  gallery?: { src: string; caption: string }[]
  region?: string
  department?: string
  commune?: string
  currentImam?: string
  previousImams?: MosqueImam[]
}

export interface ImamData {
  name?: string
  headerColor?: string
  image?: { src: string; caption: string }
  birthDate?: string
  deathDate?: string
  isAlive?: boolean
  rank?: string
  nationality?: string
  region?: string
  department?: string
  commune?: string
  currentMosque?: string
  previousMosques?: { name: string; from?: string; to?: string }[]
  customFields?: { label: string; value: string }[]
}

export interface BurialData {
  name?: string
  headerColor?: string
  image?: { src: string; caption: string }
  graveImage?: { src: string; caption: string }
  fullName?: string
  fatherName?: string
  motherName?: string
  nationality?: string
  countryOfOrigin?: string
  birthDate?: string
  deathDate?: string
  region?: string
  department?: string
  commune?: string
  cemeteryName?: string
  division?: string
  graveNumber?: string
  concessionType?: '15' | '30' | '50' | 'perpetuelle'
  contactAddress?: string
  tribute?: string
}
```

---

### 3. LOCATION SYSTEM (`src/lib/regions.ts`)

All 3 structured article types (mosque, imam, burial) use a `region` / `department` / `commune` location system with all 18 French regions and their departments:

- Auvergne-Rhone-Alpes, Bourgogne-Franche-Comte, Bretagne, Centre-Val de Loire, Corse, Grand Est, Hauts-de-France, Ile-de-France, Normandie, Nouvelle-Aquitaine, Occitanie, Pays de la Loire, Provence-Alpes-Cote d'Azur, Guadeloupe, Martinique, Guyane, La Reunion, Mayotte

Each region maps to its real departments. The `LocationSelector` component handles region->department cascading.

**CRITICAL BUG FIX**: The `LocationSelector` component previously had a stale closure bug where selecting a region would immediately get overwritten. The fix is: when the region changes, the parent form must update BOTH `region` and clear `department` in a **single** `onChange` call:
```ts
onRegionChange={(v) => onChange({ ...data, region: v, department: undefined })}
```
Do NOT call two separate updates in sequence.

The full regions data (`src/lib/regions.ts`):
```ts
export const FRENCH_DEPARTMENTS: Record<string, string[]> = {
  'Auvergne-Rhone-Alpes': [
    'Ain', 'Allier', 'Ardeche', 'Cantal', 'Drome', 'Isere', 'Loire',
    'Haute-Loire', 'Puy-de-Dome', 'Rhone', 'Savoie', 'Haute-Savoie',
  ],
  'Bourgogne-Franche-Comte': [
    'Cote-d\'Or', 'Doubs', 'Jura', 'Nievre', 'Haute-Saone', 'Saone-et-Loire',
    'Yonne', 'Territoire de Belfort',
  ],
  'Bretagne': [
    'Cotes-d\'Armor', 'Finistere', 'Ille-et-Vilaine', 'Morbihan',
  ],
  'Centre-Val de Loire': [
    'Cher', 'Eure-et-Loir', 'Indre', 'Indre-et-Loire', 'Loir-et-Cher', 'Loiret',
  ],
  'Corse': [
    'Corse-du-Sud', 'Haute-Corse',
  ],
  'Grand Est': [
    'Ardennes', 'Aube', 'Marne', 'Haute-Marne', 'Meurthe-et-Moselle',
    'Meuse', 'Moselle', 'Bas-Rhin', 'Haut-Rhin', 'Vosges',
  ],
  'Hauts-de-France': [
    'Aisne', 'Nord', 'Oise', 'Pas-de-Calais', 'Somme',
  ],
  'Ile-de-France': [
    'Paris', 'Seine-et-Marne', 'Yvelines', 'Essonne', 'Hauts-de-Seine',
    'Seine-Saint-Denis', 'Val-de-Marne', 'Val-d\'Oise',
  ],
  'Normandie': [
    'Calvados', 'Eure', 'Manche', 'Orne', 'Seine-Maritime',
  ],
  'Nouvelle-Aquitaine': [
    'Charente', 'Charente-Maritime', 'Correze', 'Creuse', 'Dordogne',
    'Gironde', 'Landes', 'Lot-et-Garonne', 'Pyrenees-Atlantiques',
    'Deux-Sevres', 'Vienne', 'Haute-Vienne',
  ],
  'Occitanie': [
    'Ariege', 'Aude', 'Aveyron', 'Gard', 'Haute-Garonne', 'Gers',
    'Herault', 'Lot', 'Lozere', 'Hautes-Pyrenees', 'Pyrenees-Orientales',
    'Tarn', 'Tarn-et-Garonne',
  ],
  'Pays de la Loire': [
    'Loire-Atlantique', 'Maine-et-Loire', 'Mayenne', 'Sarthe', 'Vendee',
  ],
  'Provence-Alpes-Cote d\'Azur': [
    'Alpes-de-Haute-Provence', 'Hautes-Alpes', 'Alpes-Maritimes',
    'Bouches-du-Rhone', 'Var', 'Vaucluse',
  ],
  'Guadeloupe': ['Guadeloupe'],
  'Martinique': ['Martinique'],
  'Guyane': ['Guyane'],
  'La Reunion': ['La Reunion'],
  'Mayotte': ['Mayotte'],
}

export const FRENCH_REGIONS = Object.keys(FRENCH_DEPARTMENTS)
```

---

### 4. UI/UX DESIGN SYSTEM

**Colors** (keep these exact values):
- Primary: `hsl(187 96% 27%)` (teal)
- Secondary: `hsl(199 89% 48%)`
- Destructive: `hsl(0 84.2% 60.2%)`
- Page background: `#f5f6f8`
- Content panels: white with `border-gray-200`
- Sidebar background: `#f8f9fa`

**Layout philosophy** (Wikipedia-inspired modern):
- Wide layouts: `max-w-6xl` for listing pages, `max-w-[1400px]` for article pages
- Article content fills available width (no narrow `max-w-[860px]` cap)
- White content panel on gray `#f5f6f8` background
- Sidebar: `w-56`, sticky nav, `bg-[#f8f9fa]`, items hover to white
- Cards: `rounded-xl`, `border-gray-200`, `hover:border-primary/30 hover:shadow-md transition-all duration-200`
- Buttons: `rounded-lg`, primary buttons use `bg-primary text-white shadow-sm`
- Header: sticky, `bg-white/95 backdrop-blur-sm`, logo at 52px

**Fonts**: Georgia serif for headings, Helvetica/Arial sans for body

**Tailwind config**: Uses `@tailwindcss/typography` plugin. Custom colors `primary`, `secondary`, `destructive`, `wiki-blue`, `wiki-border`, `wiki-bg`.

**globals.css additions**:
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*:focus-visible {
  outline: 2px solid hsl(187 96% 27%);
  outline-offset: 2px;
  border-radius: 2px;
}
::selection {
  background-color: hsl(187 96% 27% / 0.15);
}
html {
  scroll-behavior: smooth;
}
```

---

### 5. KEY COMPONENTS SHARED BETWEEN WIKI AND ADMIN

These components exist in the main wiki and the admin should have equivalent versions:

- `MosqueForm` — form for editing mosque data fields
- `ImamForm` — form for editing imam data fields
- `BurialForm` — form for editing burial data fields
- `LocationSelector` — region/department/commune cascading selects
- `MosqueInfobox` — renders mosque infobox in article view
- `ImamInfobox` — renders imam infobox in article view
- `BurialInfobox` — renders burial infobox in article view
- `Infobox` — generic infobox for `article` type
- `QuillEditor` — WYSIWYG rich text editor (Quill 2.0, SSR-safe dynamic import)
- `MarkdownRenderer` — renders both Markdown and Quill HTML content (auto-detects)
- `ImageUploader` — uploads images to Vercel Blob
- `CountryEmojiPicker` — country flag emoji picker for infobox values

---

### 6. INFOBOX RENDERING

Each article type has its own infobox component. All infoboxes use:
- `rounded-lg overflow-hidden` on the container
- `maxWidth: 280px`
- Wikipedia-style table layout with `border-[#a2a9b1]` borders
- Section headers: `bg-[#eaecf0]` centered text
- Colored header bar using `headerColor` from the data

---

### 7. DATABASE SCHEMA (Supabase)

Key columns on the `articles` table:
- `slug`, `title`, `excerpt`, `content`, `categories` (text[])
- `article_type` ('article' | 'mosque' | 'imam' | 'burial')
- `infobox` (JSONB, for generic articles)
- `mosque_data` (JSONB), `imam_data` (JSONB), `burial_data` (JSONB)
- `author_name`, `image_url`
- `youtube_videos` (text[])
- `created_at`, `updated_at`

The `submissions` table mirrors this structure with additional: `submitter_email`, `status` ('pending'|'approved'|'rejected')

The `edit_suggestions` table: `article_slug`, `suggested_content`, `suggested_title`, `suggested_excerpt`, `suggested_categories`, `submitter_name`, `submitter_email`, `status`

---

### 8. WHAT THE ADMIN PANEL MUST SUPPORT

1. **Review submissions** — view pending submissions for all 4 article types, preview infoboxes, approve/reject
2. **Review edit suggestions** — view diffs, approve/reject
3. **Create articles directly** — with full forms for all 4 types (mosque/imam/burial/generic), including LocationSelector, ImageUploader, QuillEditor
4. **Edit existing articles** — same full forms, pre-populated with existing data
5. **Delete articles** — with confirmation
6. **Manage categories** — CRUD on categories table
7. **BurialForm concession types**: '15', '30', '50', 'perpetuelle'
