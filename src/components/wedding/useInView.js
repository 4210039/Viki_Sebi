import { useEffect, useRef, useState } from "react";

/**
 * Bloom observer — reveals elements with the `.bloom` class as they enter view.
 * Returns a ref to attach and a boolean for conditional rendering.
 */
export function useInView(options = { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      options
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}