import { RATE_LIMITS } from "@/lib/constants";
import { sendFeelingNotification } from "@/lib/email";
import { handleNotificationRequest } from "@/lib/http";
import { feelingSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  return handleNotificationRequest({
    request,
    schema: feelingSchema,
    bucket: "feeling",
    limit: RATE_LIMITS.feeling.limit,
    windowMs: RATE_LIMITS.feeling.windowMs,
    run: async (data) => {
      await sendFeelingNotification(data.message);
    },
  });
}
