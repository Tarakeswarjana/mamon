"use client";

import { showEgg } from "@/lib/eggs";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

const HEARTS: {
  id: number;
  top: string;
  size: number;
  delay: number;
  left?: string;
  right?: string;
}[] = [
  { id: 1, top: "8%", left: "6%", size: 22, delay: 0 },
  { id: 2, top: "18%", right: "8%", size: 16, delay: 1.2 },
  { id: 3, top: "42%", left: "4%", size: 14, delay: 0.6 },
  { id: 4, top: "58%", right: "5%", size: 20, delay: 1.8 },
  { id: 5, top: "78%", left: "10%", size: 13, delay: 0.3 },
  { id: 6, top: "88%", right: "12%", size: 18, delay: 2.1 },
];

const PETALS = [
  { left: "12%", delay: "0s", duration: "14s" },
  { left: "28%", delay: "3s", duration: "16s" },
  { left: "47%", delay: "6s", duration: "18s" },
  { left: "63%", delay: "2s", duration: "15s" },
  { left: "81%", delay: "8s", duration: "17s" },
];

export function FloatingHearts() {
  const reduceMotion = useReducedMotion();
  const [caught, setCaught] = useState(0);
  const pressTimer = useRef<number | null>(null);

  function catchHeart() {
    const next = caught + 1;
    setCaught(next);
    showEgg(next >= 5 ? "Okay okay, all of them are yours." : "Caught one ❤️");
  }

  function startLongPress() {
    pressTimer.current = window.setTimeout(() => {
      showEgg("Achievement unlocked:\nProfessional Heart Stealer ❤️");
    }, 650);
  }

  function endLongPress() {
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((petal) => (
        <span
          key={petal.left}
          className="petal petal-fall"
          style={{
            left: petal.left,
            animation: reduceMotion
              ? undefined
              : `drift ${petal.duration} linear ${petal.delay} infinite`,
          }}
        />
      ))}
      {HEARTS.map((heart) => (
        <motion.button
          key={heart.id}
          type="button"
          className="pointer-events-auto absolute text-deep-rose/70 focus-visible:outline-none"
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
            fontSize: heart.size,
          }}
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5 + heart.delay, repeat: Infinity, ease: "easeInOut" }}
          tabIndex={-1}
          onClick={catchHeart}
          onPointerDown={startLongPress}
          onPointerUp={endLongPress}
          onPointerLeave={endLongPress}
          aria-label="Floating heart"
        >
          ❤️
        </motion.button>
      ))}
    </div>
  );
}
