import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SMOOTH = { stiffness: 160, damping: 28, mass: 0.32 };

/* Parallax: translates children vertically as the element traverses the viewport. */
export function Parallax({ children, distance = 80, className, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), SMOOTH);
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

/* Reveal: opacity + gentle upward bloom as the element enters view. */
export function Reveal({ children, className, delay = 0, y = 36 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.5"] });
  const p = useSpring(scrollYProgress, SMOOTH);
  const opacity = useTransform(p, [0, 1], [0, 1]);
  const translate = useTransform(p, [0, 1], [y, 0]);
  const scale = useTransform(p, [0, 1], [0.97, 1]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y: translate, scale, transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* PinnedScroll: a tall section that pins its child for the scroll duration,
   exposing section-level scrollYProgress (0→1) to drive inner motion. */
export function PinnedScroll({ children, span = "200vh", className, innerRef, progressRef }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  if (progressRef) progressRef.current = scrollYProgress;
  return (
    <section ref={ref} style={{ height: span }} className={className}>
      <div ref={innerRef} className="sticky top-0 h-screen overflow-hidden">
        {typeof children === "function" ? children(scrollYProgress) : children}
      </div>
    </section>
  );
}

/* useFloralSway: a gentle, scroll-linked rotation for botanical motifs —
   the element nods softly as it traverses the viewport, like a branch in
   a passing breeze. `base` folds in any resting rotation so the sway
   composes with the element's intended tilt rather than overriding it. */
export function useFloralSway({ base = 0, sway = 2.5 } = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.9 });
  const rotate = useTransform(p, [0, 0.5, 1], [base - sway, base + sway, base - sway]);
  return [ref, { rotate }];
}

/* Soft fade overlay used at chapter seams. */
export function SeamFade({ from = "ivory", to = "ivory", className }) {
  return (
    <div className={className} aria-hidden="true"
      style={{
        height: "18vh",
        background: `linear-gradient(to bottom, transparent, var(--${from}), transparent)`,
      }}
    />
  );
}