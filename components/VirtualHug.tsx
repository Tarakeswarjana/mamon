"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

const HOLD_MS = 2400;
const STEPS = [20, 40, 60, 80, 100];

function vibrate(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Vibration is optional and unavailable in many browsers.
  }
}

export function VirtualHug() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [delivered, setDelivered] = useState(false);
  const frame = useRef<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const lastTick = useRef(0);

  function stopHold(reset = false) {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    startedAt.current = null;
    if (reset && !delivered) {
      setProgress(0);
      lastTick.current = 0;
    }
  }

  function tick(now: number) {
    if (!startedAt.current) {
      startedAt.current = now;
    }

    const elapsed = now - startedAt.current;
    const next = Math.min(100, Math.round((elapsed / HOLD_MS) * 100));
    setProgress(next);

    const crossed = STEPS.find(
      (step) => lastTick.current < step && next >= step,
    );
    if (crossed) {
      lastTick.current = crossed;
      vibrate(crossed === 100 ? [40, 40, 80] : 20);
    }

    if (next >= 100) {
      setDelivered(true);
      stopHold();
      return;
    }

    frame.current = requestAnimationFrame(tick);
  }

  function startHold() {
    if (delivered) {
      return;
    }
    stopHold();
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <motion.section
      aria-labelledby="hug-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="hug-heading" className="font-display text-3xl text-ink">
        Need a hug?
      </h2>
      <article className="glass-card mt-5 rounded-[1.75rem] p-6 text-center">
        {delivered ? (
          <div>
            <motion.p
              className="text-7xl"
              initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              aria-hidden="true"
            >
              🫂
            </motion.p>
            <p role="status" className="mt-5 font-display text-2xl text-ink">
              Hug delivered successfully.
            </p>
            <p className="mt-2 text-muted">And no, you can&apos;t return it. ❤️</p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted">
              Press and hold. Let it arrive slowly.
            </p>
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                (event.currentTarget as HTMLButtonElement).setPointerCapture(
                  event.pointerId,
                );
                startHold();
              }}
              onPointerUp={() => stopHold(true)}
              onPointerCancel={() => stopHold(true)}
              onContextMenu={(event) => event.preventDefault()}
              aria-label="Hold for a hug"
              className="relative mx-auto mt-6 flex h-36 w-36 select-none items-center justify-center rounded-full bg-secondary text-sm font-semibold text-deep-rose shadow-inner ring-1 ring-rose/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50"
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#C96A79 ${progress * 3.6}deg, rgba(239,163,172,0.18) 0deg)`,
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px))",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px))",
                }}
                aria-hidden="true"
              />
              Hold for a hug 🫂
            </button>
            <p className="mt-4 text-sm text-muted" aria-live="polite">
              {progress >= 20 ? `${Math.min(100, Math.ceil(progress / 20) * 20)}%` : "0%"}
            </p>
          </div>
        )}
      </article>
    </motion.section>
  );
}
