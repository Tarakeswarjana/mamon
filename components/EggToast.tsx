"use client";

import { EGG_EVENT } from "@/lib/eggs";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function EggToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function onEgg(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
    }

    window.addEventListener(EGG_EVENT, onEgg);
    return () => window.removeEventListener(EGG_EVENT, onEgg);
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }
    const timer = window.setTimeout(() => setMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-40 flex justify-center px-4">
      <AnimatePresence>
        {message ? (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-auto max-w-sm whitespace-pre-line rounded-full bg-ink px-5 py-3 text-center text-sm text-white shadow-lift"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
