/**
 * Single implementation of "scroll to a chapter" for the whole site.
 * Both the "Obsah" navigation panel and every section's "Pokračovať"
 * control call this — so there is exactly one place that defines what
 * smooth, correctly-offset chapter navigation means here.
 *
 * scrollIntoView (rather than a manual offset calculation) is used
 * deliberately: any section that visually overlaps the one above it
 * (a few chapters use a negative top margin for the soft image
 * transition) already declares a compensating `scroll-margin-top` in
 * its own CSS, so this one call lands correctly everywhere without
 * needing to know about that per-section quirk.
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
