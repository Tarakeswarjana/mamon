"use client";

import {
  FOOD_OPTIONS,
  STORAGE_KEYS,
  WISHLIST_CLIENT_COOLDOWN_MS,
  type FoodItem,
} from "@/lib/constants";
import { canSend, markSent, openSystemMail } from "@/lib/client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function FoodPicker() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  function tellTarak(item: FoodItem) {
    if (!canSend(STORAGE_KEYS.wishlistLastSent, WISHLIST_CLIENT_COOLDOWN_MS)) {
      setStatus("sent");
      return;
    }

    const emoji =
      FOOD_OPTIONS.find((option) => option.item === item)?.emoji ?? "❤️";

    setStatus("sending");
    markSent(STORAGE_KEYS.wishlistLastSent);
    openSystemMail(
      "🚨 Girlfriend Emergency Request ❤️",
      `She wants:\n\n${item} ${emoji}\n\nYour mission has been assigned.\n\nGo make her day better. ❤️`,
    );
    setStatus("sent");
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
                tellTarak(option.item);
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
            {status === "sent" ? (
              <p role="status" className="mt-4 text-sm font-semibold text-deep-rose">
                মেইল অ্যাপে খুলেছে — Send চাপলেই তিনি জানবে। {emoji ?? "❤️"}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
