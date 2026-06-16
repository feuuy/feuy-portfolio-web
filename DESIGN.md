---
name: FEUY Portfolio
description: A calm, credibility-first portfolio system with precise hierarchy and a restrained moss-and-ember palette.
colors:
  moss-mark: "oklch(0.56 0.11 142)"
  ember-signal: "oklch(0.58 0.14 38)"
  architectural-white: "oklch(1 0 0)"
  mist-surface: "oklch(0.97 0.01 142)"
  graphite-ink: "oklch(0.23 0.02 152)"
  lichen-muted: "oklch(0.52 0.015 152)"
  line-soft: "oklch(0.9 0.01 142)"
typography:
  display:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(3.25rem, 8vw, 5.75rem)"
    fontWeight: 650
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  headline:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
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
    textColor: "{colors.architectural-white}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.architectural-white}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-ghost:
    backgroundColor: "{colors.architectural-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  card-default:
    backgroundColor: "{colors.mist-surface}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  input-default:
    backgroundColor: "{colors.architectural-white}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: FEUY Portfolio

## 1. Overview

**Creative North Star: "The Quiet Benchmark"**

This system is built for a portfolio where trust is earned by precision, not by spectacle. The visual language should feel composed on first contact: strong hierarchy, generous white space, and a rare but disciplined use of color that makes the work feel considered instead of trendy. The reference mood is a pure white workspace with a moss-colored signature and a small ember accent that appears only when it matters.

The current implementation in code is still a stock Payload starter, so this document defines the intended system the project should converge toward. It rejects generic SaaS scaffolding, metrics-led heroes, default gradients, editorial-serif portfolio mannerisms, and decorative flourishes that make the page feel styled before it feels trustworthy.

**Key Characteristics:**
- Clear, high-contrast hierarchy with little visual noise
- Pure white architecture with restrained tonal surfaces
- Moss as the primary brand signal, ember as the selective counterpoint
- Sans-first typography with confidence carried by scale and spacing, not by novelty fonts
- Flat-by-default surfaces that rely on borders and tone before shadow

## 2. Colors

The palette is bright, quiet, and exacting: a pure white field, a botanical green primary, and a controlled ember accent that is used sparingly enough to retain meaning.

### Primary
- **Moss Mark** (`oklch(0.56 0.11 142)`): The main brand color for primary actions, key links, small badges, and short moments of emphasis. It should feel like a signature, not a wash.

### Secondary
- **Ember Signal** (`oklch(0.58 0.14 38)`): A selective counterpoint reserved for status marks, hover details, active filters, and small moments where warmth clarifies attention.

### Neutral
- **Architectural White** (`oklch(1 0 0)`): The dominant page field. This stays truly white so the brand colors carry the personality instead of the background doing it by default.
- **Mist Surface** (`oklch(0.97 0.01 142)`): Soft panel and section surface for grouped content, callouts, and cards that need separation without feeling boxed in.
- **Graphite Ink** (`oklch(0.23 0.02 152)`): Default text and strong UI lines. This is dark enough to sustain WCAG-first reading comfort against the white field.
- **Lichen Muted** (`oklch(0.52 0.015 152)`): Secondary text, metadata, helper copy, and supporting UI labels that still need strong readability.
- **Line Soft** (`oklch(0.9 0.01 142)`): Hairlines, dividers, input strokes, and low-emphasis boundaries.

### Named Rules
**The One Accent At A Time Rule.** Moss and ember should almost never compete in the same local component. If a module uses ember, moss steps back to text or outline duty.

## 3. Typography

**Display Font:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
**Body Font:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
**Label/Mono Font:** None by default. Labels use the same sans family with weight and spacing changes instead of a reflexive mono pairing.

**Character:** Typography should feel direct, contemporary, and unforced. The system avoids editorial drama and uses a single sans family with committed scale contrast, tight but safe display spacing, and calm body rhythm.

### Hierarchy
- **Display** (650, `clamp(3.25rem, 8vw, 5.75rem)`, 0.96): Hero headlines and major opening statements only. Always balanced and never allowed to feel bloated or shouty.
- **Headline** (600, `clamp(2rem, 4vw, 3.25rem)`, 1.02): Section-leading statements, project titles, and high-priority content group headings.
- **Title** (600, `1.125rem`, 1.3): Card titles, capability headings, nav titles, and smaller structured moments.
- **Body** (400, `1rem`, 1.65): Primary reading copy. Long text should stay within roughly 65 to 75 characters per line.
- **Label** (600, `0.75rem`, 0.04em, uppercase optional): Metadata, navigation support labels, timestamps, and compact UI controls. Use sparingly, not as repeated section scaffolding.

### Named Rules
**The No Costume Typography Rule.** Do not introduce a serif, mono, or novelty face just to signal taste. Hierarchy must come from scale, spacing, and weight first.

## 4. Elevation

This system is flat by default. Depth comes first from white-space, tonal separation, and line work rather than floating cards. Shadows are structural, not decorative: used only to clarify focus, hover, or transient overlays.

### Shadow Vocabulary
- **Focus Lift** (`box-shadow: 0 0 0 3px color-mix(in oklab, white 30%, transparent), 0 0 0 6px color-mix(in oklab, oklch(0.56 0.11 142) 35%, transparent)`): Reserved for keyboard focus and deliberate interactive emphasis.
- **Hover Lift** (`box-shadow: 0 12px 32px rgba(22, 32, 26, 0.08)`): Used on selective hoverable panels or project previews when an element needs to feel active, never as a default resting state.

### Named Rules
**The Flat-At-Rest Rule.** If a surface is not being interacted with, it should usually be separated by tone or border, not by ambient shadow.

## 5. Components

### Buttons
- **Shape:** Controlled corners (`8px`) with a compact, deliberate silhouette.
- **Primary:** Moss fill with white text, `14px 22px` padding, semibold label rhythm, and no oversized pill treatment.
- **Hover / Focus:** Hover can deepen toward graphite or tighten toward a darker moss; focus uses the explicit ring system from Elevation rather than a browser-default blue.
- **Secondary / Ghost / Tertiary:** Ghost buttons stay white with graphite text and a `1px` soft line border. Ember should appear in button systems only when the interaction semantics genuinely need extra urgency.

### Cards / Containers
- **Corner Style:** Calm rounding (`14px`) for grouped content; larger radii (`24px`) only on major sectional containers.
- **Background:** Default to white or mist-surface. Avoid stacked card-in-card compositions.
- **Shadow Strategy:** Flat at rest; optional hover lift only for interactive previews.
- **Border:** Prefer `1px` line-soft boundaries over accent stripes or heavy outlines.
- **Internal Padding:** `24px` as the default comfortable container step, increasing to `40px` in major sections.

### Inputs / Fields
- **Style:** White field, graphite text, `1px` line-soft stroke, `8px` radius, and steady internal padding (`14px 16px`).
- **Focus:** Moss-led focus ring, not just a border-color flip.
- **Error / Disabled:** Error states should use ember with text and icon reinforcement; disabled states reduce contrast but remain legible.

### Navigation
- **Style, typography, default/hover/active states, mobile treatment:** Navigation should read as crisp and lightweight, with body or label-sized type, strong active contrast, and enough spacing to avoid crowded clusters. Mobile navigation should feel intentional rather than collapsed desktop chrome.

### Signature Component
The portfolio project preview is the signature component. It should combine strong title hierarchy, concise framing copy, and one decisive visual or metadata accent without falling into repeated equal-weight feature cards.

## 6. Do's and Don'ts

### Do:
- **Do** keep body text at `oklch(0.23 0.02 152)` on `oklch(1 0 0)` or equivalent contrast-safe pairings.
- **Do** use moss as the dominant action color and keep ember rare enough to feel intentional.
- **Do** let spacing and type scale establish authority before adding panels, borders, or effects.
- **Do** keep long-form text to a readable measure of roughly `65ch` to `75ch`.
- **Do** use reduced-motion fallbacks for all non-trivial transitions and entrances.

### Don't:
- **Don't** ship generic SaaS patterns like metric heroes, templated gradient headers, or interchangeable startup CTA blocks.
- **Don't** drift into editorial-serif portfolio signals, magazine minimalism, or art-school presentation tropes.
- **Don't** use side-stripe accents, gradient text, decorative glass cards, or repeated tiny uppercase section eyebrows.
- **Don't** place moss and ember at equal visual weight inside the same local module unless contrast of meaning demands it.
- **Don't** default to ambient shadows for every card or section; flat-by-default is part of the system's credibility.
