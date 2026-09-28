"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEYS.installDismissed)) {
        return;
      }
    } catch {
      // ignore
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone));

    if (standalone) {
      return;
    }

    function onPrompt(event: Event) {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", onPrompt);

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const timer = window.setTimeout(() => {
      if (isIos) {
        setIosHint(true);
      }
    }, 18000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    setIosHint(false);
    setDeferred(null);
    try {
      localStorage.setItem(STORAGE_KEYS.installDismissed, "1");
    } catch {
      // ignore
    }
  }

  async function install() {
    if (!deferred) {
      dismiss();
      return;
    }
    await deferred.prompt();
    dismiss();
  }

  if (!visible && !iosHint) {
    return null;
  }

  return (
    <div className="glass-card mt-10 rounded-[1.75rem] p-5">
      <p className="font-display text-2xl text-ink">
        Keep this little place on your phone? ❤️
      </p>
      {iosHint && !visible ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          On iPhone: tap Share, then Add to Home Screen.
        </p>
      ) : (
        <p className="mt-2 text-sm text-muted">
          So it&apos;s here whenever you need a soft place to land.
        </p>
      )}
      <div className="mt-4 flex gap-2">
        {visible ? (
          <button
            type="button"
            onClick={install}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-deep-rose px-4 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/50"
          >
            Keep it
          </button>
        ) : null}
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-rose/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
