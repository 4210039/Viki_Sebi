import React, { useState, useEffect, useRef } from "react";
import { CHAPTERS } from "@/config/chapters";
import { scrollToSection } from "@/lib/scrollNav";

export default function NavOverlay() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(CHAPTERS[0].id);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which chapter is currently in view so the open "Obsah" panel
  // can highlight real scroll position, not just the last-clicked item.
  useEffect(() => {
    const sections = CHAPTERS
      .map((c) => document.getElementById(c.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick whichever observed section currently has the largest share
        // of the viewport — the natural definition of "currently active".
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (b.intersectionRatio > a.intersectionRatio ? b : a));
        setActiveId(top.target.id);
      },
      // A band centered on the viewport: a section only counts once it's
      // crossed into the middle of the screen, matching how a visitor
      // actually perceives "which chapter am I on".
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const go = (id) => {
    setOpen(false);
    closeTimer.current = setTimeout(() => scrollToSection(id), 280);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed top-6 right-6 z-40 flex items-center gap-2 rounded-full border border-gold/25
          bg-ivory/50 backdrop-blur-md px-4 py-2 shadow-[0_8px_30px_-12px_rgba(45,54,39,0.45)]
          transition-all duration-700
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
              {CHAPTERS.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button key={c.id} onClick={() => go(c.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group flex items-baseline gap-5 py-2 text-left border-b transition-colors
                      ${isActive ? "border-gold/60" : "border-gold/20 hover:border-gold/60"}`}>
                    <span className={`font-body text-[0.65rem] tracking-[0.3em] transition-colors
                      ${isActive ? "text-gold" : "text-gold/70"}`}>{c.n}</span>
                    <span className={`font-display text-2xl transition-all duration-500
                      ${isActive ? "italic text-gold" : "text-eucalyptus group-hover:italic group-hover:text-gold"}`}>
                      {c.title}
                    </span>
                  </button>
                );
              })}
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
