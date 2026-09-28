"use client";

import { createSessionId, markVisitSent, postJson, visitAllowed } from "@/lib/client";
import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    if (!visitAllowed()) {
      return;
    }

    const sessionId = createSessionId();

    void postJson("/api/visit", { sessionId }).then((result) => {
      if (result.success) {
        markVisitSent(sessionId);
      }
    });
  }, []);

  return null;
}
