"use client";

/**
 * Visit emails need SMTP. Without a password we skip silent visit alerts
 * so we never pop open the mail app on page load.
 */
export function VisitTracker() {
  return null;
}
