"use client";

import { FEELING_CLIENT_COOLDOWN_MS, STORAGE_KEYS } from "@/lib/constants";
import { canSend, markSent, postJson } from "@/lib/client";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const MAX_LENGTH = 2000;

export function FeelingShare() {
  const reduceMotion = useReducedMotion();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const trimmed = message.trim();
  const canSubmit = trimmed.length >= 2 && trimmed.length <= MAX_LENGTH;

  async function sendFeeling() {
    if (!canSubmit) {
      return;
    }

    if (!canSend(STORAGE_KEYS.feelingLastSent, FEELING_CLIENT_COOLDOWN_MS)) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const result = await postJson("/api/feeling", {
      message: trimmed,
      timestamp: new Date().toISOString(),
    });

    if (result.success) {
      markSent(STORAGE_KEYS.feelingLastSent);
      setStatus("sent");
      setMessage("");
      return;
    }

    setStatus("error");
  }

  return (
    <motion.section
      aria-labelledby="feeling-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="feeling-heading" className="font-display text-3xl text-ink">
        মনটা খুলে বলো
      </h2>
      <p className="mt-2 leading-relaxed text-muted">
        যা লাগছে, এখানে লিখে পাঠিয়ে দাও। Tarak পড়বে। আর কিছু explain করতে হবে
        না।
      </p>
      <form
        className="glass-card mt-5 rounded-[1.75rem] p-5"
        onSubmit={(event) => {
          event.preventDefault();
          void sendFeeling();
        }}
      >
        <label htmlFor="feeling-note" className="sr-only">
          তোমার অনুভূতি
        </label>
        <textarea
          id="feeling-note"
          name="feeling"
          rows={5}
          maxLength={MAX_LENGTH}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
            }
          }}
          placeholder="আজ কেমন লাগছে, এখানে লিখো…"
          className="min-h-32 w-full resize-y rounded-2xl bg-white/80 px-4 py-3 text-base leading-relaxed text-ink placeholder:text-muted/70 ring-1 ring-rose/30 outline-none transition focus-visible:ring-2 focus-visible:ring-deep-rose/45"
        />
        <div className="mt-2 flex justify-end text-xs text-muted">
          {trimmed.length}/{MAX_LENGTH}
        </div>
        <button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-deep-rose px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(201,106,121,0.28)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50 disabled:opacity-60"
        >
          {status === "sending" ? "পাঠানো হচ্ছে…" : "Tarak-কে পাঠাও ❤️"}
        </button>
        {status === "sent" ? (
          <p role="status" className="mt-3 text-sm font-semibold text-deep-rose">
            পেয়ে গেছে। তুমি ভালো করেছো যে বললে।
          </p>
        ) : null}
        {status === "error" ? (
          <p role="status" className="mt-3 text-sm text-muted">
            এখন পাঠানো গেল না। একটু পরে আবার চেষ্টা করো।
          </p>
        ) : null}
      </form>
    </motion.section>
  );
}
