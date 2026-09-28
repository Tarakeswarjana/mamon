"use client";

import { SECRET_LETTER } from "@/lib/messages";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function SecretLetter() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.section
      aria-labelledby="letter-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="letter-heading" className="text-center font-display text-3xl text-ink">
        One thing before you go…
      </h2>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="relative h-44 w-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50"
          aria-label={open ? "Letter is open" : "Open the secret envelope"}
        >
          <span className="absolute inset-x-4 bottom-0 h-28 rounded-b-xl bg-[#f3d5d8] shadow-soft" />
          <motion.span
            className="absolute inset-x-4 top-8 h-24 origin-top bg-[#efa3ac]"
            style={{ clipPath: "polygon(0 0, 50% 70%, 100% 0)" }}
            animate={{ rotateX: open ? -180 : 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.7 }}
            aria-hidden="true"
          />
          <span className="absolute inset-x-6 top-16 flex h-20 items-center justify-center rounded-lg bg-cream font-hand text-3xl text-deep-rose shadow-sm">
            💌
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="paper mt-6 rounded-[1.75rem] px-6 py-7 shadow-lift"
          >
            <p className="font-hand text-[1.65rem] leading-relaxed whitespace-pre-line text-ink">
              {SECRET_LETTER}
            </p>
          </motion.article>
        ) : (
          <p className="mt-4 text-center text-sm text-muted">Tap the envelope.</p>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
