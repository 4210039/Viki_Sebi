import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";

const SUNSET = images.closingSunset;

export default function Closing() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const scale = useTransform(p, [0, 1], [1.1, 1.22]);
  const y = useTransform(p, [0, 1], [40, -40]);
  const imgO = useTransform(p, [0, 0.14, 0.88, 1], [0, 1, 1, 0.85]);
  const textY = useTransform(p, [0, 1], [60, -40]);
  const textO = useTransform(p, [0.1, 0.4, 0.9, 1], [0, 1, 1, 0.8]);

  return (
    <section id="closing" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale, y, opacity: imgO }}>
        <Image
          src={SUNSET}
          alt="Zlatá hodina nad údolím"
          className="w-full h-full object-cover"
          width={1200}
          aspectRatio="3/2"
          quality="auto"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-eucalyptus/40 via-eucalyptus/20 to-eucalyptus/40" />

      <motion.div style={{ y: textY, opacity: textO }}
        className="relative z-10 text-center px-6">
        <span className="eyebrow !text-ivory/80">Kapitola desiata · Požehnanie</span>
        <div className="my-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-ivory/50" />
          <span className="h-2 w-2 rotate-45 bg-gold/80" aria-hidden="true" />
          <span className="h-px w-16 bg-ivory/50" />
        </div>
        <h2 className="font-display text-ivory font-light text-4xl sm:text-6xl md:text-7xl leading-[1.05] max-w-3xl mx-auto">
          Kým sa nestretneme<br />pod <span className="italic">cédrami</span>.
        </h2>
        <p className="font-body font-light text-ivory/85 mt-8 max-w-md mx-auto leading-relaxed">
          Ďakujeme, že kráčate s nami týmto príbehom. Deň by bez vás nebol úplný.
        </p>
        <p className="font-script text-ivory text-5xl sm:text-6xl mt-12">Viktória &amp; Sebastián</p>

        <div className="mt-20 border-t border-ivory/20 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-ivory/60">
          <a href="#threshold" className="eyebrow !text-ivory/60 hover:!text-gold transition-colors">Späť na začiatok</a>
          <span className="hidden sm:block">·</span>
          <a href="#rsvp" className="eyebrow !text-ivory/60 hover:!text-gold transition-colors">Odpovedať na pozvanie</a>
          <span className="hidden sm:block">·</span>
          <a href="mailto:kontakt@viktoriasebastian.sk" className="eyebrow !text-ivory/60 hover:!text-gold transition-colors">Napíšte nám</a>
        </div>
        <p className="font-body text-ivory/40 text-xs mt-8 tracking-widest">12 · IX · MMXXVI · BOJNICE</p>
      </motion.div>
    </section>
  );
}
