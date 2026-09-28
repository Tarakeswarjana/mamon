"use client";

import { ComfortMessages } from "@/components/ComfortMessages";
import { motion, useReducedMotion } from "motion/react";

export function ComfortMenu() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="comfort-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="comfort-heading" className="font-display text-3xl text-ink">
        Your comfort menu ✨
      </h2>
      <article className="glass-card mt-5 rounded-[1.75rem] p-6">
        <p className="text-sm font-semibold tracking-wide text-muted">
          🧸 I need comfort
        </p>
        <div className="mt-4">
          <ComfortMessages />
        </div>
      </article>
    </motion.section>
  );
}
