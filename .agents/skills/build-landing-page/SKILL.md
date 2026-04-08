---
name: build-landing-page
description: "When the user wants to build a high-converting standalone landing page. Use when the user says 'build a landing page', 'create a campaign page', 'build a lead gen page', 'make a free offer page', 'create a PPC landing page', or provides an offer/promotion and wants a dedicated conversion page. Extracts exact brand theme from the existing website URL — no theme picker needed. All 9 CRO hacks are MANDATORY. Nav is stripped to logo-only. Every section serves the single conversion goal."
metadata:
  version: 2.0.0
---

# Build Landing Page — Production System

## SYSTEM IDENTITY

You are a senior conversion rate specialist, Next.js architect, and UI/UX designer building **a single-purpose, high-converting landing page** that looks and feels like a natural extension of the client's existing website.

A landing page is NOT a regular site page:
- **One offer. One CTA. Zero nav distractions.**
- All 9 CRO hacks are **mandatory** (not optional)
- Copy addresses ONE audience fear and leads them to ONE action
- Design matches the existing website **exactly** — same fonts, colours, logo, imagery style
- UI quality must be **elegant and excellent** — not template-looking

---

## SELF-AWARE EXECUTION LOOP

**Before writing a single line**, run this check:

1. Does `.claude/CLAUDE.md` exist?
   - **YES** → Read it + `.claude/state.json` + `.claude/design.json`. Inherit the existing design system. Skip website scraping.
   - **NO** → This is a standalone project. Run Step 0 (Website Theme Extraction) first.

2. Validate planned changes against design system, CRO rules, and SEO rules.
3. Never break existing structure. Only add what the command requires.
4. After every file written, update `.claude/state.json`.

---

## EXECUTION CONTRACT

Follow this exact order. Do NOT skip steps. Do NOT summarise outputs. Generate everything in full.

```
0. WEBSITE THEME EXTRACTION — ask for URL, scrape brand tokens
1. Collect offer input
2. Generate landing page content JSON (source of truth)
3. WAVE 1 — Build globals.css + shared components + page file
4. WAVE 2 — Validation agent (tsc + images + CRO 9/9 audit + SEO audit)
5. Update state.json + routes.json
6. Output summary table
```

---

## STEP 0 — WEBSITE THEME EXTRACTION

**Do NOT show a theme picker.** Instead, ask:

> "What is the URL of your existing website? I'll extract the exact colours, fonts, and style so the landing page matches perfectly."

Once the user provides the URL:

### 0a — Scrape the website

Use `WebFetch` to fetch the homepage HTML. Extract:

```
PRIMARY_COLOR    — dominant brand colour (check CSS variables, inline styles, button colours)
ACCENT_COLOR     — highlight/CTA colour (usually a contrasting gold, orange, or blue)
DARK_BG_COLOR    — dark section background (hero, footer bg)
LIGHT_BG_COLOR   — light section background (alternating sections)
BODY_FONT        — body text font family
HEADING_FONT     — heading/display font family
LOGO_URL         — full URL to the logo image
HERO_IMAGE_URL   — representative hero/banner image if present
REVIEW_SCORE     — star rating if shown
REVIEW_COUNT     — number of reviews if shown
PHONE            — contact phone number
EMAIL            — contact email
ADDRESS          — physical address
BUSINESS_NAME    — exact business name
CERTIFICATIONS   — any licenses, accreditations, awards shown
```

### 0b — Download brand assets

Download the logo to `public/logo.png` (or `.svg`) using the Bash tool:
```bash
curl -L "[LOGO_URL]" -o public/logo.png
```

Download any hero/background image that is on-brand:
```bash
curl -L "[HERO_IMAGE_URL]" -o public/overlay_image.webp
```

### 0c — Write `.claude/design.json`

```json
{
  "businessName": "",
  "domain": "",
  "colors": {
    "primary": "",
    "accent": "",
    "darkBg": "",
    "lightBg": "",
    "text": "#0F172A"
  },
  "fonts": {
    "heading": "",
    "body": "",
    "ui": "Inter"
  },
  "logo": "/logo.png",
  "heroImage": "/overlay_image.webp",
  "trustSignals": {
    "reviewScore": "",
    "reviewCount": "",
    "yearsInBusiness": "",
    "certifications": []
  },
  "contact": {
    "phone": "",
    "email": "",
    "address": ""
  }
}
```

### 0d — Write `src/app/globals.css`

Generate a **complete** globals.css using the extracted tokens. It MUST include:

```css
@import "tailwindcss";

:root {
  --primary: [PRIMARY_COLOR];
  --primary-dark: [darkened PRIMARY_COLOR by ~15%];
  --accent: [ACCENT_COLOR];
  --accent-dark: [darkened ACCENT_COLOR by ~10%];
  --dark-bg: [DARK_BG_COLOR];
  --light-bg: [LIGHT_BG_COLOR];
  --text: #0F172A;
  --background: #ffffff;
}

@theme inline {
  --color-primary: var(--primary);
  --color-accent: var(--accent);
  --color-dark-bg: var(--dark-bg);
  --color-light-bg: var(--light-bg);
}

/* Typography — use actual website fonts */
.heading-display {
  font-family: '[HEADING_FONT]', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.heading-lg {
  font-family: '[HEADING_FONT]', sans-serif;
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
}

.heading-md {
  font-family: '[HEADING_FONT]', sans-serif;
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
}

/* Eyebrow — elegant pill tag using accent colour */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: 9999px;
  padding: 0.3rem 0.875rem;
}

/* Eyebrow variant for light backgrounds */
.eyebrow-dark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
  border-radius: 9999px;
  padding: 0.3rem 0.875rem;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--accent);
  color: var(--text);
  font-family: '[HEADING_FONT]', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 9999px;
  padding: 0.9375rem 2rem;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 32px color-mix(in srgb, var(--accent) 45%, transparent);
}

.btn-primary:active {
  transform: translateY(0) scale(0.99);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  color: white;
  font-family: '[HEADING_FONT]', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 9999px;
  padding: 0.875rem 1.75rem;
  transition: border-color 0.15s, background 0.15s;
  text-decoration: none;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.06);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.12);
}

/* Cards */
.card {
  background: white;
  border-radius: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 16px color-mix(in srgb, var(--primary) 6%, transparent);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 32px color-mix(in srgb, var(--primary) 12%, transparent);
  transform: translateY(-2px);
}

.card-glass {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.25rem;
  backdrop-filter: blur(8px);
}

/* Layout */
.section-padding {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

@media (min-width: 640px) {
  .section-padding {
    padding-top: 7.5rem;
    padding-bottom: 7.5rem;
  }
}

.container-base {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

@media (min-width: 640px) {
  .container-base { padding-left: 2rem; padding-right: 2rem; }
}
@media (min-width: 1024px) {
  .container-base { padding-left: 2.5rem; padding-right: 2.5rem; }
}

/* Form inputs — for dark backgrounds */
.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 0.875rem;
  padding: 0.9375rem 1.125rem;
  color: white;
  font-family: '[BODY_FONT]', sans-serif;
  font-size: 0.9375rem;
  transition: border-color 0.15s, background 0.15s;
  outline: none;
}

.input-field::placeholder { color: rgba(255, 255, 255, 0.58); }

.input-field:focus {
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.2);
}

/* Gold divider line */
.accent-line {
  width: 3rem;
  height: 3px;
  background: var(--accent);
  border-radius: 9999px;
}
```

---

## STEP 1 — COLLECT OFFER INPUT

After extracting the website theme, ask for:

```
SLUG            =   (kebab-case URL path, e.g. "free-assessment")
OFFER_HEADLINE  =   (e.g. "Book Your Free Learning Assessment in Dubai")
OFFER_SUBHEAD   =   (benefit + urgency)
AUDIENCE        =   (who this page targets)
PRIMARY_CTA     =   (action-verb label, e.g. "Book Free Assessment")
FEAR            =   (the one objection to overcome)
BOOSTER_LINE    =   (default: "Free · No commitment · Response within 2 hours")
TARGET_KW       =   (primary SEO keyword, include city if local)
PAGE_PURPOSE    =   "lead-gen" | "sales" | "event" | "free-tool" | "waitlist" | "paid"
```

---

## STEP 2 — GENERATE LANDING PAGE CONTENT JSON

Generate and output this JSON **before writing any code**. This is the source of truth.

```json
{
  "landing": {
    "slug": "",
    "purpose": "lead-gen | sales | event | free-tool | waitlist | paid",
    "audience": "",
    "fear": "",
    "hero": {
      "eyebrow": "",
      "headline": "",
      "subheadline": "",
      "cta_primary": "",
      "cta_secondary": "",
      "booster": "Free · No commitment · Response within 2 hours"
    },
    "trust_bar": [
      { "icon": "Star", "value": "4.9★", "label": "127 verified reviews" },
      { "icon": "Briefcase", "value": "350+", "label": "students supported" },
      { "icon": "Shield", "value": "Licensed", "label": "certified & approved" },
      { "icon": "Clock", "value": "10 yrs", "label": "trusted locally" }
    ],
    "problem_section": {
      "eyebrow": "The Real Problem",
      "headline": "",
      "copy": "",
      "pain_points": ["", "", ""]
    },
    "benefits": [
      { "icon": "", "headline": "", "body": "" }
    ],
    "testimonials": [
      { "concern": "", "quote": "", "name": "", "location": "", "service": "", "outcome": "" }
    ],
    "how_it_works": {
      "eyebrow": "How It Works",
      "headline": "",
      "steps": [
        { "number": "01", "title": "", "body": "" },
        { "number": "02", "title": "", "body": "" },
        { "number": "03", "title": "", "body": "" }
      ]
    },
    "stats": [
      { "value": "350+", "label": "Students Supported" },
      { "value": "4.9★", "label": "Average Rating" },
      { "value": "100%", "label": "KHDA Approved" },
      { "value": "10", "label": "Years Trusted" }
    ],
    "pull_quote": { "quote": "", "attribution": "" },
    "comparison": {
      "columns": ["DIY / Tutors", "Other Centres", "[BUSINESS_NAME]"],
      "featured_column": 2,
      "featured_badge": "Best Choice",
      "rows": [
        { "label": "Personalised learning plan", "values": [false, "Sometimes", true] },
        { "label": "Progress tracking", "values": [false, "PDF only", "Live dashboard"] },
        { "label": "Small class sizes", "values": ["Varies", "Up to 20", "Max 6"] },
        { "label": "Curriculum aligned", "values": [false, "Rarely", true] },
        { "label": "KHDA licensed", "values": [false, false, true] },
        { "label": "Free assessment", "values": [false, false, true] }
      ]
    },
    "faq": [
      { "question": "", "answer": "" }
    ],
    "tldr": {
      "headline": "Here's What You Get",
      "bullets": ["", "", ""]
    },
    "lead_form": {
      "headline": "",
      "fields": ["name", "email", "phone", "childAge"],
      "submit_label": "",
      "redirect": "/thank-you"
    },
    "seo": {
      "meta_title": "",
      "meta_description": "",
      "h1": "",
      "target_kw": "",
      "schema_type": "LocalBusiness + Offer"
    }
  }
}
```

---

## STEP 3 — BUILD THE PAGE

### File: `src/app/[SLUG]/page.tsx`

Add `"use client"` at the top — landing pages use Framer Motion + React Hook Form.

### SECTION ORDER (strict — do not reorder)

```
 1. MinimalHeader           Logo + single CTA only — NO nav links, NO menu
 2. LandingHero             Two-column layout: copy LEFT + glass form card RIGHT (hidden mobile)
 3. ServiceTrustBar         [HACK 1] Immediately below hero — horizontal icon + stat rows
 4. ProblemSection          [HACK 3] Name the fear in audience's own words
 5. BenefitsSection         [HACK 7] Outcome-first 3-col grid with .card hover lift
 6. IntentTestimonial ×3    [HACK 4] concern badge → quote → outcome pill → name + location
 7. HowItWorksSection       Eyebrow · numbered 3-step glassmorphism cards with connecting line
 8. StatsStrip              4 proof numbers on WHITE bg · large primary-colour numbers + accent dividers
 9. ComparisonTable         [HACK 6] Card-based — 3 columns, featured column with accent border
10. PullQuote               [HACK 5] Large italic quote · dark bg
11. FAQSection              Two-column: description left, accordion right · white bg
12. TLDRSection             [HACK 8] Summary + checkmarks before final CTA
13. LeadCaptureSection      [HACK 9] Full form in white card on light-bg · id="lead-form"
14. MinimalFooter           Phone · email · address · legal copy — NO nav links
15. MobileStickyBar         Fixed bottom bar, md:hidden, scroll-triggered
```

### HERO — TWO-COLUMN LAYOUT (mandatory pattern)

```tsx
{/* Hero: copy left, glass form card right */}
<section style={{ backgroundColor: DARK_BG, minHeight: "100vh" }} className="flex items-center">
  <div className="container-base py-28 grid lg:grid-cols-2 gap-12 items-center">
    {/* LEFT: Copy */}
    <div>
      <span className="eyebrow">Your Eyebrow</span>
      <h1 className="heading-display text-white mt-4 mb-6">{headline}</h1>
      <p className="text-white/70 text-lg leading-relaxed mb-8">{subheadline}</p>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <a href="#lead-form" className="btn-primary px-8 py-4">{CTA} <ArrowRight size={16} /></a>
        <a href="tel:{PHONE}" className="btn-secondary px-6 py-4 text-sm">Call {PHONE}</a>
      </div>
      <p className="text-white/30 text-xs mt-3">{BOOSTER_LINE}</p>
    </div>
    {/* RIGHT: Glass inline form — hidden on mobile */}
    <div className="hidden lg:block">
      <div
        className="rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.13)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p className="text-white font-bold text-lg mb-1">Reserve your free spot</p>
        <p className="text-white/50 text-sm mb-6">We respond within 2 hours</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
          <input {...register("_honey")} className="hidden" tabIndex={-1} autoComplete="off" />
          <input {...register("name", { required: true })} placeholder="Your name *" className="input-field" />
          <input {...register("email", { required: true })} placeholder="Email address *" type="email" className="input-field" />
          <input {...register("phone")} placeholder="Phone / WhatsApp" type="tel" className="input-field" />
          <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 mt-1 disabled:opacity-60">
            {submitting ? "Sending…" : CTA}
          </button>
          <p className="text-white/40 text-xs text-center">{BOOSTER_LINE}</p>
        </form>
      </div>
    </div>
  </div>
</section>
```

### STATS STRIP — WHITE BACKGROUND PATTERN (mandatory)

```tsx
{/* Stats on white bg — large primary numbers + accent dividers */}
<section className="section-padding bg-white">
  <div className="container-base">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {stats.map((stat, i) => (
        <motion.div key={i} className="text-center flex flex-col items-center gap-2">
          <div className="accent-line" />
          <p className="heading-lg" style={{ color: PRIMARY_COLOR }}>{stat.value}</p>
          <p className="text-gray-500 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

### ANIMATION — USE TYPED VARIANTS (avoid TypeScript errors)

```tsx
import { motion, Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function FadeSection({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.section
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}
```

**NEVER** use `ease: [...]` or `ease: string` directly on inline `transition` objects spread onto motion components — always use `Variants` type.

### LEAD FORM SECTION — LIGHT BG PATTERN

```tsx
<section id="lead-form" className="section-padding" style={{ backgroundColor: LIGHT_BG }}>
  <div className="container-base">
    <div className="max-w-2xl mx-auto">
      <div className="card p-10">
        {/* headline, eyebrow */}
        <form className="flex flex-col gap-5 mt-8">
          {/* solid white inputs with border-gray-200 */}
          {/* inputClass = "w-full rounded-xl px-4 py-3.5 text-sm bg-white border border-gray-200 outline-none transition-all duration-150 focus:border-[ACCENT] focus:ring-2 focus:ring-[ACCENT20] placeholder:text-gray-400" */}
        </form>
      </div>
    </div>
  </div>
</section>
```

---

## STEP 4 — 9 CRO HACKS (ALL MANDATORY)

| # | Hack | Implementation |
|---|------|----------------|
| **1** | **Social Proof Above the Fold** | `<ServiceTrustBar />` as section 3 — directly below hero. Icon + value + label rows on dark bg. |
| **2** | **Eyebrow on Every Section** | `<span className="eyebrow">LABEL</span>` above every H2. Use `.eyebrow` on dark bg, `.eyebrow-dark` on light bg. Never a `■` prefix — it's a pill tag only. |
| **3** | **Conversational Copy — Address the Fear** | Section 4 opens with the single fear in audience's own words. ✗ "Proven results" ✓ "You've seen your child struggle despite private tutors. Here's why this is different." |
| **4** | **Intent Testimonials** | Three cards with: concern badge (e.g. "Worried about exam results") → real quote → outcome pill (e.g. "Grade improved 2 levels") → name + city. Use `.card` with hover lift. |
| **5** | **Pull Quote** | Full-width dark section. Large italic client quote. No buttons, no distractions. One pull quote only. |
| **6** | **Comparison Table (card-based, NOT HTML table)** | Build as `<ComparisonTable />`. 3 columns: Alternatives / Other Providers / Business. Featured column has accent border + "Best Choice" badge. |
| **7** | **Benefits-First Copy** | Every bullet leads with the outcome. ✗ "We use proven methods" ✓ "Your child walks into exams confident — not cramming the night before." |
| **8** | **TL;DR Section** | Left: bold 2-sentence offer summary. Right: 4–6 checkmark bullets with specific deliverables. Placed directly before final CTA. |
| **9** | **CTA Booster** | Every CTA button must have directly beneath it: `<p className="text-xs text-white/30 mt-2 text-center">{BOOSTER_LINE}</p>` — adjust opacity based on bg colour. |

---

## STEP 5 — ELEGANT UI/UX PATTERNS (mandatory quality bar)

These patterns make the difference between a template-looking page and an elegant, professional one:

### Eyebrow Tags — pill shape only, never `■` prefix
```tsx
<span className="eyebrow">Free Assessment</span>   {/* dark bg */}
<span className="eyebrow-dark">How It Works</span>  {/* light bg */}
```

### Testimonials — concern → quote → outcome flow
```tsx
<div className="card p-7">
  <span className="eyebrow-dark text-xs mb-4 inline-block">{testimonial.concern}</span>
  <blockquote className="text-gray-700 text-lg italic leading-relaxed mb-5">"{testimonial.quote}"</blockquote>
  <div className="flex items-center justify-between mt-auto">
    <div>
      <p className="font-bold text-sm">{testimonial.name}</p>
      <p className="text-gray-400 text-xs">{testimonial.location}</p>
    </div>
    <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(ACCENT,0.12)", color: "ACCENT" }}>
      {testimonial.outcome}
    </span>
  </div>
</div>
```

### How It Works — glassmorphism step cards with connecting line
```tsx
<div className="relative">
  {/* Vertical connecting line */}
  <div className="absolute left-8 top-16 bottom-16 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, ACCENT, transparent)" }} />
  <div className="flex flex-col lg:flex-row gap-8">
    {steps.map(step => (
      <div key={step.number} className="card-glass flex-1 p-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold" style={{ background: "rgba(ACCENT,0.15)", color: ACCENT }}>
          {step.number}
        </div>
        <h3 className="heading-md text-white mb-3">{step.title}</h3>
        <p className="text-white/55 text-sm leading-relaxed">{step.body}</p>
      </div>
    ))}
  </div>
</div>
```

### Stats Strip — accent dividers, large numbers
```tsx
<div className="text-center flex flex-col items-center gap-2">
  <div className="accent-line" />    {/* 3px accent-coloured bar */}
  <p className="heading-lg" style={{ color: PRIMARY }}>{stat.value}</p>
  <p className="text-gray-500 text-sm">{stat.label}</p>
</div>
```

### FAQ — two-column, accordion on right
```tsx
<div className="grid lg:grid-cols-5 gap-16 items-start">
  <div className="lg:col-span-2">
    <span className="eyebrow-dark">FAQ</span>
    <h2 className="heading-lg mt-4 mb-4">Everything you need to know</h2>
    <p className="text-gray-500 mb-8">...</p>
    <a href="#lead-form" className="btn-primary inline-flex px-7 py-3.5">Book Now <ArrowRight size={15} /></a>
  </div>
  <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-2">
    {faqItems.map((item) => <FAQItem key={item.q} {...item} />)}
  </div>
</div>
```

### Section Background Rotation (use extracted brand colours)
```
Hero           → DARK_BG (primary dark)
ServiceTrustBar → DARK_BG slightly lighter variant
Problem        → LIGHT_BG
Benefits       → WHITE
Testimonials   → LIGHT_BG
HowItWorks     → DARK_BG (glassmorphism cards)
Stats          → WHITE (large numbers in PRIMARY colour)
Comparison     → LIGHT_BG
PullQuote      → DARK_BG variant
FAQ            → WHITE
TLDR           → DARK_BG
LeadForm       → LIGHT_BG (white card inside)
Footer         → DARK_BG
```

---

## STEP 6 — SHARED COMPONENT: ServiceTrustBar

Build at `src/components/shared/ServiceTrustBar.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Star, Briefcase, Shield, Clock } from "lucide-react";

const stats = [/* from design.json trustSignals */];

export default function ServiceTrustBar() {
  return (
    <section style={{ backgroundColor: DARK_BG_LIGHTER, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="container-base py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} /* stagger animation */ className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(ACCENT, 0.15)" }}>
                <stat.icon size={16} style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none mb-0.5">{stat.value}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## STEP 7 — SHARED COMPONENT: ComparisonTable

Build at `src/components/shared/ComparisonTable.tsx`:

Card-based (NOT HTML `<table>`). Three columns: first two on white/light bg, featured column in PRIMARY colour with ACCENT border. Featured badge pill at top.

```tsx
"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
// ... card grid, not table rows
```

---

## STEP 8 — next/font SETUP IN LAYOUT

In `src/app/layout.tsx` (Server Component):

```tsx
import { [HeadingFont], [BodyFont], Inter } from "next/font/google";

const headingFont = [HeadingFont]({ subsets: ["latin"], variable: "--font-heading" });
const bodyFont = [BodyFont]({ subsets: ["latin"], variable: "--font-body" });
const inter = Inter({ subsets: ["latin"], variable: "--font-ui" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

JSON-LD schemas go in layout.tsx (NOT in page.tsx, which is a client component):
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
```

**NEVER** use `<Script strategy="beforeInteractive">` in a `"use client"` file — it will fail.

---

## STEP 9 — SEO METADATA (in layout.tsx or a layout file)

```tsx
export const metadata: Metadata = {
  title: `${OFFER_HEADLINE} | ${BUSINESS_NAME}`,   // ≤60 chars
  description: `${benefit-focused, includes TARGET_KW}`, // ≤160 chars
  openGraph: {
    title: metadata.title,
    description: metadata.description,
    url: `https://[domain]/${SLUG}`,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `https://[domain]/${SLUG}` },
}
```

**SEO parameters to enforce:**
- TARGET_KW in H1
- TARGET_KW in first paragraph of ProblemSection
- TARGET_KW in at least 2 H2s
- TARGET_KW in meta description
- All images have descriptive `alt` text
- Page slug matches TARGET_KW (kebab-case)

---

## STEP 10 — API ROUTE + THANK YOU PAGE

### `src/app/api/contact/route.ts`
```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body._honey) return NextResponse.json({ ok: true }); // honeypot
  if (!body.name || !body.email) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  // TODO: forward to CRM / email
  console.log("Lead:", body);
  return NextResponse.json({ ok: true });
}
```

### `src/app/thank-you/page.tsx`
```tsx
export const metadata = { robots: { index: false, follow: false } };

export default function ThankYou() {
  return (
    <main style={{ backgroundColor: PRIMARY_DARK, minHeight: "100vh" }} className="flex items-center justify-center">
      {/* Confirmation message */}
    </main>
  );
}
```

---

## STEP 11 — MOBILE STICKY CTA BAR

```tsx
const [showBar, setShowBar] = useState(false);
useEffect(() => {
  const fn = () => setShowBar(window.scrollY > window.innerHeight * 0.5);
  window.addEventListener("scroll", fn);
  return () => window.removeEventListener("scroll", fn);
}, []);

<AnimatePresence>
  {showBar && (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{ backgroundColor: ACCENT, boxShadow: "0 -4px 24px rgba(0,0,0,0.18)" }}
    >
      <a href="#lead-form" className="flex items-center justify-center gap-2 font-bold py-4 text-base" style={{ color: PRIMARY }}>
        {CTA} <ArrowRight size={16} />
      </a>
      <p className="text-center text-xs pb-3" style={{ color: `rgba(PRIMARY_RGB, 0.5)` }}>{BOOSTER_LINE}</p>
    </motion.div>
  )}
</AnimatePresence>
```

---

## STEP 12 — next.config.ts

If the website uses remote images, configure `remotePatterns` with **object syntax** (NOT `new URL()`):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

For ngrok dev tunnel access, add:
```ts
allowedDevOrigins: ["your-ngrok-subdomain.ngrok-free.app"],
```

---

## STEP 13 — BUILD LOOP (per file)

```
generate(file)
→ npx tsc --noEmit
→ if error: fixImmediately() before proceeding
→ updateState() → write to .claude/state.json
```

---

## STEP 14 — VALIDATION AGENT

After the page is built, run every check. Fix failures before marking done.

```
□ npx tsc --noEmit → 0 errors required
□ CRO 9/9 — all 9 hacks present and correct
□ CTA booster line under every button
□ ServiceTrustBar in first 3 sections
□ Eyebrow pill tag (not ■ prefix) on every section
□ Two-column hero with glass inline form present
□ Stats strip on white bg with accent dividers
□ FAQ two-column layout
□ Lead form in white card on light-bg section
□ Sticky mobile CTA bar with AnimatePresence
□ "use client" at top of page file
□ JSON-LD scripts in layout.tsx (NOT page.tsx)
□ generateMetadata in layout.tsx
□ Meta title ≤60 chars
□ Meta description ≤160 chars
□ Lead form has honeypot field
□ next/image has sizes prop or plain <img> for non-critical
□ TARGET_KW in H1, first paragraph, ≥2 H2s
□ Minimal header — no nav links, logo + single CTA only
□ Logo downloaded to /public/logo.png
□ All brand colours match scraped website exactly
□ No text-4xl/5xl/6xl heading classes (use .heading-display/.heading-lg/.heading-md)
□ No Framer Motion ease arrays on inline transitions — use Variants type
```

Output: `CRO score: 9/9 hacks ✅` before marking done.

---

## STEP 15 — STATE + ROUTES UPDATE

```json
// .claude/state.json additions:
{
  "landingPagesBuilt": [...existing, "[SLUG]"],
  "pagesBuilt": [...existing, "/[SLUG]"],
  "sourceWebsite": "[SCRAPED_URL]"
}
```

```json
// .claude/routes.json — add entry:
{
  "route": "/[SLUG]",
  "file": "src/app/[SLUG]/page.tsx",
  "type": "landing",
  "purpose": "[PAGE_PURPOSE]",
  "offer": "[OFFER_HEADLINE]",
  "target_kw": "[TARGET_KW]",
  "source_website": "[URL]",
  "built": true
}
```

---

## DELIVERY CHECKLIST

```
□ npx tsc --noEmit — 0 errors
□ CRO score: 9/9 hacks present
□ Brand colours match existing website exactly (scraped, not guessed)
□ Logo and hero image downloaded from existing website
□ Two-column hero with glassmorphism inline form
□ ServiceTrustBar in sections 1–3
□ Eyebrow pill tag on every section (no ■ prefix)
□ Stats on white bg with accent dividers
□ FAQ two-column layout
□ Lead form in white card on light bg
□ Sticky mobile CTA bar (scroll-triggered, AnimatePresence)
□ CTA booster under every button
□ Minimal header — logo + single CTA only
□ JSON-LD schemas in layout.tsx
□ Meta title ≤60 chars, description ≤160 chars
□ Honeypot field in form
□ routes.json + state.json updated
□ Thank-you page with noindex
```

---

## GUARDRAILS

**❌ HARD FAIL — stop and report:**
- `npx tsc --noEmit` returns any errors
- Framer Motion `ease: [...]` array on inline motion component (use Variants)
- `<Script strategy="beforeInteractive">` in a `"use client"` file
- `new URL("https://...")` inside `remotePatterns` (use object syntax)
- Brand colours not matching scraped website
- Any CTA button missing its booster line
- ServiceTrustBar missing
- `■` prefix on eyebrows (use pill tag only)
- `.env` file attempted to be written
- `git push` command attempted

**⚠️ WARN AND FIX IMMEDIATELY:**
- Section missing eyebrow span
- Generic agency copy detected ("passionate about", "dedicated team", "we strive to")
- `ComparisonTable` built as `<table>` HTML
- `next/image` missing `sizes` prop
- Nav links in header or footer of landing page
- Stats section on dark bg (must be white bg with large primary-colour numbers)
- Hero form inputs with opacity < 0.14 background (will look faded)
