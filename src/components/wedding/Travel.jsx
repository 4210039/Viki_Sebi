import React from "react";
import { Parallax, Reveal } from "./motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";

const DETAIL = images.castleDetail;

const STAYS = [
  {
    name: "Zámok Bojnice",
    role: "Zámok",
    detail:
      "Obmedzený počet izieb priamo v zámku. Pri rezervácii spomeňte svadbu Viktória a Sebastián.",
    price: "od 240 € / noc",
  },
  {
    name: "Penzión pri zámku",
    role: "Butikový penzión",
    detail:
      "Pôvabný osemizbový penzión v mestečku, štvorminútová prechádzka k bránam.",
    price: "od 160 € / noc",
  },
  {
    name: "Chata pod Magurou",
    role: "Vidiecky dom",
    detail:
      "Obklopená vinicami, desať minút autom — pre tých, čo uprednostňujú tichý vidiek.",
    price: "od 190 € / noc",
  },
];

const NOTES = [
  {
    label: "Vlakom",
    text:
      "Rýchlik z Bratislavy do Prievidze (1 h 30 min), potom regionálny spoj do Bojníc. Kyvadlová doprava bude čakať na príjazd o 14:00.",
  },
  {
    label: "Lietadlom",
    text:
      "Najbližšie medzinárodné letisko: Viedeň (Schwechat). Cesta autom do údolia trvá približne dve hodiny.",
  },
  {
    label: "Autom",
    text:
      'Dostatok parkovacích miest v areáli zámku. Pri príchode nasledujte tabule "Svadba".',
  },
];

export default function Travel() {
  return (
    <section
      id="travel"
      className="relative -mt-24 sm:-mt-32 scroll-mt-24 sm:scroll-mt-32 py-28 sm:py-44 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <span className="eyebrow">Kapitola šiesta</span>
            <h2 className="font-display text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light mt-4">
              Pre <span className="italic text-gold">nocľah</span>
            </h2>
            <p className="font-body font-light text-olive mt-5 max-w-md mx-auto leading-relaxed">
              Starostlivo vybrané miesta na prenocovanie, ak sa chcete v údolí
              zdržať.
            </p>
          </Reveal>
        </div>

        <div className="space-y-16 sm:space-y-24 mb-28">
          {STAYS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Parallax distance={50}>
                <div
                  className={`flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10 border-b border-gold/25 pb-8 ${
                    i % 2 ? "sm:flex-row-reverse sm:text-right" : ""
                  }`}
                >
                  <div className="sm:w-1/3">
                    <span className="eyebrow !text-[0.6rem]">{s.role}</span>
                    <h3 className="font-display text-2xl sm:text-4xl text-eucalyptus italic mt-1">
                      {s.name}
                    </h3>
                  </div>

                  <div className="sm:w-2/3">
                    <p className="font-body font-light text-olive text-sm leading-relaxed">
                      {s.detail}
                    </p>
                    <p className="font-body text-gold text-sm mt-3 tracking-wide">
                      {s.price}
                    </p>
                  </div>
                </div>
              </Parallax>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal>
            <Parallax distance={40}>
              <Image
                src={DETAIL}
                alt="Detail cesty"
                className="w-full aspect-[3/2] object-cover photo-print"
                width={1200}
                aspectRatio="3/2"
                sizes="(min-width: 768px) 50vw, 100vw"
                quality="auto"
                loading="lazy"
              />
            </Parallax>
          </Reveal>

          <div className="space-y-8">
            {NOTES.map((n, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div>
                  <p className="eyebrow">{n.label}</p>
                  <p className="font-body font-light text-olive leading-relaxed mt-1 text-sm">
                    {n.text}
                  </p>
                </div>

                {i < NOTES.length - 1 && (
                  <div className="gold-rule w-20 opacity-40 mt-6" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}