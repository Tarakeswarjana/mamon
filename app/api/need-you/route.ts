import { RATE_LIMITS } from "@/lib/constants";
import { sendNeedYouNotification } from "@/lib/email";
import { handleNotificationRequest } from "@/lib/http";
import { needYouSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  return handleNotificationRequest({
    request,
    schema: needYouSchema,
    bucket: "need-you",
    limit: RATE_LIMITS.needYou.limit,
    windowMs: RATE_LIMITS.needYou.windowMs,
    run: async () => {
      await sendNeedYouNotification();
    },
  });
}
