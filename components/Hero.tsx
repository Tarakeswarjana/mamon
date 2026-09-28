"use client";

import { GIRLFRIEND_NAME } from "@/lib/constants";
import { showEgg } from "@/lib/eggs";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className="pt-4 text-center"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-semibold tracking-[0.32em] text-muted uppercase">
        For you, only you
      </p>
      <h1 className="mt-4 font-display text-[2.35rem] leading-tight text-ink sm:text-5xl">
        Hi{" "}
        <button
          type="button"
          onClick={() => showEgg("Fun fact:\nও আমার সবচেয়ে প্রিয় মানুষ।")}
          className="rounded-sm decoration-rose/80 underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40"
          aria-label={`${GIRLFRIEND_NAME}. A tiny secret is hiding in her name.`}
        >
          {GIRLFRIEND_NAME}
        </button>{" "}
        🌷
      </h1>
      <p className="mt-4 text-lg text-muted">এখন কেমন লাগছে?</p>
    </motion.header>
  );
}
