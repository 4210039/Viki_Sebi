import React from "react";
import NavOverlay from "@/components/wedding/NavOverlay";
import { BreathingBackground } from "@/components/wedding/Canvas";
import Hero from "@/components/wedding/Hero";
import OurStory from "@/components/wedding/OurStory";
import Timeline from "@/components/wedding/Timeline";
import Schedule from "@/components/wedding/Schedule";
import CeremonyReception from "@/components/wedding/CeremonyReception";
import Travel from "@/components/wedding/Travel";
import Gallery from "@/components/wedding/Gallery";
import RSVP from "@/components/wedding/RSVP";
import FAQ from "@/components/wedding/FAQ";
import Closing from "@/components/wedding/Closing";

export default function Home() {
  return (
    <main className="relative bg-transparent text-foreground">
      <BreathingBackground />
      <NavOverlay />
      <Hero />
      <OurStory />
      <Timeline />
      <Schedule />
      <CeremonyReception />
      <Travel />
      <Gallery />
      <RSVP />
      <FAQ />
      <Closing />
    </main>
  );
}