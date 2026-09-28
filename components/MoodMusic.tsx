"use client";

import { MOOD_PLAYLIST, type MoodTrack } from "@/lib/playlist";
import { Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export function MoodMusic() {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState<MoodTrack | null>(null);

  return (
    <motion.section
      aria-labelledby="music-heading"
      className="mt-10"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="music-heading" className="font-display text-3xl text-ink">
        মন ভালো করার গান 🎵
      </h2>
      <p className="mt-2 leading-relaxed text-muted">
        একটা বাংলা গান বেছে নাও। একটু fresher লাগবে। তুমি যখন খুশি play করো।
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3">
        {MOOD_PLAYLIST.map((track) => {
          const active = current?.id === track.id;

          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setCurrent(track)}
              aria-pressed={active}
              className={`glass-card flex min-h-16 items-center gap-3 rounded-3xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-rose/40 ${
                active ? "ring-2 ring-deep-rose/45 bg-white" : "hover:bg-white/90"
              }`}
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={`https://i.ytimg.com/vi/${track.youtubeId}/hqdefault.jpg`}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">
                  {track.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted">
                  {track.artist}
                </span>
              </span>
              <Play
                className="h-4 w-4 shrink-0 text-deep-rose"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mt-4 overflow-hidden rounded-[1.75rem] p-3"
          >
            <p className="px-2 pb-3 text-sm font-semibold text-ink">
              এখন চলছে: {current.title}
            </p>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink/10">
              <iframe
                title={`${current.title} by ${current.artist}`}
                src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
