import { RATE_LIMITS } from "@/lib/constants";
import { sendWishlistNotification } from "@/lib/email";
import { handleNotificationRequest } from "@/lib/http";
import { wishlistSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  return handleNotificationRequest({
    request,
    schema: wishlistSchema,
    bucket: "wishlist",
    limit: RATE_LIMITS.wishlist.limit,
    windowMs: RATE_LIMITS.wishlist.windowMs,
    run: async (data) => {
      await sendWishlistNotification(data.item);
    },
  });
}
