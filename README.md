# Viktória & Sebastián — Wedding Invitation

A beautiful, cinematic wedding invitation web app built with React, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **React 18** + **Vite 6**
- **Tailwind CSS** with custom design tokens (Ephemeral Garden theme)
- **Framer Motion** for cinematic scroll animations
- **shadcn/ui** component primitives (Radix UI)
- **Google Fonts**: Cormorant Garamond, Montserrat, Great Vibes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    wedding/      # All wedding page sections
    ui/           # shadcn/ui component library
  pages/
    Home.jsx      # Main page composing all sections
  lib/
    utils.js
    PageNotFound.jsx
  hooks/
  index.css       # Design tokens & global styles
  App.jsx
  main.jsx
```

## Design Tokens

All colors, fonts, and spacing are defined as CSS custom properties in `src/index.css` under the `Ephemeral Garden` theme. The gold accent color is `#B1945F`, body background is `#FDFBF7` (soft ivory), and the primary typeface stack uses Cormorant Garamond for headings and Montserrat for body text.
