import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";
import ContinueButton from "./ContinueButton";

const PORTRAIT = images.story;

/* A pinned full-bleed portrait. Three text verses appear in sequence — each
   fades in only after the previous has faded out, so nothing ever overlaps. */
export default function OurStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const imgScale = useTransform(p, [0, 1], [1.05, 1.18]);
  const imgY = useTransform(p, [0, 1], [0, -60]);
  const imgO = useTransform(p, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);
  const fade = useTransform(p, [0, 0.92, 1], [0, 0, 1]);

  const block1Y = useTransform(p, [0, 1], [40, -40]);
  const block1O = useTransform(p, [0, 0.08, 0.28, 0.38], [1, 1, 1, 0]);
  const block2Y = useTransform(p, [0, 1], [50, -50]);
  const block2O = useTransform(p, [0.36, 0.46, 0.62, 0.72], [0, 1, 1, 0]);
  const block3Y = useTransform(p, [0, 1], [60, -60]);
  const block3O = useTransform(p, [0.68, 0.78, 0.92], [0, 1, 1]);

  return (
    <section id="story" ref={ref} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY, opacity: imgO }}>
          <Image
            src={PORTRAIT}
            alt="Viktória a Sebastián"
            className="w-full h-full object-cover"
            width={1200}
            aspectRatio="3/2"
            quality="auto"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/30 to-ivory" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <motion.div style={{ y: block1Y, opacity: block1O }}>
              <span className="eyebrow text-shadow-soft">Kapitola druhá</span>
              <h2 className="font-display text-eucalyptus text-4xl sm:text-6xl md:text-7xl font-light mt-3 leading-[1.02] text-shadow-soft">
                Ako tiché <span className="italic text-gold">popoludnie</span> sa stalo večnosťou.
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.p
            style={{ y: block2Y, opacity: block2O }}
            className="quote-verse max-w-[760px] w-full">
            Začalo sa bez okázalosti. Spoločný známy, požičaný dáždnik, septembrový dážď v Sade Janka Kráľa.
            Pýtal sa na cestu k ulici, ktorá neexistovala — a ona ho tam predsa len doviedla.
          </motion.p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.p
            style={{ y: block3Y, opacity: block3O }}
            className="quote-verse max-w-[760px] w-full">
            A tak, pri jednom zlatom západe slnka, na vyhliadke nad údolím, položil jedinú otázku,
            na ktorej vôbec záležalo — a ona odpovedala menom, ktoré si už roky potajomky nacvičovala.
          </motion.p>
        </div>

        <ContinueButton nextId="timeline" style={{ opacity: fade }} />
      </div>
    </section>
  );
}
