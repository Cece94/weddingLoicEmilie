# Wedding Website Spec (Next.js + React)

## 1) Scope And Goal

Create a modern, minimal, elegant multi-page wedding website inspired by the provided layout direction, while keeping the warm beige tone from the original source website.

This phase focuses on:
- Full textual content structure and localization.
- Navigation and page architecture.
- Design system and responsive behavior.
- Functional behavior without external RSVP form integration.

This phase excludes:
- Google Form integration (kept for later phase).
- Heavy media integration (text-first; no image content included for now).
- Unit tests.

---

## 2) Source And Content Rules

Primary content source:
- [Original wedding site](https://sites.google.com/view/emilieandloic/our-wedding)

Navigation labels must be kept as-is:
- `OUR WEDDING`
- `HÉBERGEMENT ET REPAS`
- `ÖVERNATTNING OCH MAT`
- `REGISTRATION`
- `VOYAGE`
- `RESA`
- `PROGRAM`
- `FAQ FR`
- `FAQ SV`

Content policy:
- Keep all meaningful text content from the source site.
- Do not integrate the Google Form in this phase.
- Keep a visible `RSVP` button (visual CTA; behavior defined below).
- English (`EN`) must be a full translation, not a summary.

---

## 3) Product Decisions (Locked)

- App type: Multi-page website.
- Stack: Next.js + React.
- Localization: `FR`, `SV`, `EN`.
- Default language:
  - Browser `fr-*` => `FR`
  - Browser `sv-*` => `SV`
  - Otherwise => `EN`
- Language switcher in header with compact flags and labels (`FR | SV | EN`).
- URL localization is optional for now (no strict `/fr`, `/sv`, `/en` requirement in phase 1).
- Mobile first responsiveness with burger menu.
- Motion style: minimal and elegant only.

---

## 4) Information Architecture

## 4.1 Menu strategy

The source has paired language-specific menu entries (`FR` and `SV`).  
In the new product, menu labels remain recognizable and content remains complete, but language is controlled by the global language switcher.

Recommended page map:
- `/our-wedding`
- `/accommodation-food` (mapped from `HÉBERGEMENT ET REPAS` / `ÖVERNATTNING OCH MAT`)
- `/registration`
- `/travel` (mapped from `VOYAGE` / `RESA`)
- `/program`
- `/faq` (single route, localized content for FR/SV/EN)

Notes:
- Front navigation can still display source labels where needed for brand continuity.
- Internally avoid duplicate page logic; one route per concept, localized by i18n data.

## 4.2 Header behavior

- Left: monogram/logo.
- Center/right: desktop menu.
- Top utility area: language switcher + flag icons.
- Mobile: burger opens full-screen or drawer navigation panel.
- `RSVP` button visible in header on desktop and in burger panel on mobile.

---

## 5) UX And Functional Behavior

## 5.1 Routing

- Standard Next.js App Router pages.
- Smooth navigation transitions (simple fade/opacity, short duration).
- Active menu state visible.

## 5.2 RSVP button (phase 1)

- Keep visible in key positions (header and optionally footer).
- No external form wiring yet.
- Temporary behavior options (choose one during implementation):
  - Opens lightweight modal: "RSVP opening soon."
  - Links to internal placeholder page `/rsvp`.

## 5.3 Language handling

- On first visit, detect browser language and set initial locale.
- Persist user language choice in local storage.
- Reuse persisted choice on next visits before browser detection.
- All static page text must be available in `FR`, `SV`, `EN`.

## 5.4 Accessibility baseline

- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- Keyboard accessible menu and language switcher.
- Sufficient contrast on beige palette.
- Respect `prefers-reduced-motion` for subtle animations.

---

## 6) Visual Direction

## 6.1 Brand style

Target look:
- Modern editorial.
- Minimal spacing rhythm.
- Premium wedding aesthetic.
- Calm, warm, elegant tone.

## 6.2 Color direction (beige-first)

Use warm neutrals inspired by the original website:
- Background base: soft beige (`#F4EEE5` range).
- Surface cards: lighter ivory/beige (`#FBF8F2` range).
- Primary text: deep warm charcoal (`#2A2522` range).
- Secondary text: muted taupe (`#7A6F66` range).
- Accent line/buttons: desaturated bronze/tan (`#B89C7D` range).

Keep contrast and readability strict on mobile and low-brightness screens.

## 6.3 Typography and spacing

- Elegant serif for major headings.
- Clean sans-serif for body and navigation.
- Generous whitespace and vertical breathing room.
- Clear section separators using thin lines and subtle tone shifts.

## 6.4 Motion

- Minimal motion only:
  - Header reveal on scroll (soft).
  - Page fade-in.
  - Hover transitions on links/buttons.
- No flashy parallax or aggressive transforms.

---

## 7) Responsive Specification

## 7.1 Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `>= 1024px`

## 7.2 Mobile behavior

- Burger navigation required.
- Language switcher remains quickly accessible in top bar.
- Touch targets >= 44px.
- Content width and typography scale for readability.
- Sticky header with compact height.

## 7.3 Desktop behavior

- Horizontal nav with clear spacing.
- Language switcher aligned in top-right utility position.
- Wider margins and premium editorial rhythm.

---

## 8) Content Model (Text-Only Phase)

Define locale dictionaries by page and section, for example:

- `common`:
  - site title
  - nav labels
  - button labels (`RSVP`, `Read more`, etc.)
- `ourWeddingPage`
- `accommodationFoodPage`
- `registrationPage`
- `travelPage`
- `programPage`
- `faqPage`

Each key must exist in all locales (`fr`, `sv`, `en`).

Recommended files:
- `content/fr.json`
- `content/sv.json`
- `content/en.json`

No image payload in this phase.  
Hero and page sections should use text blocks and placeholders where media will be inserted later.

---

## 9) Technical Architecture (Next.js)

Suggested high-level structure:

```txt
app/
  [locale]/
    layout.tsx
    page.tsx (optional redirect/home)
    our-wedding/page.tsx
    accommodation-food/page.tsx
    registration/page.tsx
    travel/page.tsx
    program/page.tsx
    faq/page.tsx
  rsvp/page.tsx (if temporary placeholder chosen)
components/
  layout/
    SiteHeader.tsx
    SiteFooter.tsx
    MobileMenu.tsx
    LanguageSwitcher.tsx
  ui/
    Button.tsx
    Section.tsx
lib/
  i18n/
    config.ts
    detectLocale.ts
    getDictionary.ts
content/
  fr.json
  sv.json
  en.json
```

Implementation principles:
- DRY: one page template per concept, localized via dictionary content.
- SRP: language logic in `lib/i18n`, view logic in page/components.
- YAGNI: skip optional URL-locale complexity in first pass unless trivial.

---

## 10) Non-Functional Requirements

- Performance:
  - Fast first render on mobile.
  - Avoid blocking scripts.
  - Keep transitions lightweight.
- SEO:
  - Unique metadata per page and locale.
  - Proper headings hierarchy.
- Quality:
  - Manual QA only for this phase (no unit tests required).
  - Cross-browser sanity check (Chrome, Safari, mobile browsers).

---

## 11) Phase Plan

## Phase 1 — Foundation
- Set up i18n architecture (`FR`, `SV`, `EN`).
- Build shared layout (`header`, `footer`, language switcher, burger).
- Create multi-page routes and base templates.

## Phase 2 — Content migration (text-only)
- Move full source text content into dictionaries.
- Validate full parity across languages.
- Add temporary RSVP behavior.

## Phase 3 — Visual polish
- Apply final beige design tokens.
- Refine typography, spacing, and micro-interactions.
- Responsive tuning and accessibility pass.

## Phase 4 — Future scope (later)
- Google Form RSVP integration.
- Hero image integration using the 3 provided images.
- Optional localized URLs and advanced SEO improvements.

---

## 12) Acceptance Checklist

- Multi-page routing is in place.
- All required pages exist and are navigable.
- Language auto-detection works (`FR` / `SV` / fallback `EN`).
- Manual language switch works and persists.
- Full text content exists in all three languages.
- `RSVP` button remains visible (without Google Form integration yet).
- Design matches modern minimal elegant style with beige theme.
- Mobile experience includes burger menu and solid readability.

---

## 13) Open Items To Confirm During Implementation

- Exact flag icon style (emoji, SVG, or custom icon set).
- Temporary RSVP behavior choice (modal vs placeholder page).
- Final typography pair selection (specific serif/sans families).
- Degree of URL localization to include in first release.

---

## 14) Implementation Master Prompt (Image-Driven)

Use the prompt below when implementation starts and reference the latest design image(s).

```text
You are implementing the wedding website using Next.js + React.
If the folder is empty, bootstrap the project first.

Goal:
Build a production-ready, multi-page website that follows WEDDING_WEBSITE_SPEC.md and matches the visual style of the provided reference image(s): modern, minimal, elegant, warm beige palette.

Critical constraints:
1) Do not integrate the external Google Form yet.
2) Keep a visible RSVP button (temporary behavior only: modal "RSVP opening soon" or /rsvp placeholder).
3) Include full localization in FR, SV, and EN (EN must be full translation, not summary).
4) Auto locale detection:
   - fr-* => FR
   - sv-* => SV
   - otherwise => EN
5) Keep menu labels recognizable from the source site.
6) Build responsive mobile-first UI with burger navigation.
7) Use minimal, elegant motion only.
8) For now, prioritize text content structure; image media integration comes later unless explicitly requested.

Design fidelity rules (from image references):
- Reproduce layout rhythm, spacing, and visual hierarchy from the references.
- Use warm beige/ivory surfaces and dark warm text contrast.
- Keep typography premium: serif-forward headings + clean sans body.
- Avoid heavy effects, loud gradients, and saturated colors.

Architecture rules:
- Respect DRY, SRP, and YAGNI.
- Separate i18n logic from UI components.
- Reuse shared layout components (Header, Footer, MobileMenu, LanguageSwitcher).
- Avoid duplicate page logic for language variants; route by concept and localize via dictionaries.

Execution plan:
1) Read WEDDING_WEBSITE_SPEC.md fully.
2) If starting from an empty folder, initialize Next.js + Tailwind + TypeScript, then install required dependencies:
   - npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm
   - npm install next-intl framer-motion lucide-react clsx tailwind-merge
3) Implement/adjust app structure and shared layout.
4) Implement locale detection + persistence.
5) Create all required pages and navigation states.
6) Add dictionaries for fr/sv/en with complete content keys.
7) Apply final beige design tokens and responsive behavior.
8) Run quality checks (build/lint/manual responsive checks).
9) Return a concise change report:
   - files changed
   - what was implemented
   - what remains for later phases

Important:
- Do not make up missing content silently. Add clear TODO markers if exact copy is pending.
- Add short comments only on non-obvious methods.
- Keep code and comments in English.

Orchestration mode (mandatory):
- Act as an orchestrator and split the implementation into small, focused tasks.
- Use multiple agents, but run them sequentially (Agent 1, then Agent 2, then Agent 3, etc.), not all at once.
- Before launching the next agent, review and validate the previous agent output (code quality, scope compliance, and regression risk).
- Only proceed when the previous step is accepted; otherwise request a fix from the same step.
- Keep a short execution log after each step:
  - task assigned
  - files touched
  - validation result
  - next step decision
```

---

## 15) Technical Stack And Graphic Libraries

This section defines the expected technical baseline for implementation.

## 15.1 Core stack (required)

- `next` (App Router) — page routing, metadata, server/client boundaries.
- `react` / `react-dom` — UI components.
- `typescript` — strict typing for content model and i18n keys.

## 15.2 Styling and design system (required)

- `tailwindcss` — utility-first styling and responsive breakpoints.
- `clsx` + `tailwind-merge` — clean class composition for reusable components.
- CSS variables for theme tokens (beige palette, typography scale, spacing scale).

## 15.3 Localization (required)

- `next-intl` (recommended) for robust localization in Next.js App Router.
  - Locales: `fr`, `sv`, `en`.
  - Browser language detection + persisted user preference.
  - Dictionary-driven text content (`content/fr.json`, `content/sv.json`, `content/en.json`).

## 15.4 Motion and interactions (required but lightweight)

- `framer-motion` for minimal elegant transitions:
  - Page fade transitions.
  - Subtle menu/overlay entrance.
  - Reduced-motion fallback support.

Motion policy:
- Keep animation durations short and calm.
- Avoid complex/parallax-heavy effects.

## 15.5 Graphic/UI helper libraries (recommended)

- `lucide-react` for clean iconography (menu, close, arrows).
- Flag strategy (pick one):
  - lightweight inline SVG assets in `public/flags/` (preferred), or
  - a small flag icon package if needed.

## 15.6 Media and image handling

- Use Next.js `next/image` when image phase starts.
- Current phase remains text-first; image content is intentionally deferred.

## 15.7 Not required in this project scope

- No WebGL/3D dependency required for this wedding website baseline.
  - Do not add `three`, `@react-three/fiber`, or `@react-three/drei` unless a later phase explicitly asks for 3D scenes.
- No unit testing library required in this phase.

## 15.8 Suggested dependency list (initial)

```bash
npm install next react react-dom
npm install next-intl framer-motion lucide-react clsx tailwind-merge
```

Optional (only if chosen during implementation):

```bash
npm install class-variance-authority
```

---

## 16) Agent Task Assignment (Sequential Orchestration)

Use this assignment when implementation starts.  
Run agents one by one (never in parallel). The orchestrator validates each step before starting the next.

## Agent 1 — Project Bootstrap

Mission:
- Initialize project if folder is empty.
- Ensure Next.js App Router + TypeScript + Tailwind are active.
- Install required dependencies from section 15.

Deliverables:
- Working base project.
- Clean dependency tree.
- Initial run/build works.

Validation gate:
- `npm run dev` starts.
- `npm run build` passes.
- No missing dependency errors.

## Agent 2 — I18n Foundation

Mission:
- Implement locale config and dictionary loading.
- Add browser locale detection with fallback to `EN`.
- Add persistence of user locale preference.

Deliverables:
- `fr`, `sv`, `en` dictionary plumbing.
- Stable locale resolution flow.

Validation gate:
- Manual checks:
  - browser `fr-*` => FR
  - browser `sv-*` => SV
  - other => EN
- Locale choice persists after refresh.

## Agent 3 — Layout Shell And Navigation

Mission:
- Build shared layout components:
  - Header
  - Language switcher with flags
  - Desktop nav
  - Mobile burger menu
  - Footer
- Keep `RSVP` button visible.

Deliverables:
- Reusable layout shell used by all pages.
- Responsive nav behavior with active states.

Validation gate:
- Mobile and desktop navigation both usable.
- Keyboard navigation and focus states work.
- `RSVP` visible on all key layouts.

## Agent 4 — Multi-Page Routing

Mission:
- Implement all required page routes.
- Bind menu entries to routes.
- Keep labels recognizable from source site.

Deliverables:
- Complete route map and page templates.
- Correct navigation links and active states.

Validation gate:
- Every menu entry lands on the correct page.
- No broken links or route collisions.

## Agent 5 — Content Migration (Text-Only)

Mission:
- Populate dictionaries with full content in FR and SV.
- Add complete EN translation (not summarized).
- Do not add media-heavy content yet.

Deliverables:
- Full localized text content for all pages.
- Consistent key structure across locales.

Validation gate:
- No missing i18n keys.
- Content parity confirmed across FR/SV/EN.
- Google Form not integrated.

## Agent 6 — Visual Styling And Design Fidelity

Mission:
- Apply beige/warm design tokens and elegant typography.
- Match image-driven visual hierarchy (spacing, rhythm, density).
- Add minimal motion only.

Deliverables:
- Final visual pass aligned with design direction.
- Responsive typography and spacing refinement.

Validation gate:
- UI matches modern/minimal/elegant goal.
- Motion remains subtle and optional under reduced motion.
- Mobile readability is strong.

## Agent 7 — QA, Hardening, And Release Notes

Mission:
- Run final quality checks.
- Fix regressions and polish edge cases.
- Produce concise implementation report.

Deliverables:
- Final validated code state.
- Change report with remaining future-scope items.

Validation gate:
- `npm run build` passes.
- `npm run lint` passes (or documented justified warnings).
- Manual smoke test done for key pages and language switch.

## Orchestrator Checklist (Between Agents)

Before launching the next agent, always verify:
- Scope compliance with this spec.
- Code quality (readability, DRY/SRP/YAGNI).
- Regression risk on previous completed steps.
- No accidental addition of out-of-scope features.

If validation fails:
- Send fixes back to the current step.
- Re-validate.
- Only then continue to next agent.

