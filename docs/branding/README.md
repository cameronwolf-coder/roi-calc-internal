# Truv Brand Guidelines

Official brand assets and guidelines for Truv. This folder contains everything needed to represent the Truv brand consistently across all touchpoints.

## Quick Start

- **Logo files:** `logos/` directory
- **Font files:** `fonts/` directory
- **Color palette:** `colors/` directory

## Table of Contents

1. [Logo Usage](#logo-usage)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Clear Space](#spacing--clear-space)
5. [Usage Guidelines](#usage-guidelines)
6. [File Formats](#file-formats)

---

## Logo Usage

### Primary Logo

The Truv wordmark is the primary logo. Use it whenever possible.

| File | Use Case |
|------|----------|
| `logos/logo-truv.svg` | Default, use on light backgrounds |
| `logos/logo-truv-white.svg` | Dark backgrounds, photography |
| `logos/logo-truv-dark.svg` | When primary blue isn't suitable |

### Logomark (Icon)

Use the logomark when space is limited or the full wordmark won't reproduce well.

| File | Use Case |
|------|----------|
| `logos/logomark.svg` | App icons, favicons, small spaces |
| `logos/logomark-white.svg` | Dark backgrounds |
| `logos/logomark-dark.svg` | Alternate dark version |

### Minimum Size

- **Wordmark:** 60px wide minimum (digital), 0.75" (print)
- **Logomark:** 24px wide minimum (digital), 0.25" (print)

### Clear Space

Maintain clear space around the logo equal to the height of the "t" in Truv. No other elements should enter this zone.

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary Blue** | `#2C64E3` | 44, 100, 227 | Buttons, links, CTAs, brand moments |
| **Dark Blue** | `#0F1C47` | 15, 28, 71 | Headers, dark sections, emphasis |

### Neutral Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Black** | `#171717` | 23, 23, 23 | Body text, primary content |
| **Grey** | `#F4F4F2` | 244, 244, 242 | Backgrounds, cards, containers |
| **White** | `#FFFFFF` | 255, 255, 255 | Backgrounds, text on dark |

### Accent Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Light Blue** | `#C5D9F7` | 197, 217, 247 | Secondary backgrounds, highlights |
| **Error Red** | `#F47F7F` | 244, 127, 127 | Error states, destructive actions |

### Color Files

- `colors/truv-palette.ase` - Import into Adobe Creative Suite
- `colors/truv-palette.css` - CSS custom properties for web

---

## Typography

### Primary Typeface: Gilroy

Gilroy is a modern geometric sans-serif that conveys clarity and professionalism.

| Weight | File | Usage |
|--------|------|-------|
| **Medium (500)** | `fonts/Gilroy-Medium.woff2` | Body text, paragraphs, UI elements |
| **SemiBold (600)** | `fonts/Gilroy-SemiBold.woff2` | Headings, buttons, emphasis |

### Type Scale (Recommended)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 48px | SemiBold | 1.2 |
| H2 | 36px | SemiBold | 1.25 |
| H3 | 24px | SemiBold | 1.3 |
| H4 | 20px | SemiBold | 1.4 |
| Body | 16px | Medium | 1.5 |
| Small | 14px | Medium | 1.5 |

### Fallback Stack

```css
font-family: "Gilroy", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Font Files

See `fonts/README.md` for licensing information and web embedding instructions.

---

## Spacing & Clear Space

### Logo Clear Space

The minimum clear space around any logo is equal to the x-height of the wordmark (the height of the lowercase letters). This ensures the logo has room to breathe.

### Grid Unit

Use an 8px base grid for layouts. Common spacing values:

- **4px** - Tight spacing (icon padding, inline elements)
- **8px** - Compact spacing (related elements)
- **16px** - Default spacing (between components)
- **24px** - Comfortable spacing (section padding)
- **32px** - Generous spacing (major sections)
- **48px / 64px** - Large spacing (page sections)

---

## Usage Guidelines

### Do

- Use approved logo files only—never recreate the logo
- Maintain clear space requirements
- Use brand colors for primary UI elements
- Ensure sufficient contrast for accessibility

### Don't

- Stretch, rotate, or distort the logo
- Add effects (shadows, gradients, outlines) to the logo
- Place the logo on busy backgrounds without sufficient contrast
- Use unapproved colors for the logo
- Retype the wordmark in any font

---

## File Formats

| Format | Use Case |
|--------|----------|
| `.svg` | Web, digital, any size—preferred format |
| `.png` | When SVG isn't supported, social media |
| `.woff2` | Web fonts (best compression) |
| `.woff` | Web fonts (broader compatibility) |
| `.ase` | Adobe Creative Suite color import |
| `.css` | Web development |
