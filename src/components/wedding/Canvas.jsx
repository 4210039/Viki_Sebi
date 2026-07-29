import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* A single fixed background whose colour morphs continuously across the whole
   page scroll — the "pulsing, life-like" breath that replaces per-section blocks. */
export function BreathingBackground() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 26, mass: 0.6 });
  const bg = useTransform(
    p,
    [0, 0.12, 0.26, 0.4, 0.52, 0.64, 0.76, 0.88, 1],
    [
      "#FDFBF7", "#F4F1EA", "#FDFBF7", "#E8EBE2", "#F4F1EA", "#FDFBF7", "#E8EBE2", "#F4F1EA", "#2D3627"
    ]
  );
  return <motion.div className="fixed inset-0 -z-20" style={{ backgroundColor: bg }} aria-hidden="true" />;
}