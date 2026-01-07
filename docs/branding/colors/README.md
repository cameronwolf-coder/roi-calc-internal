# Truv Color Palette

This folder contains the official Truv brand colors in multiple formats.

## Files

| File | Format | Usage |
|------|--------|-------|
| `truv-palette.css` | CSS Custom Properties | Web development |
| `truv-palette.ase` | Adobe Swatch Exchange | Adobe Creative Suite |

## Color Reference

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Blue | `#2C64E3` | 44, 100, 227 | Buttons, links, CTAs |
| Dark Blue | `#0F1C47` | 15, 28, 71 | Headers, dark sections |

### Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Black | `#171717` | 23, 23, 23 | Body text |
| Grey | `#F4F4F2` | 244, 244, 242 | Backgrounds, cards |
| White | `#FFFFFF` | 255, 255, 255 | Backgrounds |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Light Blue | `#C5D9F7` | 197, 217, 247 | Secondary backgrounds |
| Error Red | `#F47F7F` | 244, 127, 127 | Error states |

## Importing

### CSS

Include the CSS file or copy the variables:

```css
@import 'branding/colors/truv-palette.css';

/* Then use variables */
.button {
  background-color: var(--truv-primary-blue);
}
```

### Adobe Creative Suite

1. Open the Swatches panel
2. Click the panel menu (hamburger icon)
3. Select "Open Swatch Library" > "Other Library..."
4. Navigate to `truv-palette.ase`

## Accessibility

When using colors, ensure sufficient contrast ratios:

- **Primary Blue on White:** 4.5:1 (AA compliant for normal text)
- **Dark Blue on White:** 12.6:1 (AAA compliant)
- **Black on Grey:** 12.8:1 (AAA compliant)
- **White on Primary Blue:** 4.5:1 (AA compliant)
- **White on Dark Blue:** 12.6:1 (AAA compliant)
