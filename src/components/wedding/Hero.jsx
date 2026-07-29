import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";
import ContinueButton from "./ContinueButton";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const fade = useTransform(p, [0, 0.7], [1, 0]);
  const lift = useTransform(p, [0, 1], [0, -120]);
  const bgScale = useTransform(p, [0, 1], [1.02, 1.12]);
  const bgY = useTransform(p, [0, 1], [0, 80]);

  return (
    <section id="threshold" ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
        <Image
          src={images.hero}
          alt="Záhradné ruže a šalvia"
          className="w-full h-full object-cover"
          width={1920}
          aspectRatio="3/2"
          quality="auto"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/45 via-ivory/55 to-ivory/45" />

      <motion.div style={{ opacity: fade, y: lift }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="eyebrow text-shadow-soft">Srdečne Vás pozývame na</p>
        <div className="my-6 flex items-center justify-center gap-5 sm:gap-10">
          <span className="gold-rule-solid w-10 sm:w-20 opacity-60" />
          <span className="font-script text-gold text-2xl sm:text-3xl">&amp;</span>
          <span className="gold-rule-solid w-10 sm:w-20 opacity-60" />
        </div>
        <h1 className="font-display text-eucalyptus font-light leading-[0.92] tracking-tight text-shadow-soft">
          <span className="block text-6xl sm:text-8xl md:text-[9rem] italic">Viktória</span>
          <span className="block font-script text-gold text-3xl sm:text-4xl my-1 sm:my-2">— a —</span>
          <span className="block text-6xl sm:text-8xl md:text-[9rem] italic">Sebastián</span>
        </h1>
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="font-body font-light tracking-[0.3em] text-sm text-olive uppercase">Dvanásty september</p>
          <p className="font-display italic text-xl text-gold">Dvetisíc dvadsaťšesť</p>
          <p className="font-body font-light text-xs tracking-[0.25em] text-olive uppercase mt-1">
            Zámok Bojnice · Horná Nitra
          </p>
        </div>
      </motion.div>

      <ContinueButton nextId="story" label="Začať" style={{ opacity: fade }} ariaLabel="Začať príbeh" />
    </section>
  );
}
