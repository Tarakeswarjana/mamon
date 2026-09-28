import { RATE_LIMITS } from "@/lib/constants";
import { sendHugNotification } from "@/lib/email";
import { handleNotificationRequest } from "@/lib/http";
import { hugSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  return handleNotificationRequest({
    request,
    schema: hugSchema,
    bucket: "hug",
    limit: RATE_LIMITS.hug.limit,
    windowMs: RATE_LIMITS.hug.windowMs,
    run: async () => {
      await sendHugNotification();
    },
  });
}
