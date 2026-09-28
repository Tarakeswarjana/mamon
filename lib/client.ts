import {
  NEED_YOU_CLIENT_COOLDOWN_MS,
  STORAGE_KEYS,
  VISIT_COOLDOWN_MS,
  WISHLIST_CLIENT_COOLDOWN_MS,
} from "@/lib/constants";

type ApiResponse = {
  success: boolean;
  message: string;
};

export async function postJson(path: string, body: unknown): Promise<ApiResponse> {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as ApiResponse;

    return {
      success: Boolean(data?.success),
      message: data?.message || "Unable to process request",
    };
  } catch {
    return { success: false, message: "Unable to process request" };
  }
}

function readNumber(key: string) {
  try {
    return Number(localStorage.getItem(key) || 0);
  } catch {
    return 0;
  }
}

function writeNumber(key: string, value: number) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Private browsing can block storage. Fail open on the client;
    // the server still rate-limits.
  }
}

export function canSend(key: string, cooldownMs: number) {
  const last = readNumber(key);
  return !last || Date.now() - last >= cooldownMs;
}

export function markSent(key: string) {
  writeNumber(key, Date.now());
}

export function visitAllowed() {
  try {
    if (sessionStorage.getItem(STORAGE_KEYS.visitSession)) {
      return false;
    }
  } catch {
    // ignore
  }

  return canSend(STORAGE_KEYS.visitLastSent, VISIT_COOLDOWN_MS);
}

export function markVisitSent(sessionId: string) {
  try {
    sessionStorage.setItem(STORAGE_KEYS.visitSession, sessionId);
  } catch {
    // ignore
  }
  markSent(STORAGE_KEYS.visitLastSent);
}

export function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export const clientCooldowns = {
  visit: VISIT_COOLDOWN_MS,
  needYou: NEED_YOU_CLIENT_COOLDOWN_MS,
  wishlist: WISHLIST_CLIENT_COOLDOWN_MS,
};
