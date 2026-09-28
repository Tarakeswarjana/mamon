import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const GENERIC_ERROR = "Unable to process request";
const GENERIC_SUCCESS = "Notification sent";

export function jsonSuccess(message = GENERIC_SUCCESS, status = 200) {
  return NextResponse.json({ success: true, message }, { status });
}

export function jsonError(message = GENERIC_ERROR, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return ip.slice(0, 64);
}

export async function parseJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function handleNotificationRequest<T>({
  request,
  schema,
  bucket,
  limit,
  windowMs,
  run,
}: {
  request: Request;
  schema: ZodType<T>;
  bucket: string;
  limit: number;
  windowMs: number;
  run: (data: T) => Promise<void>;
}) {
  try {
    const key = `${bucket}:${getClientKey(request)}`;
    const limited = await rateLimit(key, limit, windowMs);

    if (!limited.success) {
      return jsonError(GENERIC_ERROR, 429);
    }

    const body = await parseJson(request);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return jsonError(GENERIC_ERROR, 400);
    }

    await run(parsed.data);
    return jsonSuccess();
  } catch (error) {
    console.error(`[${bucket}]`, error instanceof Error ? error.message : "error");
    return jsonError(GENERIC_ERROR, 500);
  }
}
