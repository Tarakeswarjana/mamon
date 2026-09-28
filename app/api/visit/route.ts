import { RATE_LIMITS } from "@/lib/constants";
import { sendVisitNotification } from "@/lib/email";
import { handleNotificationRequest } from "@/lib/http";
import { visitSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  return handleNotificationRequest({
    request,
    schema: visitSchema,
    bucket: "visit",
    limit: RATE_LIMITS.visit.limit,
    windowMs: RATE_LIMITS.visit.windowMs,
    run: async () => {
      await sendVisitNotification();
    },
  });
}
