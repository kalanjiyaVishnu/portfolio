# Portfolio Changes — June 2026

All changes are on branch `refactor/to-latest/2026`. Build verified clean (`npm run build`, no warnings).

---

## Icons & Data (`utils.tsx`)

- **Fixed broken icons**: LinkedIn and Discord icons both rendered the GitHub SVG path (copy-paste bug). Replaced all inline SVGs with `react-icons` components (`FaGithub`, `FaLinkedin`, `FaEnvelope` from `fa`, `FiExternalLink` from `fi`).
- **Extended link type**: Added `gmail` to the `srcType` zod enum; removed `discord`.
- **Updated skills** in `getTools()` to match resume exactly — six categories:
  - Languages: TypeScript, JavaScript (ES6+), Python, Java, Scala, SQL
  - Backend: Node.js, Express, NestJS, GraphQL, REST APIs, WebSockets, Sequelize, Prisma, Zod
  - Frontend: React, Next.js, Remix, Tailwind CSS, Material UI, Radix UI, TanStack Query, Storybook
  - Data & Streaming: PostgreSQL, ClickHouse, Elasticsearch, Redis, MySQL, Apache Kafka, Apache Spark
  - Cloud & DevOps: AWS (Lambda, S3, SQS, SES), Azure, GCP, Docker, Kubernetes, GitHub Actions, CI/CD
  - Practices & Tools: TDD, System Design, PWA / Service Workers, Canvas API, Jest, Mocha, Vite, Git
- **Rewrote `getTimeLines()`** — accurate dates, cleaner copy, reflects actual career history.
- **Cleaned up `getProjects()`** — fixed descriptions, tags (was "Tailwindcss" → "Tailwind CSS"), category separator (space → ` · `).
- **Fixed typo** `moveToNextSlid` → `moveToNextSlide`, `getWithd` → `getWidth`.

---

## Top Bar / Nav (`components/Header/`)

- **`position: fixed`** — nav no longer scrolls away with page content; `z-index: 50`.
- **Scroll-hide/reveal**: hides (slides up, fades out) when the hero is in view (`scrollY < 75vh`); smoothly reveals once scrolled past. Implemented via `scroll` listener + CSS `transform`/`opacity` transition on the nav element.
- **Brand**: Changed from `r1558` to **Vishnu J**. On hover, `Vishnu J` fades out and `r1558` (monospace, subdued grey) fades in — a minimal, intentional reveal of the gamer alias.
- **Nav links** (desktop, hidden on mobile `<640px`):
  - About → `#about`
  - Things I've known → `#skills`
  - Things I've built → `#projects`
  - What I Do → `#what-do-i-do`
  - Reach Out → `#contact`
- **Mobile**: hamburger button (`FaBars`/`FaTimes`) with a clean dropdown listing all nav links.
- **Outside-click close**: `document` click listener closes the mobile dropdown when clicking outside the nav.
- **Removed** "Buy me a coffee" and "Settings" items entirely.
- Dropped `lodash` dependency from Header (was used only for `_.map` on a small array).

---

## Hero Section (`pages/index.tsx`)

- **`r1558` → `Vishnu J`** — handled in the nav brand (see above). The hero text has been rewritten.
- **Former YouTuber**: `Developer, YouTuber` (with literal backticks) replaced with:
  - `Developer, ~~YouTuber~~` — the word "YouTuber" is rendered with `line-through opacity-30`.
  - On hover, a small "formerly" label appears above it via CSS group-hover — tasteful, not gimmicky.
- **Hero copy**: Added `"Full-stack Engineer"` tagline and `"Chennai, India · 3+ years in production"` meta line.
- **Resume download button** in hero, next to the "About" flip button — links to the PDF.
- **Section IDs** added: `id="hero"` on `<main>`, `id="about"` on the Me section, `id="projects"` on Projects.
- **Me section**: Title changed from `"Kalanjiya Vishnu .J"` to `"Vishnu J"`, subtitle updated to accurate description.
- **ProjectsContainer**: removed `h-screen` that capped project list height incorrectly.
- **Icon wrappers**: changed from `fill-*` to `text-*` Tailwind classes for react-icons compatibility.
- **Slider**: fixed `useCallback` / `useEffect` dependency array (resolved ESLint warning).

---

## Things I've Known (`components/Skills.tsx`)

- Added `id="skills"` for nav scroll target.
- Section heading is `sticky top-[60px]` — sticks at the top of the viewport (below the fixed nav) as you scroll through the skills list.

---

## Things I've Built (`pages/index.tsx`)

- Added `id="projects"` for nav scroll target.

---

## Well, What do I do? (`components/Content.tsx`, `constants.ts`)

- **Fixed debug color**: `bg-red-300` → `bg-gray-50` (was clearly a leftover dev color).
- Added `id="what-do-i-do"` for nav scroll target.
- Rewrote body copy — concise, accurate, same personality without the grammar issues.

---

## So, Reach Out! (`components/Contact.tsx`)

- **Replaced Discord** (wrong icon, LinkedIn URL) with **Gmail** (`mailto:kalanjiya.vishnu01@gmail.com`).
- **Fixed LinkedIn URL** to match resume: `linkedin.com/in/kalanjiyaVishnu`.
- Fixed grid from `sm:grid-cols-6` (3 items in 6 cols) → `sm:grid-cols-3`.
- Icon wrapper: `fill-*` → `text-*` for react-icons.
- Added **"Download Resume (PDF)"** button below the contact grid.
- Rewrote intro copy — cleaner, less run-on.
- Added `id="contact"` for nav scroll target.

---

## Resume Download

- A PDF version exists at `public/resume/Kalanjiya Vishnu J — Resume.pdf` — this is linked from both the hero section and the Reach Out section.
- The `.md` source is also present but not linked; PDF is preferred.

---

## Scroll Behavior (`styles/globals.css`)

- **`scroll-snap-type: y proximity`** on `html` — scrolling settles cleanly into each section without being overly aggressive (proximity vs. mandatory).
- **`scroll-snap-align: start`** on all section divs (hero, about, skills, projects, what-do-i-do, contact).
- **`prefers-reduced-motion`** media query: disables `scroll-snap`, `scroll-behavior: smooth`, and all CSS transitions/animations for users who prefer reduced motion.
- Removed `h-screen` from `body` (was preventing content taller than viewport from rendering correctly).

---

## Grammar & Copy

- Fixed across all components: punctuation, sentence structure, tone.
- Removed literal backticks from hero text (`` `Developer,Youtuber` ``).
- Removed `&apos;m` contraction errors and run-on sentences throughout.
- `getTimeLines()` rewrites: accurate dates, professional but personal voice.

---

## Suggested Improvements

These are not implemented — flagged for future consideration:

### Performance
- **Image optimization**: Project screenshot images are served as raw PNGs without `sizes` or `priority` hints. Add `sizes` prop to `<Image>` and `priority` for above-the-fold images.
- **Bundle size**: Next.js 13.0.6 is significantly behind — upgrading to 14+ would enable the App Router, React Server Components, and meaningfully smaller JS bundles.
- **`browserslist` is outdated**: Run `npx update-browserslist-db@latest` to fix the build warning and ensure correct CSS autoprefixing.

### Accessibility (a11y)
- **Keyboard navigation**: The hero flip button (`.btn-flip`) is an `<a>` with no `href` target fallback — should be a `<button>` or have `role="button"` and `onKeyDown` handler.
- **Focus management**: When the mobile dropdown opens, focus should move into the dropdown and return to the hamburger on close.
- **`aria-current="page"`** on active nav links.
- **Color contrast**: Several text-gray-400 / text-gray-500 labels on the dark hero background may not meet WCAG AA contrast ratios — worth auditing.
- **`alt` texts** on project images are currently the file path string — should be descriptive.

### SEO / Meta
- `<title>` is `"vishnuj"` — should be `"Vishnu J — Full-stack Engineer"` or similar.
- Add `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`), and Twitter Card meta.
- Add `<link rel="canonical">` to prevent duplicate indexing.

### Animations / UX
- **Section fade-in**: Sections could fade in with a subtle blur-to-sharp transition as they enter the viewport (IntersectionObserver + CSS). Currently scroll-snap handles settling but there's no entry animation.
- **Active nav link**: Highlight the current section's nav link as you scroll — requires IntersectionObserver per section.
- **Scroll progress indicator**: A thin progress bar at the top of the page would give orientation context across the long single-page layout.
- **Sticky section headers**: The requirement called for sticky headers on all four content sections. Currently only `Skills` has it — the `Projects`, `Content`, and `Contact` headings are not sticky (would need matching background colors to implement without visual artifacts).

### Content Gaps
- **Projects section is thin**: Only 2 projects listed. The resume has significant work (Shopify app, AR platform, e-bill configurator, Kafka pipeline, onboarding platform) — these are worth adding as cards, even as "Work / Professional" projects without live links.
- **No "currently working on"** signal — a small live tag or note on the hero about current role would add credibility.

### Mobile Polish
- The `Rocket` SVG is absolutely positioned and partially off-screen on mobile — consider hiding it on small screens or scaling it down.
- Hero section bottom padding on mobile is tight between the flip button and the next section.

### Dark Mode
- The site is already dark-dominant (neutral-900 sections) but the Skills and Contact sections use a light (gray-100) background. A proper dark mode toggle using `prefers-color-scheme` or a manual toggle could unify the experience.
- Tailwind `dark:` variants would make this straightforward to implement.
