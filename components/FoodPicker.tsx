"use client";

import {
  FOOD_OPTIONS,
  STORAGE_KEYS,
  WISHLIST_CLIENT_COOLDOWN_MS,
  type FoodItem,
} from "@/lib/constants";
import { canSend, markSent, postJson } from "@/lib/client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function FoodPicker() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function tellTarak(item: FoodItem) {
    if (!canSend(STORAGE_KEYS.wishlistLastSent, WISHLIST_CLIENT_COOLDOWN_MS)) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const result = await postJson("/api/wishlist", {
      item,
      timestamp: new Date().toISOString(),
    });

    if (result.success) {
      markSent(STORAGE_KEYS.wishlistLastSent);
      setStatus("sent");
      return;
    }

    setStatus("error");
  }

  const emoji = FOOD_OPTIONS.find((item) => item.item === selected)?.emoji;

  return (
    <motion.section
      aria-labelledby="food-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="food-heading" className="font-display text-3xl text-ink">
        What would make today slightly better?
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {FOOD_OPTIONS.map((option) => {
          const active = selected === option.item;

          return (
            <button
              key={option.item}
              type="button"
              onClick={() => {
                setSelected(option.item);
                void tellTarak(option.item);
              }}
              aria-pressed={active}
              className={`glass-card min-h-[4.5rem] rounded-3xl px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40 ${
                active ? "ring-2 ring-deep-rose/45 bg-white" : "hover:bg-white/90"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="mt-1 block text-sm font-semibold text-ink">
                {option.item}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mt-4 rounded-[1.75rem] p-5"
          >
            <p className="text-lg font-semibold text-ink">Excellent choice 😌</p>
            <p className="mt-1 text-muted">I&apos;ll take care of it. ❤️</p>
            {status === "sending" ? (
              <p role="status" className="mt-4 text-sm text-muted">
                Telling him…
              </p>
            ) : null}
            {status === "sent" ? (
              <p role="status" className="mt-4 text-sm font-semibold text-deep-rose">
                He knows. {emoji ?? "❤️"}
              </p>
            ) : null}
            {status === "error" ? (
              <div className="mt-4">
                <p role="status" className="text-sm text-muted">
                  I couldn&apos;t reach him just now. Try again in a moment.
                </p>
                <button
                  type="button"
                  onClick={() => tellTarak(selected)}
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-deep-rose px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(201,106,121,0.28)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50"
                >
                  Tell Tarak ❤️
                </button>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
