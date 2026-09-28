"use client";

import { BREATHING_COPY } from "@/lib/messages";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Phase = "in" | "hold" | "out";

const PHASES: { id: Phase; label: string; duration: number; scale: number }[] = [
  { id: "in", label: "Breathe in", duration: 4000, scale: 1.28 },
  { id: "hold", label: "Hold", duration: 4000, scale: 1.28 },
  { id: "out", label: "Breathe out", duration: 6000, scale: 1 },
];

const TOTAL_MS = 60_000;

export function BreathingExercise() {
  const reduceMotion = useReducedMotion();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(60);
  const phase = PHASES[phaseIndex];

  useEffect(() => {
    if (!running) {
      return;
    }

    const started = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      setRemaining(Math.max(0, Math.ceil((TOTAL_MS - elapsed) / 1000)));
      if (elapsed >= TOTAL_MS) {
        setRunning(false);
        setDone(true);
      }
    }, 250);

    return () => window.clearInterval(tick);
  }, [running]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhaseIndex((index) => (index + 1) % PHASES.length);
    }, phase.duration);

    return () => window.clearTimeout(timer);
  }, [running, phase.duration, phaseIndex]);

  function start() {
    setDone(false);
    setPhaseIndex(0);
    setRemaining(60);
    setRunning(true);
  }

  return (
    <motion.section
      aria-labelledby="breathe-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="breathe-heading" className="font-display text-3xl text-ink">
        60 seconds just for you 🌸
      </h2>
      <p className="mt-2 leading-relaxed text-muted">{BREATHING_COPY}</p>
      <article className="glass-card mt-5 flex flex-col items-center rounded-[1.75rem] p-6">
        <motion.div
          className="flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-rose/70 via-lavender/70 to-cream shadow-[0_18px_40px_rgba(217,199,232,0.45)]"
          animate={
            running && !reduceMotion
              ? { scale: phase.scale }
              : { scale: 1 }
          }
          transition={{
            duration: reduceMotion ? 0 : phase.duration / 1000,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/80">
            <span className="text-sm font-semibold text-deep-rose">
              {running ? remaining + "s" : "60s"}
            </span>
          </div>
        </motion.div>
        <p className="mt-6 font-display text-2xl text-ink" aria-live="polite">
          {done ? "That's enough. You did well." : running ? phase.label : "Whenever you're ready"}
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          A quiet minute. Not a treatment. Just air.
        </p>
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-deep-rose ring-1 ring-rose/40 transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50 disabled:opacity-60"
        >
          {done ? "One more minute" : running ? "Stay with it" : "Begin"}
        </button>
      </article>
    </motion.section>
  );
}
