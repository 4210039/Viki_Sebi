/**
 * SINGLE SOURCE OF TRUTH for every image used on the site.
 *
 * All image filenames are ImageKit-served assets (see src/components/ui/image.jsx),
 * referenced by bare filename (e.g. "01.png"). To swap or update an image anywhere
 * on the site, change its value here — nowhere else in the codebase should contain
 * a literal image filename.
 *
 * Keys are named after where/how the image is used, not after the filename, so
 * usage stays readable at the call site (e.g. `images.hero`, `images.ceremony`).
 */
export const images = {
  hero: "01.png",             // Hero — full-bleed floral hero background
  story: "05.png",            // OurStory — pinned portrait
  timelineDetail: "02.png",   // Timeline — single rose detail shot
  scheduleTable: "03.png",    // Schedule — floral table background
  ceremony: "10.png",         // CeremonyReception — church panel
  reception: "11.png",        // CeremonyReception — orangery panel
  castleDetail: "07.png",     // Travel (accommodation detail) & Gallery (castle) — same asset, reused
  galleryVeil: "08.png",      // Gallery — silk & roses
  galleryBouquet: "06.png",   // Gallery — bridal bouquet
  galleryHills: "09.png",     // Gallery — hills
  closingSunset: "12.png",    // Closing — golden hour
  rsvpBouquet: "04.png",      // RSVP — floral bouquet
};
