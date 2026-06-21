---
name: FEUY Portfolio
description: A dark, dramatic portfolio system with bold hierarchy, cinematic atmosphere, and high-contrast typography.
colors:
  moss-mark: "oklch(0.65 0.18 45)"
  ember-signal: "oklch(0.6 0.12 250)"
  architectural-white: "oklch(0.95 0.01 80)"
  mist-surface: "oklch(0.12 0.02 280)"
  graphite-ink: "oklch(0.08 0 0)"
  lichen-muted: "oklch(0.45 0.03 280)"
  line-soft: "oklch(0.2 0.02 280)"
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(3rem, 10vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "24px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.moss-mark}"
    textColor: "{colors.graphite-ink}"
    rounded: "9999px"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.architectural-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "9999px"
    padding: "16px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.architectural-white}"
    rounded: "9999px"
    padding: "16px 32px"
  card-default:
    backgroundColor: "{colors.mist-surface}"
    textColor: "{colors.architectural-white}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-default:
    backgroundColor: "{colors.mist-surface}"
    textColor: "{colors.architectural-white}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: FEUY Portfolio

## 1. Overview

**Creative North Star: "The Dark Stage"**

This system is built for a portfolio that commands attention through dramatic contrast, bold typography, and cinematic atmosphere. The visual language is unapologetically dark: deep void backgrounds, massive display type, and selective warm accents that feel like spotlights on a stage. The reference mood is a midnight workspace with a single warm lamp — intimate, focused, and intense.

The design rejects generic SaaS scaffolding, metrics-led heroes, and timid minimalism. It embraces the dark, the dramatic, and the bold while maintaining production-grade credibility and accessibility.

**Key Characteristics:**
- Deep void-black backgrounds with high-contrast bone-white typography
- Dramatic scale contrast: massive display headings against measured body text
- Warm amber/orange accent as the primary brand signal
- Asymmetric compositions and full-bleed sections
- Cinematic entrance animations and purposeful motion
- Flat surfaces with subtle borders, no ambient shadows

## 2. Colors

The palette is dark, dramatic, and precise: a void-black field, a warm amber primary accent, and controlled muted tones for hierarchy.

### Primary
- **Moss Mark** (`oklch(0.65 0.18 45)`): A warm amber-orange for primary actions, labels, and key moments of emphasis. Feels like a spotlight in the dark.

### Secondary
- **Ember Signal** (`oklch(0.6 0.12 250)`): A cool steel-blue counterpoint reserved for subtle hover states, secondary indicators, and variety.

### Neutral
- **Architectural White** (`oklch(0.95 0.01 80)`): Warm off-white for primary text and headings. High contrast against the dark field without the harshness of pure white.
- **Mist Surface** (`oklch(0.12 0.02 280)`): Dark charcoal surface for cards, panels, and grouped content. Nearly black but with subtle tonal variation.
- **Graphite Ink** (`oklch(0.08 0 0)`): The dominant void-black page background. True dark with no hue cast.
- **Lichen Muted** (`oklch(0.45 0.03 280)`): Secondary text, metadata, and supporting labels. Dark enough to recede but light enough for WCAG AA on black.
- **Line Soft** (`oklch(0.2 0.02 280)`): Hairlines, dividers, and boundaries at very low opacity.

### Named Rules
**The One Accent At A Time Rule.** Amber and steel-blue should almost never compete in the same local component. If a module uses blue, amber steps back.

## 3. Typography

**Display Font:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
**Body Font:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Character:** Typography is bold, direct, and cinematic. The system uses a single geometric sans family with extreme scale contrast, tight display spacing, and confident body rhythm.

### Hierarchy
- **Display** (700, `clamp(3rem, 10vw, 7.5rem)`, 0.9): Hero headlines at dramatic scale. Tight tracking, bold weight, unapologetic presence.
- **Headline** (700, `clamp(2.5rem, 5vw, 4.5rem)`, 0.95): Section headings with strong visual authority.
- **Title** (600, `1.25rem`, 1.3): Card titles and smaller headings.
- **Body** (400, `1.125rem`, 1.6): Primary reading copy. Larger than standard for comfort on dark backgrounds.
- **Label** (600, `0.75rem`, 0.12em, uppercase): Metadata, navigation, and compact UI. Wide tracking for dramatic effect.

## 4. Elevation

This system is flat by default even in dark mode. Depth comes from tonal separation, border opacity, and scale contrast rather than shadows.

### Shadow Vocabulary
- **Focus Lift** (`box-shadow: 0 0 0 2px color-mix(in oklab, oklch(0.65 0.18 45) 50%, transparent)`): Warm amber focus ring for keyboard navigation.
- **Hover Lift**: No shadow — use border opacity increase and subtle background shift instead.

## 5. Components

### Buttons
- **Shape:** Pill-shaped (`9999px`) for a modern, bold silhouette.
- **Primary:** Amber fill with dark text, generous padding (`16px 32px`), semibold weight.
- **Hover / Focus:** Scale transform (`1.05`) and focus ring with warm amber.
- **Secondary / Ghost:** Transparent with white text and subtle border. Hover increases border opacity and adds background tint.

### Cards / Containers
- **Corner Style:** Large rounding (`24px`) for grouped content.
- **Background:** Dark charcoal (`mist-surface`) with subtle transparency.
- **Border:** `1px` at low opacity (`line-soft/40`). Hover increases to `line-soft/80`.
- **Shadow Strategy:** None. Flat surfaces only.

### Navigation
- **Style:** Minimal header with blurred backdrop (`backdrop-blur-xl`).
- **Typography:** Uppercase logo/brand mark with wide tracking, medium-weight nav links.
- **Active States:** Text color shift to white, subtle underline or color change.

## 6. Motion

- **Hero Reveal:** Staggered entrance with blur-to-sharp text reveal, vertical slide, and exponential easing.
- **Scroll Indicators:** Animated glow pulse on vertical lines.
- **Reduced Motion:** All animations collapse to instant state changes; content remains visible.

## 7. Do's and Don'ts

### Do:
- **Do** use the dark background as the dominant canvas; let it create the atmosphere.
- **Do** make headings dramatically large — they should feel impossible to ignore.
- **Do** use amber as a warm spotlight against the void; keep it selective and precious.
- **Do** use asymmetric layouts and generous whitespace for dramatic pacing.
- **Do** respect reduced-motion preferences with instant fallbacks.

### Don't:
- **Don't** use light backgrounds or revert to white sections — commit to the dark.
- **Don't** use generic SaaS patterns: metric heroes, gradient headers, or interchangeable CTA blocks.
- **Don't** use side-stripe accents, gradient text, or decorative glass effects.
- **Don't** make everything the same size — scale contrast is the primary design tool.
- **Don't** use ambient shadows; flat surfaces are part of the dark aesthetic.
