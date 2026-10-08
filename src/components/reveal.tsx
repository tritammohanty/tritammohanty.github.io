"use client";
import { m, useReducedMotion } from "motion/react";
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [12, 0], opacity: [0.7, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </m.div>
  );
}
