import "server-only";

type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
};

type MemoryEntry = {
  count: number;
  reset: number;
};

const memoryStore = new Map<string, MemoryEntry>();

function pruneMemory(now: number) {
  if (memoryStore.size < 500) {
    return;
  }

  for (const [key, entry] of memoryStore) {
    if (entry.reset <= now) {
      memoryStore.delete(key);
    }
  }
}

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  pruneMemory(now);

  const existing = memoryStore.get(key);

  if (!existing || existing.reset <= now) {
    const reset = now + windowMs;
    memoryStore.set(key, { count: 1, reset });
    return { success: true, remaining: Math.max(0, limit - 1), reset };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, reset: existing.reset };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: Math.max(0, limit - existing.count),
    reset: existing.reset,
  };
}

function hasRedis() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

async function redisLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return memoryLimit(key, limit, windowMs);
  }

  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const namespaced = `care:rl:${key}`;

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", namespaced],
      ["EXPIRE", namespaced, windowSeconds, "NX"],
      ["PTTL", namespaced],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    return memoryLimit(key, limit, windowMs);
  }

  const payload = (await response.json()) as { result?: unknown }[];
  const count = Number(payload?.[0]?.result ?? 0);
  const ttlMs = Number(payload?.[2]?.result ?? windowMs);
  const reset = Date.now() + (ttlMs > 0 ? ttlMs : windowMs);

  if (!Number.isFinite(count) || count > limit) {
    return { success: false, remaining: 0, reset };
  }

  return {
    success: true,
    remaining: Math.max(0, limit - count),
    reset,
  };
}

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (hasRedis()) {
    try {
      return await redisLimit(key, limit, windowMs);
    } catch (error) {
      console.error("[rate-limit] redis fallback", error instanceof Error ? error.message : "error");
    }
  }

  return memoryLimit(key, limit, windowMs);
}
