"use client";

import { MOODS, type MoodId } from "@/lib/messages";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function MoodSelector() {
  const reduceMotion = useReducedMotion();
  const [mood, setMood] = useState<MoodId | null>(null);
  const selected = MOODS.find((item) => item.id === mood);

  return (
    <section aria-labelledby="mood-heading" className="mt-8">
      <h2 id="mood-heading" className="sr-only">
        How are you feeling
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {MOODS.map((item) => {
          const active = item.id === mood;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMood(item.id)}
              aria-pressed={active}
              className={`glass-card min-h-20 rounded-3xl px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40 ${
                active
                  ? "ring-2 ring-deep-rose/40 bg-white"
                  : "hover:bg-white/90"
              }`}
            >
              <span className="block text-2xl" aria-hidden="true">
                {item.emoji}
              </span>
              <span className="mt-2 block text-sm font-semibold text-ink">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.p
            key={selected.id}
            role="status"
            aria-live="polite"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-card mt-4 whitespace-pre-line rounded-3xl px-5 py-4 text-base leading-relaxed text-ink"
          >
            {selected.response}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
