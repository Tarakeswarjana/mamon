"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type IntroScreenProps = {
  onOpen: () => void;
};

const LINES = [
  "Hey Mamon ❤️",
  "I know today might feel a little harder than usual…",
  "So I made a tiny corner of the internet just for you.",
];

export function IntroScreen({ onOpen }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const visibleStep = reduceMotion ? LINES.length : step;

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timers = [
      window.setTimeout(() => setStep(2), 1600),
      window.setTimeout(() => setStep(3), 3400),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  const showButton = visibleStep >= LINES.length;

  return (
    <motion.section
      className="safe-pad relative flex min-h-dvh flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Welcome"
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <p className="mb-10 text-xs font-semibold tracking-[0.28em] text-muted uppercase">
          A little care for you
        </p>

        <div className="flex min-h-[240px] flex-col items-center justify-center gap-6">
          {LINES.map((line, index) =>
            visibleStep > index ? (
              <motion.p
                key={line}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={
                  index === 0
                    ? "font-display text-4xl leading-tight text-ink sm:text-5xl"
                    : "max-w-[20rem] text-lg leading-relaxed text-muted sm:text-xl"
                }
              >
                {line}
              </motion.p>
            ) : null,
          )}
        </div>

        <AnimatePresence>
          {showButton ? (
            <motion.button
              type="button"
              onClick={onOpen}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.2 }}
              className="mt-12 inline-flex min-h-12 items-center justify-center rounded-full bg-deep-rose px-7 text-base font-semibold text-white shadow-[0_16px_36px_rgba(201,106,121,0.3)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Open your little surprise 💌
            </motion.button>
          ) : (
            <span className="mt-12 h-12" aria-hidden="true" />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
