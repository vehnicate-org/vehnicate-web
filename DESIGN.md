# DESIGN.md: vehnicate.com

> Coding agent: follow this file strictly. If a decision is not covered here, choose the option that is closest to the "Design Principles" and "Anti-patterns" sections. Do not invent new colors, fonts or components.

---

## 1. Brand Summary

**What it is:** A road-safety startup. Drivers install an Android app, drive normally, and the app detects potholes and speedbreakers. Detected defects go on a public map. Drivers earn **Ellars** (a reward currency) that can be spent at partner merchants (the **vehnicate Merchant Network, vMN**).

**Personality:** warm, human, slightly cheeky, and trustworthy. Think "friendly road mate", not "enterprise telematics". It is serious about saving lives but never grim.

**Voice (use this in all UI copy):**
- Lowercase brand name: always `vehnicate`, never "Vehnicate".
- Conversational microcopy. Real examples from the brand: "nopee", "uhm... we dont think the boundaries are well defined", "Ahoy!", "doing good is profitable."
- Short sentences. No corporate jargon (no "leverage", "synergy", "solutions").
- Emotional hook: someone is waiting for you at home. Use it sparingly and sincerely.

**Primary audience:** Indian drivers (cars, two-wheelers, delivery riders), many on mobile. Secondary: local merchants, city/road authorities, investors.

---

## 2. Design Principles

1. **One idea per page.** Do not dump everything on a single scroll. Each topic has its own route (see Sitemap).
2. **Warm, not corporate.** Rounded shapes, friendly color, human copy.
3. **Road-themed motion, not decoration.** Motion should suggest driving: horizontal travel, bumps, a dashed road line. Never random floating blobs.
4. **Data is the hero.** Big numbers, the map, and Ellar balances are the visual centerpieces.
5. **Mobile first.** Most visitors arrive from a phone. Design at 375px first.
6. **Proof over promises.** Always show a real number, real map, or real merchant when making a claim.

---

## 3. Sitemap & Page Structure

Use real routes (hyperlinked pages), not one long page. Use a shared layout (navbar + footer).

| Route | Purpose | Key sections |
|---|---|---|
| `/` | Home: hook and funnel to other pages | Hero, live stats, 3-step teaser, Ellar teaser, vMN teaser, map teaser, CTA |
| `/what` | What vehnicate is and how the app works | Intro, the 4-step flow (install, mount?, drive, earn), mount-vs-pocket Ellar tip, FAQ |
| `/why` | The emotional and economic case | "Why we care" story, the "someone is waiting at home" block, impact stats |
| `/app` | Download and app details | Play Store button, screenshots, permissions and privacy, requirements |
| `/ellar` | History and working of the Ellar | What it is, how it is earned, how it is spent, how value grows |
| `/vmn` | Merchant network | How it works, current merchant(s), "become a merchant" CTA |
| `/map` | Public road-defect map | Full-bleed map, filters, legend |
| `/contact` | Get in touch | Form, socials, partnership note |

**Navbar links (in order):** What, Why, App, Ellar, vMN, Map, Contact. Primary button on the right: **Get the app**.

**Home page rules:** every section ends with one link to its full page ("Learn more about the Ellar →"). The home page must stay short, around 5 to 6 screens on mobile.

**External links:**
- App: `https://play.google.com/store/apps/details?id=com.vehnway.app&pcampaignid=web_share`
- Analytics dashboard: `https://dashboard.vehnicate.com/`
- LinkedIn: `https://www.linkedin.com/company/vehnicate/`
- YouTube: `https://www.youtube.com/channel/UCrgjnbIM-6sNmaLem3Qmntg`
- Instagram: `https://www.instagram.com/vehnicate/`

---

## 4. Color System

> **IMPORTANT:** The values below are a pink-led palette inferred from the brand's 🩷 sign-off. **Replace the hex values in the "Brand" group with the exact values from the live site** (use browser DevTools or a color-picker on vehnicate.com). Keep the token names the same so nothing else needs to change. Never hardcode hex values in components; always use the tokens.

### Tokens (CSS variables)

```css
:root {
  /* Brand */
  --brand-500: #F0447C;      /* primary pink: main CTAs, key highlights */
  --brand-600: #D6336A;      /* hover / pressed */
  --brand-400: #F77AA3;      /* lighter accents, illustrations */
  --brand-100: #FDE4EE;      /* tinted backgrounds, chips */
  --brand-50:  #FFF3F8;      /* very soft section backgrounds */

  /* Neutrals (slightly warm) */
  --ink-900: #1B1320;        /* primary text, dark sections */
  --ink-700: #3A2F40;        /* secondary headings */
  --ink-500: #6B6072;        /* body secondary, captions */
  --ink-300: #C9C0CE;        /* borders on dark, disabled */
  --line:    #EBE3EE;        /* borders on light */
  --paper:   #FFFDFE;        /* page background */
  --white:   #FFFFFF;        /* cards */

  /* Semantic road colors (map markers and status only) */
  --defect-pothole:    #E5484D;
  --defect-speedbreak: #F5A524;
  --safe-ok:           #2FA36B;
  --info:              #3B82F6;

  /* Effects */
  --shadow-sm: 0 1px 2px rgba(27,19,32,.06);
  --shadow-md: 0 8px 24px rgba(27,19,32,.08);
  --shadow-brand: 0 10px 30px rgba(240,68,124,.28);
}

[data-theme="dark"] {
  --paper:  #140E18;
  --white:  #1E1624;
  --ink-900: #FBF7FC;
  --ink-700: #E4DBE8;
  --ink-500: #A99EB0;
  --line:   #33283B;
  --brand-50: #261425;
  --brand-100: #3A1A2E;
}
```

### Usage rules
- **Pink is the single accent.** Use it for primary buttons, key words in headlines, active nav state, links on hover, and the Ellar badge. Do not use it for large body backgrounds except `--brand-50`.
- Default page background is `--paper`. Alternate sections between `--paper` and `--brand-50`. Use one dark section (`--ink-900`) per page at most, for emphasis (for example the "why we care" story).
- Text contrast must meet WCAG AA. Body text on `--paper` is `--ink-900` or `--ink-700`.
- Defect colors (`--defect-*`) appear **only** on the map, legend and defect-related data. Never for buttons or decoration.
- No purple-to-blue gradients. The only allowed gradient is a subtle `--brand-500` to `--brand-400` on the primary CTA or Ellar coin.
- Support dark mode via `prefers-color-scheme` plus the `data-theme` attribute.

---

## 5. Typography

**Fonts (load from Google Fonts, `display=swap`):**
- **Display / headings:** `Bricolage Grotesque` (weights 600, 700, 800). Has character without being gimmicky.
- **Body / UI:** `DM Sans` (400, 500, 600).
- **Numbers / stats / code-like labels:** `JetBrains Mono` (500, 700).
- Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- **Never use Inter, Roboto, Arial or Space Grotesk as the primary font.**

### Scale (fluid, mobile to desktop)

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Hero H1 | `clamp(2.5rem, 7vw, 5.5rem)` | 800 | 1.02 | -0.03em |
| H2 | `clamp(1.875rem, 4vw, 3rem)` | 700 | 1.1 | -0.02em |
| H3 | `1.5rem` | 600 | 1.2 | -0.01em |
| Body L | `1.125rem` | 400 | 1.6 | 0 |
| Body | `1rem` | 400 | 1.6 | 0 |
| Caption / label | `0.8125rem` | 500 | 1.4 | 0.04em, uppercase for eyebrows |
| Stat number | `clamp(2.5rem, 6vw, 4.5rem)` | 700 (mono) | 1 | -0.02em |

### Rules
- Headlines are **lowercase or sentence case**, matching the brand voice. Never Title Case Every Word.
- Highlight one key word per headline in `--brand-500`, for example: "get rewarded for every **pothole** you drive over".
- Max line length for paragraphs: 65 characters (`max-width: 65ch`).
- Eyebrow labels (small uppercase text above headings) use `--brand-500`, caption style.

---

## 6. Layout & Spacing

- **Container:** max-width `1200px`, horizontal padding `20px` (mobile) / `32px` (tablet) / `48px` (desktop).
- **Spacing scale (8px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section vertical padding:** 64px mobile, 96px tablet, 128px desktop.
- **Grid:** 12 columns on desktop, 4 on mobile, gap 24px.
- **Breakpoints:** 480, 768, 1024, 1280.
- **Border radius:** buttons and chips `999px` (pill), cards `20px`, inputs `14px`, images `24px`. The brand is round and friendly, so no sharp corners.
- **Borders:** 1px `--line`. Prefer border plus soft shadow over heavy shadows.
- Avoid the generic "three identical cards in a row" pattern as the only layout. Mix: split screen, large stat blocks, timelines, and one asymmetric section per page.

---

## 7. Components

### 7.1 Announcement bar (top of every page)
- Full-width, `--ink-900` background, white text, 40px tall.
- Rotating (auto-advance every 5s, pause on hover) messages:
  1. "maps is now live. **explore!**" → `/map`
  2. "the vehnicate app is on the playstore. **drive & earn Ellars!**" → Play Store
  3. "detailed user analytics is now live. **explore!**" → dashboard
- Highlight word in `--brand-400`. Dismissible; remember in `localStorage`.
- On mobile, show one message, truncated to a single line.

### 7.2 Navbar
- Sticky, 72px tall, `--paper` at 85% opacity with `backdrop-filter: blur(12px)`, 1px bottom border `--line`.
- Left: wordmark `vehnicate` (lowercase, Bricolage 700, with the final "e" or a small dot in `--brand-500`).
- Center/right: text links. Active link has a 2px `--brand-500` underline offset 6px.
- Right: primary pill button **Get the app**.
- Mobile: hamburger opens a full-screen sheet with large (2rem) links and the Get the app button at the bottom.

### 7.3 Buttons
- **Primary:** `--brand-500` background, white text, pill, padding `14px 28px`, weight 600. Hover: `--brand-600` and translateY(-2px) and `--shadow-brand`. Focus: 3px ring `--brand-100` plus 2px offset in `--brand-500`.
- **Secondary:** transparent, 1.5px `--ink-900` border, `--ink-900` text. Hover: fills `--ink-900`, text `--paper`.
- **Tertiary / link:** text plus arrow `→` that shifts 4px right on hover.
- Minimum tap target 44px.
- The Play Store button uses the official Google Play badge, never a custom imitation.

### 7.4 Stat counter ("users have so far clocked...")
- Large mono numbers with a label beneath, in a horizontal row (stack on mobile).
- Counts up when scrolled into view (once, 1.2s, ease-out).
- Stats to show: kilometres driven, road defects mapped, drivers, Ellars earned. Use real numbers from the API. If unavailable, show a skeleton shimmer, never fake numbers.

### 7.5 Step timeline (how the app works)
- Vertical on mobile, horizontal on desktop. Four steps: install, mount, drive, earn.
- Each step: large mono number (`01`), title, short text, and a small illustration or icon.
- Connect steps with a **dashed road line** (`border-top: 3px dashed --ink-300`) with a small car or dot that travels along it as the user scrolls.
- Step 02 includes an expandable disclosure ("do you have a phone mount?" with "nopee" / "yes!" options) that reveals the pocket-mode text. Use a smooth height animation.
- A highlighted "Tip" chip: "Mounting your phone gets you 2x Ellars" in `--brand-100` background with `--brand-600` text.

### 7.6 Ellar badge / coin
- A circular coin graphic (pink gradient, embossed "E"), reused wherever Ellars are mentioned.
- Inline mentions of "Ellar" use `--brand-600`, weight 600.
- Animate with a gentle 3D flip on hover (respect reduced motion).

### 7.7 Cards
- `--white` background, 1px `--line`, radius 20px, padding 28px, `--shadow-sm`. Hover: `--shadow-md` and translateY(-4px).
- Each card has: icon or illustration, H3, 1 to 2 lines of body, optional "Learn more →" link.

### 7.8 Story block ("why we care")
- Full-width dark section (`--ink-900`), large editorial typography.
- Text reveals line by line on scroll.
- The line "someone waiting for their **wife** to return home safely" cycles the bolded word between people (wife, son, mother, husband, friend...) with a gentle crossfade, in `--brand-400`. Keep the cycle slow (3s) and pause for reduced motion.
- Closing line about the tomato reaching your door in 10 minutes is shown as a quiet, large pull-quote.

### 7.9 Map components
- `/map` is full-bleed below the navbar (height `calc(100dvh - 72px)`).
- Use a clean light basemap (or dark in dark mode). Markers: `--defect-pothole` circles and `--defect-speedbreak` shapes, clustered when zoomed out.
- Floating legend and filter panel (rounded card, top-left on desktop, bottom sheet on mobile).
- On the home page, show a **small non-interactive map preview** (rounded 24px image or lightweight embed) with a "Go to maps →" button.
- Add a one-line privacy note: "defects are shown anonymously".

### 7.10 Merchant card (vMN)
- Logo or initial, merchant name, category, "accepts Ellars" chip, discount note.
- Currently one merchant: **Muthaaramman Mini Supermarket** (grocery). Design the grid so more can be added, and include a dashed-border "your shop here" placeholder card linking to contact.

### 7.11 Contact form
- Fields: Name, Email, Subject, Message. Labels above inputs, 14px radius, 1.5px `--line` border, focus ring in `--brand-500`.
- Inline validation, success state with a friendly message ("got it! we'll get back to you soon.").
- Next to it: social icon buttons (LinkedIn, YouTube, Instagram) and the line "mail/message us at anytime. uhm... we dont think the boundaries are well defined".

### 7.12 Footer
- `--ink-900` background. Four columns: brand blurb, pages, social, contact.
- Brand blurb: "Building a gamified ecosystem that rewards being a good road mate."
- Sign-off row: "doing good is profitable." (large), then "Safe & happy driving, with 🩷, vehnicate."
- Bottom: "© 2026 vehnicate. Built with ❤ by team vehnicate."

---

## 8. Page Blueprints

### Home (`/`)
1. **Hero:** H1 "get rewarded for every **pothole** you drive over..." The word "pothole" is pink, and a tiny animated car crosses a bump in the road line beneath the headline. Sub-copy: one sentence. Two buttons: *Get the app* (primary), *See the map* (secondary). Right side (desktop): phone mockup showing the app, or an illustrated map.
2. **Live stats row** (7.4).
3. **How it works teaser:** 4 compact steps with a link to `/what`.
4. **Ellar teaser:** coin graphic plus 2 sentences plus link to `/ellar`.
5. **vMN teaser:** merchant card plus link to `/vmn`.
6. **Map teaser:** map preview plus link to `/map`.
7. **Closing CTA band:** "doing good is profitable." plus Get the app button.

### What (`/what`)
Intro, full step timeline (7.5), mount-vs-pocket comparison table (2x vs 1x Ellars), short FAQ accordion (battery use, data privacy, which phones, how defects are detected).

### Why (`/why`)
Story block (7.8), then 2 to 3 impact stat blocks (lives, families, economy), then a CTA to download the app.

### Ellar (`/ellar`)
Hero with coin, timeline of the Ellar's history, "how it's earned / how it's spent / why it grows" three-part explainer, link to vMN.

### vMN (`/vmn`)
Plain-language explanation of the network, "how value flows" diagram (driver → Ellars → merchant → more customers), merchant grid, "become a merchant" form or CTA.

### App (`/app`)
Play Store badge, screenshots carousel, permissions explained in plain language, privacy summary.

### Contact (`/contact`)
Form and socials (7.11).

---

## 9. Imagery & Illustration

- **Style:** flat, friendly vector illustration with rounded shapes, 2 to 3 colors from the palette, plus one bold line-art detail. No stock photos of handshakes, no 3D robot or AI-brain imagery, no glowing neural networks.
- Recurring motifs: road with dashed center line, speedbreaker bump, pothole, phone in a pocket, tomato delivery, a home window with a light on.
- Use real product screenshots in device frames for the app.
- Icons: Lucide, 1.75px stroke, rounded caps, `--ink-900` or `--brand-500`.
- Every image needs meaningful `alt` text. Decorative images get `alt=""`.

---

## 10. Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Durations: micro 150ms, standard 300ms, entrance 600ms.
- Scroll reveals: fade up 16px, staggered by 80ms, triggered once.
- Signature motion: the **dashed road line** and traveling car/dot on the home and `/what` pages.
- Use `framer-motion` or CSS only. No heavy libraries unless needed for the map.
- **Always honor `prefers-reduced-motion`**: disable parallax, auto-rotating text, and counters (show final values).

---

## 11. Accessibility & Performance

- WCAG 2.2 AA minimum. Visible focus states on every interactive element. Full keyboard navigation. Skip-to-content link.
- Semantic HTML: one `<h1>` per page, landmarks (`header`, `nav`, `main`, `footer`).
- Lighthouse targets: Performance 90+, Accessibility 100, SEO 100 on mobile.
- Lazy-load images and the map. Use `next/image` or equivalent with width/height set to avoid layout shift.
- Each page has its own `<title>`, meta description and Open Graph image.
- Target users may be on slow networks: keep the initial JS small and avoid autoplay video.

---

## 12. Tech Stack (preferred)

- **Framework:** Next.js (App Router) with TypeScript, or Astro if mostly static.
- **Styling:** Tailwind CSS with the tokens above mapped into `tailwind.config` (colors, fontFamily, borderRadius, spacing). No inline hex values.
- **Animation:** Framer Motion.
- **Icons:** `lucide-react`.
- **Map:** MapLibre GL (or the existing map implementation, reuse it).
- **Forms:** server action or API route, with spam protection (honeypot or Turnstile).

---

## 13. Anti-patterns (do NOT do these)

- No purple/blue gradient hero, no glassmorphism cards stacked everywhere, no neon glow.
- No centered hero plus three identical feature cards as the only structure.
- No generic stock phrases: "Revolutionizing", "cutting-edge", "seamless", "unlock the power of", "next-generation".
- No emoji as icons (the only emoji allowed are the brand sign-offs in the footer).
- No fake testimonials, fake logos, or invented statistics.
- No Title Case headings, no ALL CAPS headings (eyebrows only).
- No cramped layouts: when in doubt, add more whitespace.
- No dumping all content on one page. Respect the sitemap.
- Do not change the voice: no corporate rewrites of the playful microcopy.

---

## 14. Definition of Done

- [ ] All routes in the sitemap exist and are linked from the navbar and footer.
- [ ] Only design tokens are used (no stray hex codes or font families).
- [ ] Looks correct at 375px, 768px, 1280px and 1920px.
- [ ] Dark mode works.
- [ ] Reduced-motion mode works.
- [ ] Lighthouse mobile scores meet the targets in section 11.
- [ ] All external links open correctly (`rel="noopener"` for new tabs).
- [ ] Copy matches the brand voice in section 1.
