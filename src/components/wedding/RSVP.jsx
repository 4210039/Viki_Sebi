import React, { useState } from "react";
import { Reveal, Parallax } from "./motion";
import { Image } from "@/components/ui/image";
import { images } from "@/config/images";

const FLORAL_BOUQUET = images.rsvpBouquet;

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", attending: "yes", guests: "1", dietary: "", song: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="rsvp" className="relative py-28 sm:py-44 px-6 overflow-hidden">
      <Reveal className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-14">
          <Parallax distance={24}>
            <div className="w-40 sm:w-48">
              <Image
                src={FLORAL_BOUQUET}
                alt="Nevestín kytica záhradných ruží"
                className="w-full aspect-[4/5] object-cover photo-print"
                width={400}
                aspectRatio="4/5"
                sizes="(min-width: 640px) 192px, 160px"
                quality="auto"
                loading="lazy"
              />
            </div>
          </Parallax>
        </div>

        <div className="text-center mb-10">
          <span className="eyebrow">Kapitola ôsma</span>
          <h2 className="font-display text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light mt-4">
            <span className="italic text-gold">Odpoveď</span>
          </h2>
          <p className="font-body font-light text-olive mt-5 leading-relaxed">
            Prosím, odpovedzte do prvého augusta, aby sme vám mohli pripraviť miesto pri stole.
          </p>
        </div>

        <div className="double-rule mb-10" />

        {submitted ? (
          <div className="text-center py-12">
            <div className="gold-rule w-24 mx-auto" />
            <p className="font-display italic text-3xl text-eucalyptus mt-8">Z celého srdca ďakujeme —</p>
            <p className="font-body font-light text-olive mt-4 max-w-md mx-auto leading-relaxed">
              Vaša odpoveď bola prijatá. Sme potichu pohnutí radosťou, že sa o tento deň podelíme s vami.
              Hľadajte malý lístok poštou, keď sa otočí ročná doba.
            </p>
            <p className="font-script text-gold text-3xl mt-8">Viktória &amp; Sebastián</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-10">
            <div>
              <label className="eyebrow block mb-1">Vaše meno</label>
              <input className="field-line" value={form.name} onChange={update("name")} placeholder="Pán a pani Novák" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <label className="eyebrow block mb-1">Pridáte sa?</label>
                <div className="flex gap-8 pt-3">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="attending" value={v} checked={form.attending === v}
                        onChange={update("attending")} className="accent-[#B1945F]" />
                      <span className="font-body font-light text-eucalyptus text-sm">{v === "yes" ? "S radosťou" : "Žiaľ nie"}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="eyebrow block mb-1">Počet hostí</label>
                <input type="number" min="1" max="6" className="field-line" value={form.guests} onChange={update("guests")} />
              </div>
            </div>
            <div>
              <label className="eyebrow block mb-1">Stravovacie obmedzenia</label>
              <input className="field-line" value={form.dietary} onChange={update("dietary")} placeholder="Alergie, preferencie…" />
            </div>
            <div>
              <label className="eyebrow block mb-1">Pieseň na tanec</label>
              <input className="field-line" value={form.song} onChange={update("song")} placeholder="Čo vás privedie na parket?" />
            </div>
            <div className="text-center pt-4">
              <button type="submit" className="btn-gold">Zapečatiť a odoslať</button>
            </div>
          </form>
        )}
        <div className="double-rule mt-12" />
      </Reveal>
    </section>
  );
}
