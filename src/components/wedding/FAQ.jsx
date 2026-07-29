import React, { useState } from "react";
import { Reveal, Parallax } from "./motion";
import ContinueButton from "./ContinueButton";

const FAQS = [
  { q: "Je nejaký dress code?", a: "Garden formal — dlhé šaty, ľanové obleky, jemné tóny, ktoré ctia sezónu. Prosíme hostí, aby sa vyhli bielej a slonovinovej." },
  { q: "Môžeme si vziať deti?", a: "Milujeme vaše ratolesti. Oslava je určená pre dospelých, dojčatá samozrejme vítame." },
  { q: "Ako to bude s počasím?", a: "Obrad sa bude konať vonku pod cédrmi, ak to počasie dovolí. Ak sa obloha zmení, čaká krytá oranžéria. Jemný šál na večer je vhodný." },
  { q: "Bude kyvadlová doprava?", a: "Súkromná kyvadlová doprava vyzdvihne hostí z vlakovej stanice Bojnice o 14:00 v deň konania, spiatočné cesty bežia od 23:30." },
  { q: "Môžeme fotografovať?", a: "Objednali sme fotografa, aby zachytil deň. Počas samotného obradu prosíme, aby telefóny a fotoaparáty zostali schované — buďte s nami prítomní." },
  { q: "Kam poslať darčeky?", a: "Vaša prítomnosť je jediný dar, ktorý hľadáme. Pre tých, čo trvajú, charitatívny fond namiesto darov podporuje záhrady okolo Bojníc." }
];

function Item({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.06}>
      <Parallax distance={20}>
        <div className="border-b border-gold/30">
          <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-5 py-6 text-left group">
            <span className={`h-2.5 w-2.5 rotate-45 bg-gold/80 flex-shrink-0 transition-all duration-700 ${open ? "scale-125" : ""}`} />
            <span className="font-display text-xl sm:text-2xl text-eucalyptus group-hover:italic group-hover:text-gold transition-all duration-500 flex-1">
              {item.q}
            </span>
            <span className="font-display text-2xl text-gold">{open ? "–" : "+"}</span>
          </button>
          <div className="overflow-hidden transition-all duration-700" style={{ maxHeight: open ? "240px" : "0" }}>
            <p className="font-body font-light text-olive leading-relaxed pb-6 pl-12 pr-4 max-w-xl">{item.a}</p>
          </div>
        </div>
      </Parallax>
    </Reveal>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-ivory py-28 sm:py-44 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <span className="eyebrow">Kapitola deviata</span>
            <h2 className="font-display text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light mt-4">
              <span className="italic text-gold">Sprievodca</span>
            </h2>
            <p className="font-body font-light text-olive mt-5 max-w-md mx-auto leading-relaxed">
              Malé odpovede pre pokoj srdca.
            </p>
          </Reveal>
        </div>
        <div className="border-t border-gold/30">
          {FAQS.map((f, i) => <Item key={i} item={f} index={i} />)}
        </div>
      </div>

      <ContinueButton nextId="closing" variant="inline" />
    </section>
  );
}