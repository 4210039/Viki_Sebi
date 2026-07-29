import React from "react";
import { useInView } from "./useInView";

/* Standard chapter heading: eyebrow + serif title + optional intro + leaf divider. */
export default function ChapterHeading({ eyebrow, title, intro, align = "center" }) {
  const [ref, inView] = useInView();
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div ref={ref} className={`flex flex-col ${alignment} ${inView ? "in-view" : ""}`}>
      <div className="bloom" style={inView ? { opacity: 1, transform: "none" } : undefined}>
        <span className="eyebrow block">{eyebrow}</span>
        <h2 className="font-display mt-5 text-eucalyptus text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05]">
          {title}
        </h2>
        {intro && (
          <p className="font-body font-light text-olive mt-6 max-w-xl text-[0.98rem] leading-[1.8] mx-auto">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}