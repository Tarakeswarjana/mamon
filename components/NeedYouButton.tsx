"use client";

import { NEED_YOU_CLIENT_COOLDOWN_MS, STORAGE_KEYS } from "@/lib/constants";
import { canSend, markSent, openSystemMail } from "@/lib/client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function NeedYouButton() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  function summon() {
    if (!canSend(STORAGE_KEYS.needYouLastSent, NEED_YOU_CLIENT_COOLDOWN_MS)) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    markSent(STORAGE_KEYS.needYouLastSent);
    openSystemMail(
      "🚨 Boyfriend Summoned ❤️",
      "Drop whatever you're doing.\n\nShe wants you. ❤️",
    );
    setStatus("sent");
  }

  return (
    <motion.section
      aria-labelledby="need-you-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="need-you-heading" className="font-display text-3xl text-ink">
        Nothing here helping?
      </h2>
      <button
        type="button"
        onClick={summon}
        disabled={status === "sending" || status === "sent"}
        className="mt-5 flex min-h-16 w-full items-center justify-center rounded-[1.75rem] bg-deep-rose px-6 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(201,106,121,0.32)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50 disabled:opacity-80"
      >
        I just want you 🥺
      </button>
      <AnimatePresence>
        {status === "sent" ? (
          <motion.p
            role="status"
            aria-live="polite"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center font-display text-2xl leading-snug text-ink"
          >
            Message received.
            <span className="mt-2 block text-lg text-muted">
              Boyfriend has officially been summoned. 🚨❤️
            </span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
