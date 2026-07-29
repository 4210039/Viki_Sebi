import React from "react";
import { Parallax, Reveal } from "./motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";

const FLORAL_DETAIL = images.timelineDetail;

const MILESTONES = [
  { date: "September 2019", title: "Požičaný dáždnik", text: "Dážďom premoknuté popoludnie v Sade Janka Kráľa. On sa stratil; ona mala trpezlivosť." },
  { date: "Zima 2020", title: "Prvá zima", text: "Drobný bratislavský byt, jeden radiátor, dva šálky čaju, čo nikdy nevychladli." },
  { date: "Jar 2021", title: "Pán Chopin", text: "Záchranný pes s názorom na hudbu a hlbokou nedôverou k dáždnikom." },
  { date: "Leto 2023", title: "Chalupa pri Orave", text: "Rozpadajúca sa chalupa pri Oravskej priehrade, ktorá sa akosi stala tvarom domova." },
  { date: "August 2025", title: "Otázka", text: "V čase zlatého svetla, na chodníku nad Vršatcom — povedala áno skôr, než stihol doopytať." },
  { date: "September 2026", title: "Sľub", text: "Obklopení tými, ktorých milujeme, začíname ďalšiu kapitolu — spolu, konečne." }
];

function Milestone({ item, index }) {
  const left = index % 2 === 0;
  return (
    <div className="relative flex md:items-center w-full min-h-[40vh] md:min-h-0">
      <div className={`hidden md:block md:w-1/2 ${left ? "pr-12 text-right" : "order-3 pl-12"}`}>
        <Reveal>
          <Parallax distance={36}>
            <p className="eyebrow">{item.date}</p>
            <h3 className="font-display text-2xl sm:text-3xl text-eucalyptus italic mt-2">{item.title}</h3>
            <p className="font-body font-light text-olive mt-2 leading-relaxed text-sm max-w-xs ml-auto" style={left ? {} : { marginLeft: 0, marginRight: "auto" }}>{item.text}</p>
          </Parallax>
        </Reveal>
      </div>

      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-10">
        <Reveal>
          <Parallax distance={18}>
            <span className="block h-3 w-3 rotate-45 bg-gold/80 ring-4 ring-ivory/70" />
          </Parallax>
        </Reveal>
      </div>

      <div className="md:hidden pl-16 pb-12">
        <Reveal>
          <p className="eyebrow">{item.date}</p>
          <h3 className="font-display text-xl text-eucalyptus italic mt-1">{item.title}</h3>
          <p className="font-body font-light text-olive mt-1 leading-relaxed text-sm">{item.text}</p>
        </Reveal>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative -mt-24 sm:-mt-32 scroll-mt-24 sm:scroll-mt-32 py-28 sm:py-40 px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Reveal>
          <span className="eyebrow">Kapitola tretia</span>
          <h2 className="font-display text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light mt-4">
            Cesta, ktorá nás <span className="italic text-gold">doviedla sem</span>
          </h2>
          <p className="font-body font-light text-olive mt-5 max-w-md mx-auto leading-relaxed">
            Hŕstka chvíľ, navešaných ako malé lampáše na jednu zlatú niť.
          </p>
        </Reveal>
      </div>

      <div className="max-w-2xl mx-auto mb-24">
        <Reveal>
          <Parallax distance={30}>
            <div className="mx-auto max-w-sm">
              <Image
                src={FLORAL_DETAIL}
                alt="Jedna záhradná ruža v mäkkom svetle"
                className="w-full aspect-[4/5] object-cover photo-print"
                width={600}
                aspectRatio="4/5"
                sizes="(min-width: 640px) 384px, 100vw"
                quality="auto"
                loading="lazy"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[33px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent" />
        <div className="flex flex-col gap-10 md:gap-24">
          {MILESTONES.map((m, i) => <Milestone key={i} item={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}
