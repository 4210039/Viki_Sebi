import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";
import ContinueButton from "./ContinueButton";

const CEREMONY = images.ceremony;
const RECEPTION = images.reception;

/* Two venues crossfade into one another over a single pinned panel — the sacred
   dissolving into the festive, text drifting like a voiceover. */
export default function CeremonyReception() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const imgAScale = useTransform(p, [0, 1], [1.05, 1.18]);
  const imgBScale = useTransform(p, [0, 1], [1.18, 1.05]);
  const aOpacity = useTransform(p, [0, 0.1, 0.45, 0.58], [0, 1, 1, 0]);
  const bOpacity = useTransform(p, [0.45, 0.6, 0.9, 1], [0, 1, 1, 0]);

  const txt1Y = useTransform(p, [0, 1], [0, -180]);
  const txt1O = useTransform(p, [0.04, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const txt2Y = useTransform(p, [0, 1], [120, -60]);
  const txt2O = useTransform(p, [0.55, 0.72, 0.92, 1], [0, 1, 1, 0.6]);
  const continueFade = useTransform(p, [0.65, 0.82, 1], [0, 1, 1]);

  return (
    <section id="venues" ref={ref} className="relative" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: aOpacity, scale: imgAScale }}>
          <Image
            src={CEREMONY}
            alt="Kostol"
            className="w-full h-full object-cover"
            width={1200}
            aspectRatio="3/2"
            quality="auto"
            loading="lazy"
          />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: bOpacity, scale: imgBScale }}>
          <Image
            src={RECEPTION}
            alt="Oranžéria"
            className="w-full h-full object-cover"
            width={1200}
            aspectRatio="3/2"
            quality="auto"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-eucalyptus/50 via-eucalyptus/10 to-eucalyptus/30" />
        {/* chapter label */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
          <span className="eyebrow !text-ivory/80">Kapitola piata</span>
          <h2 className="font-display text-ivory text-3xl sm:text-5xl font-light mt-2">
            Posvätné &amp; <span className="italic text-gold">slávnostné</span>
          </h2>
        </div>

        {/* ceremony text */}
        <motion.div style={{ y: txt1Y, opacity: txt1O }}
          className="absolute bottom-16 left-6 sm:left-16 max-w-sm z-10">
          <span className="eyebrow !text-ivory/70 !text-[0.6rem]">Sľuby · 16:00</span>
          <h3 className="font-display text-ivory text-3xl sm:text-4xl italic mt-2">Kostol sv. Martina</h3>
          <p className="font-body font-light text-ivory/80 mt-3 text-sm leading-relaxed">
            Kamenný kostol kúpaný v popoludňajšom svetle, rámovaný stáročnými cédrami.
            Zámok Bojnice, 972 01 Bojnice.
          </p>
        </motion.div>

        {/* reception text */}
        <motion.div style={{ y: txt2Y, opacity: txt2O }}
          className="absolute bottom-16 right-6 sm:right-16 max-w-sm text-right z-10">
          <span className="eyebrow !text-ivory/70 !text-[0.6rem]">Hostina · 19:00</span>
          <h3 className="font-display text-ivory text-3xl sm:text-4xl italic mt-2">Pavilón oranžérie</h3>
          <p className="font-body font-light text-ivory/80 mt-3 text-sm leading-relaxed">
            Sklený pavilón pod hviezdami, prestretý jedným dlhým stolom sviečok.
            Záhrady zámku, Bojnice.
          </p>
        </motion.div>

        <ContinueButton nextId="travel" style={{ opacity: continueFade }} />
      </div>
    </section>
  );
}
