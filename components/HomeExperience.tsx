"use client";

import { BreathingExercise } from "@/components/BreathingExercise";
import { ComfortMenu } from "@/components/ComfortMenu";
import { EggToast } from "@/components/EggToast";
import { FloatingHearts } from "@/components/FloatingHearts";
import { FoodPicker } from "@/components/FoodPicker";
import { FeelingShare } from "@/components/FeelingShare";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InstallPrompt } from "@/components/InstallPrompt";
import { IntroScreen } from "@/components/IntroScreen";
import { LoveNotes } from "@/components/LoveNotes";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodMusic } from "@/components/MoodMusic";
import { NeedYouButton } from "@/components/NeedYouButton";
import { PwaRegister } from "@/components/PwaRegister";
import { SecretLetter } from "@/components/SecretLetter";
import { VirtualHug } from "@/components/VirtualHug";
import { VisitTracker } from "@/components/VisitTracker";
import { STORAGE_KEYS } from "@/lib/constants";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => undefined;
}

function readIntroOpened() {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.introOpened) === "1";
  } catch {
    return false;
  }
}

export function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const storedOpened = useSyncExternalStore(
    subscribeNoop,
    readIntroOpened,
    () => false,
  );
  const [openedNow, setOpenedNow] = useState(false);
  const opened = storedOpened || openedNow;

  function openSurprise() {
    try {
      sessionStorage.setItem(STORAGE_KEYS.introOpened, "1");
    } catch {
      // ignore
    }
    setOpenedNow(true);
  }

  return (
    <div className="relative min-h-dvh">
      <a
        href="#care-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to care
      </a>
      <FloatingHearts />
      <VisitTracker />
      <PwaRegister />
      <EggToast />
      <AnimatePresence mode="wait">
        {!opened ? (
          <IntroScreen key="intro" onOpen={openSurprise} />
        ) : (
          <motion.main
            key="main"
            id="care-content"
            className="safe-pad relative z-10 mx-auto w-full max-w-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero />
            <MoodSelector />
            <ComfortMenu />
            <MoodMusic />
            <FoodPicker />
            <VirtualHug />
            <BreathingExercise />
            <LoveNotes />
            <NeedYouButton />
            <SecretLetter />
            <InstallPrompt />
            <FeelingShare />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
