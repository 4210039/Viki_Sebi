import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";
import ContinueButton from "./ContinueButton";

const SCHEDULE = [
  { time: "15:00", title: "Príchod", text: "Hostia sú privítaní pohárom sektu v zámockých záhradách." },
  { time: "16:00", title: "Obrad", text: "Sľuby zmenené pod cédrovým oblúkom, kým sláčiky ticho hrajú." },
  { time: "17:00", title: "Koktail", text: "Canapé a rozhovory na terase s výhľadom na údolie." },
  { time: "19:00", title: "Večera", text: "Dlhý stôl, sviečky a menu inšpirované sezónou." },
  { time: "21:30", title: "Prvý tanec", text: "Pod hodvábnou plafónou svetiel je parket náš." },
  { time: "23:00", title: "Noc", text: "Tanec, posledný prípitok a tichá Nitra o polnoci." }
];

const FLORAL_TABLE = images.scheduleTable;

function ScheduleItem({ s, i, p, total }) {
  const start = i / total;
  const end = (i + 1) / total;
  const opacity = useTransform(p, [Math.max(0, start - 0.04), start + 0.02, end, Math.min(1, end + 0.06)], [0.15, 1, 1, 0.2]);
  const x = useTransform(p, [start, end], [i % 2 === 0 ? -40 : 40, 0]);
  return (
    <motion.div style={{ opacity, x }}
      className="flex items-baseline gap-6 sm:gap-12 py-3 sm:py-4 border-b border-gold/15 last:border-0">
      <span className="font-display text-3xl sm:text-5xl text-gold font-light w-24 sm:w-32">{s.time}</span>
      <div className="flex-1">
        <p className="eyebrow !text-[0.6rem]">{s.title}</p>
        <p className="font-body font-light text-olive text-xs sm:text-sm leading-relaxed mt-1">{s.text}</p>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const imgY = useTransform(p, [0, 1], [-40, 40]);
  const continueFade = useTransform(p, [0, 0.9, 1], [0, 0, 1]);

  return (
    <section id="schedule" ref={ref} className="relative" style={{ height: `${SCHEDULE.length * 60}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <Image
            src={FLORAL_TABLE}
            alt=""
            className="w-full h-full object-cover"
            width={1200}
            aspectRatio="3/2"
            quality="auto"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/72 to-ivory/85" />
        <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-ivory to-transparent pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent pointer-events-none" />

        <div className="relative w-full max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="eyebrow">Kapitola štvrtá</span>
            <h2 className="font-display text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light mt-3">
              Tvar <span className="italic text-gold">dňa</span>
            </h2>
          </div>
          <div className="relative">
            {SCHEDULE.map((s, i) => (
              <ScheduleItem key={i} s={s} i={i} p={p} total={SCHEDULE.length} />
            ))}
          </div>
        </div>

        <ContinueButton nextId="venues" style={{ opacity: continueFade }} />
      </div>
    </section>
  );
}
