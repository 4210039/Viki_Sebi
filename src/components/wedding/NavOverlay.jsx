import React, { useState, useEffect } from "react";

const CHAPTERS = [
  { n: "01", title: "Prah", id: "threshold" },
  { n: "02", title: "Náš príbeh", id: "story" },
  { n: "03", title: "Cesta", id: "timeline" },
  { n: "04", title: "Deň", id: "schedule" },
  { n: "05", title: "Obrad a hostina", id: "venues" },
  { n: "06", title: "Pre nocľah", id: "travel" },
  { n: "07", title: "Archív", id: "gallery" },
  { n: "08", title: "Odpoveď", id: "rsvp" },
  { n: "09", title: "Sprievodca", id: "faq" },
  { n: "10", title: "Požehnanie", id: "closing" }
];

export default function NavOverlay() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      // scrollIntoView honors each section's scroll-margin-top, so chapters
      // that visually overlap the section above (negative top margin used
      // for the organic image transition) still land exactly on their own
      // image + overlay text, not mid-overlap.
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed top-6 right-6 z-40 flex items-center gap-2 transition-all duration-700
          ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
        aria-label="Otvoriť obsah"
      >
        <span className="h-2 w-2 rotate-45 bg-gold/80" aria-hidden="true" />
        <span className="eyebrow !text-gold">Obsah</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-eucalyptus/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full sm:w-[440px] bg-champagne shadow-2xl flex flex-col animate-ribbon-in overflow-y-auto">
            <div className="flex items-center justify-between px-10 pt-8">
              <span className="eyebrow">Kapitoly</span>
              <button onClick={() => setOpen(false)} className="text-eucalyptus/70 hover:text-gold transition"
                aria-label="Zavrieť">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="px-10 mt-4"><div className="gold-rule w-full" /></div>
            <nav className="flex-1 flex flex-col justify-center gap-1 px-10 py-10">
              {CHAPTERS.map((c) => (
                <button key={c.id} onClick={() => go(c.id)}
                  className="group flex items-baseline gap-5 py-2 text-left border-b border-gold/20 hover:border-gold/60 transition-colors">
                  <span className="font-body text-[0.65rem] tracking-[0.3em] text-gold/70">{c.n}</span>
                  <span className="font-display text-2xl text-eucalyptus group-hover:italic group-hover:text-gold transition-all duration-500">
                    {c.title}
                  </span>
                </button>
              ))}
            </nav>
            <div className="px-10 pb-10 text-center">
              <p className="font-script text-3xl text-gold">Viktória &amp; Sebastián</p>
              <p className="eyebrow mt-2">12 · IX · MMXXVI</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}