/**
 * Single source of truth for the site's chapter order and labels — the
 * same list drives the "Obsah" menu, its active-chapter highlighting, and
 * (indirectly, via each section's own `nextId`) the guided "Pokračovať"
 * path through the story.
 */
export const CHAPTERS = [
  { n: "01", title: "Prah", id: "threshold" },
  { n: "02", title: "Náš príbeh", id: "story" },
  { n: "03", title: "Cesta", id: "timeline" },
  { n: "04", title: "Deň", id: "schedule" },
  { n: "05", title: "Obrad a hostina", id: "venues" },
  { n: "06", title: "Pre nocľah", id: "travel" },
  { n: "07", title: "Archív", id: "gallery" },
  { n: "08", title: "Odpoveď", id: "rsvp" },
  { n: "09", title: "Sprievodca", id: "faq" },
  { n: "10", title: "Požehnanie", id: "closing" },
];
