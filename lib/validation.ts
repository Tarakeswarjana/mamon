import { z } from "zod";
import { FOOD_ITEM_VALUES } from "@/lib/constants";

export const visitSchema = z.object({
  sessionId: z.string().min(8).max(128),
});

export const wishlistSchema = z.object({
  item: z.enum(FOOD_ITEM_VALUES),
  timestamp: z.string().min(1).max(80),
});

export const needYouSchema = z.object({
  timestamp: z.string().min(1).max(80).optional(),
});

export const feelingSchema = z.object({
  message: z.string().trim().min(2).max(2000),
  timestamp: z.string().min(1).max(80),
});

export const hugSchema = z.object({
  timestamp: z.string().min(1).max(80),
});

export type VisitPayload = z.infer<typeof visitSchema>;
export type WishlistPayload = z.infer<typeof wishlistSchema>;
export type NeedYouPayload = z.infer<typeof needYouSchema>;
export type FeelingPayload = z.infer<typeof feelingSchema>;
export type HugPayload = z.infer<typeof hugSchema>;
