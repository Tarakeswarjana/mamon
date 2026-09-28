export const GIRLFRIEND_NAME =
  process.env.NEXT_PUBLIC_GIRLFRIEND_NAME || "Mamon";

export const BOYFRIEND_NAME = "Tarak";

export const NOTIFICATION_EMAIL =
  process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL ||
  "tarakeswarjana0808@gmail.com";

export const SITE_NAME = "A Little Care For You";

export const SITE_TAGLINE = "A tiny corner of the internet, made for you.";

export const VISIT_COOLDOWN_MS = 30 * 60 * 1000;
export const NEED_YOU_CLIENT_COOLDOWN_MS = 2 * 60 * 1000;
export const WISHLIST_CLIENT_COOLDOWN_MS = 15 * 1000;
export const FEELING_CLIENT_COOLDOWN_MS = 20 * 1000;
export const HUG_CLIENT_COOLDOWN_MS = 60 * 1000;

export const RATE_LIMITS = {
  visit: { limit: 1, windowMs: 30 * 60 * 1000 },
  wishlist: { limit: 8, windowMs: 60 * 60 * 1000 },
  feeling: { limit: 8, windowMs: 60 * 60 * 1000 },
  hug: { limit: 6, windowMs: 60 * 60 * 1000 },
  needYou: { limit: 3, windowMs: 10 * 60 * 1000 },
} as const;

export const FOOD_OPTIONS = [
  { item: "Chocolate", emoji: "🍫" },
  { item: "Ice Cream", emoji: "🍦" },
  { item: "Pizza", emoji: "🍕" },
  { item: "Something warm", emoji: "🍜" },
  { item: "Cake", emoji: "🍰" },
  { item: "Cold drink", emoji: "🥤" },
  { item: "Tea / Coffee", emoji: "🍵" },
  { item: "Momos", emoji: "🥟" },
] as const;

export type FoodItem = (typeof FOOD_OPTIONS)[number]["item"];

export const FOOD_ITEM_VALUES = FOOD_OPTIONS.map((option) => option.item) as [
  FoodItem,
  ...FoodItem[],
];

export const STORAGE_KEYS = {
  introOpened: "care.introOpened",
  visitSession: "care.visitSession",
  visitLastSent: "care.visitLastSent",
  needYouLastSent: "care.needYouLastSent",
  wishlistLastSent: "care.wishlistLastSent",
  feelingLastSent: "care.feelingLastSent",
  hugLastSent: "care.hugLastSent",
  installDismissed: "care.installDismissed",
  privacySeen: "care.privacySeen",
} as const;
