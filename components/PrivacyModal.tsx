"use client";

import { BOYFRIEND_NAME } from "@/lib/constants";
import { useEffect, useId, useRef } from "react";

type PrivacyModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close privacy note"
        className="absolute inset-0 bg-ink/25"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative m-4 max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white p-6 shadow-lift"
      >
        <h2 id={titleId} className="font-display text-3xl text-ink">
          A quiet note about privacy
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink">
          <p>
            Some buttons can open your phone&apos;s mail app with a ready note
            for {BOYFRIEND_NAME} — food, hug, feelings, or “I just want you”.
            You only send it if you press Send.
          </p>
          <p>Your location is never collected.</p>
          <p className="text-muted">
            There is no hidden tracking, no fingerprinting, and no third-party
            analytics.
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-deep-rose px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50"
        >
          Okay, that feels good
        </button>
      </div>
    </div>
  );
}
