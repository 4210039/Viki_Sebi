import React, { useState } from "react";
import { Parallax, Reveal } from "./motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";

const PHOTOS = [
  { src: images.galleryVeil,    alt: "Hodváb a ruže",    rot: "-4deg", w: "sm:col-span-2", dist: 60,
    sizes: "(min-width: 1024px) 683px, (min-width: 640px) 66vw, 50vw" },
  { src: images.galleryBouquet, alt: "Nevestín kytica",  rot: "3deg",  w: "",              dist: 40,
    sizes: "(min-width: 1024px) 341px, (min-width: 640px) 33vw, 50vw" },
  { src: images.castleDetail,   alt: "Kamenný zámok",    rot: "2deg",  w: "",              dist: -30,
    sizes: "(min-width: 1024px) 341px, (min-width: 640px) 33vw, 50vw" },
  { src: images.galleryHills,   alt: "Kopce",            rot: "-3deg", w: "sm:col-span-2", dist: 50,
    sizes: "(min-width: 1024px) 683px, (min-width: 640px) 66vw, 50vw" },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="relative -mt-20 sm:-mt-32 scroll-mt-20 sm:scroll-mt-32 py-28 sm:py-44 px-6 overflow-hidden">
      <div className="text-center mb-20">
        <Reveal>
          <span className="eyebrow">Kapitola siedma</span>
          <h2 className="font-display text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light mt-4">
            <span className="italic text-gold">Archív</span>
          </h2>
          <p className="font-body font-light text-olive mt-5 max-w-md mx-auto leading-relaxed">
            Malé útržky svetla, ktoré sme pozbierali po ceste.
          </p>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
        {PHOTOS.map((p, i) => (
          <Reveal key={i} delay={i * 0.1} className={p.w}>
            <Parallax distance={p.dist}>
              <button onClick={() => setActive(p.src)}
                className="group block w-full" style={{ transform: `rotate(${p.rot})` }}>
                <div className="bg-ivory p-2 sm:p-3 shadow-[0_18px_40px_-26px_rgba(45,54,39,0.55)] group-hover:rotate-0 group-hover:scale-[1.03] transition-all duration-700">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    className="w-full aspect-[3/4] object-cover photo-print"
                    width={800}
                    aspectRatio="3/4"
                    sizes={p.sizes}
                    quality="auto"
                    loading="lazy"
                  />
                </div>
              </button>
            </Parallax>
          </Reveal>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-eucalyptus/70 backdrop-blur-sm p-6"
          onClick={() => setActive(null)}>
          <div className="bg-ivory p-4 sm:p-6 max-w-lg w-full shadow-2xl">
            <Image
              src={active}
              alt="Zväčšená spomienka"
              className="w-full aspect-[3/4] object-cover"
              width={800}
              aspectRatio="3/4"
              sizes="(min-width: 640px) 512px, 100vw"
              quality="auto"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  );
}
