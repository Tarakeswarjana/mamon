"use client";

import { PrivacyModal } from "@/components/PrivacyModal";
import { BOYFRIEND_NAME } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="mt-16 pb-4 text-center">
      <Image
        src="/images/petal.svg"
        alt=""
        width={18}
        height={24}
        className="mx-auto mb-3 opacity-80"
        unoptimized
      />
      <p className="font-display text-xl text-ink">
        Made with ridiculous amounts of care
      </p>
      <p className="mt-1 text-sm text-muted">by {BOYFRIEND_NAME}</p>
      <button
        type="button"
        onClick={() => setPrivacyOpen(true)}
        className="mt-5 text-sm font-semibold text-deep-rose underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40"
      >
        Privacy
      </button>
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
