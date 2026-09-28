"use client";

import { LOVE_NOTES } from "@/lib/messages";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function LoveNotes() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const note = LOVE_NOTES[index];
  const remaining = LOVE_NOTES.length - index;

  function go(nextDirection: number) {
    setDirection(nextDirection);
    setIndex((current) => {
      const next = current + nextDirection;
      if (next < 0) {
        return 0;
      }
      if (next >= LOVE_NOTES.length) {
        return LOVE_NOTES.length - 1;
      }
      return next;
    });
  }

  return (
    <motion.section
      aria-labelledby="notes-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="notes-heading" className="font-display text-3xl text-ink">
        Things I need you to remember ❤️
      </h2>
      <p className="mt-2 text-sm text-muted">Swipe the card. Or use the arrows.</p>

      <div className="relative mt-5 h-64">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={note}
            role="group"
            aria-roledescription="slide"
            aria-label={`Note ${index + 1} of ${LOVE_NOTES.length}`}
            custom={direction}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.85}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -500) {
                go(1);
              } else if (info.offset.x > 80 || info.velocity.x > 500) {
                go(-1);
              }
            }}
            initial={reduceMotion ? false : { x: direction * 48, opacity: 0, rotate: direction * 2 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={reduceMotion ? undefined : { x: direction * -64, opacity: 0, rotate: direction * -3 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card absolute inset-0 flex cursor-grab flex-col justify-between rounded-[1.75rem] p-6 active:cursor-grabbing"
          >
            <p className="font-display text-[1.7rem] leading-snug text-ink">
              {note}
            </p>
            <p className="text-sm text-muted">
              {remaining} {remaining === 1 ? "note" : "notes"} left
            </p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-white text-sm font-semibold text-ink ring-1 ring-rose/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === LOVE_NOTES.length - 1}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-deep-rose text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </motion.section>
  );
}
