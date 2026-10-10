"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const interests = [
  "Conversational AI",
  "Machine learning",
  "Customer analytics",
  "Connected systems",
];

export function InterestStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <div ref={ref} className="interest-strip" role="region" aria-label="My working interests">
      <m.div className="interest-strip-track" style={{ x: reduced ? 0 : x }}>
        <ul className="interest-strip-group">
          {interests.map((interest) => (
            <li key={interest}>
              <span>
                {interest} <ArrowRight size={20} aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
        <div className="interest-strip-group interest-strip-copy" aria-hidden="true">
          {interests.map((interest) => (
            <span key={interest}>
              {interest} <ArrowRight size={20} />
            </span>
          ))}
        </div>
      </m.div>
    </div>
  );
}
