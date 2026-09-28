"use client";

import { COMFORT_MESSAGES, pickAnother } from "@/lib/messages";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

export function ComfortMessages() {
  const reduceMotion = useReducedMotion();
  const first = useMemo(() => pickAnother(COMFORT_MESSAGES, null), []);
  const [message, setMessage] = useState(first);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="min-h-16 font-display text-2xl leading-snug text-ink"
        >
          {message}
        </motion.p>
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setMessage((current) => pickAnother(COMFORT_MESSAGES, current))}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-deep-rose shadow-sm ring-1 ring-rose/40 transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50"
      >
        Give me another message
      </button>
    </div>
  );
}
