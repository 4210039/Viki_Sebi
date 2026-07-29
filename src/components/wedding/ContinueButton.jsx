import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "./motion";
import { scrollToSection } from "@/lib/scrollNav";

/**
 * The "Pokračovať" (continue) control — the single guided-path affordance
 * that appears at the foot of every chapter and smoothly advances the
 * visitor to the next one. One component, one scroll behavior
 * (scrollToSection), reused by every section so there is exactly one
 * place that defines what "continue" does on this site.
 *
 * variant="overlay" (default) — absolutely centered over a full-bleed
 *   pinned chapter (Hero, OurStory, CeremonyReception, Schedule). Pass
 *   the section's own scroll-linked `style` (e.g. `{ opacity: fade }`)
 *   so it fades in on the same choreography already driving everything
 *   else in that section.
 *
 * variant="inline" — sits in the normal document flow at the bottom of a
 *   static content chapter (Timeline, Travel, Gallery, RSVP, FAQ), with
 *   its own gentle Reveal-on-scroll entrance — the same entrance already
 *   used for other content in those sections.
 */
export default function ContinueButton({
  nextId,
  label = "Pokračovať",
  ariaLabel,
  variant = "overlay",
  style,
  className = "",
}) {
  const handleClick = () => scrollToSection(nextId);
  const a11yLabel = ariaLabel || label;

  const arrow = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  );

  if (variant === "inline") {
    return (
      <Reveal className={`flex justify-center mt-16 sm:mt-20 ${className}`}>
        <button
          onClick={handleClick}
          className="group flex flex-col items-center gap-2 text-gold animate-breathe"
          aria-label={a11yLabel}
        >
          <span className="eyebrow !text-[0.6rem]">{label}</span>
          {arrow}
        </button>
      </Reveal>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      style={style}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gold animate-breathe ${className}`}
      aria-label={a11yLabel}
    >
      <span className="eyebrow !text-[0.6rem]">{label}</span>
      {arrow}
    </motion.button>
  );
}
