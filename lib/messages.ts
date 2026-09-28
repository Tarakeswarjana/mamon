import { BOYFRIEND_NAME, GIRLFRIEND_NAME } from "@/lib/constants";

export type MoodId = "not-great" | "tired" | "cramps" | "okay";

export const MOODS: {
  id: MoodId;
  label: string;
  emoji: string;
  response: string;
}[] = [
  {
    id: "not-great",
    emoji: "🥺",
    label: "Not great",
    response:
      "আজকে মনটা ভালো নেই বুঝতে পারছি… তুমি কিছু explain করতে হবে না। শুধু একটু আমার কাছে থাকো। যা খারাপ লাগছে, সবটা আমার সাথে share করতে পারো। আজ তোমার হাসির দায়িত্বটা আমার। ❤️",
  },
  {
    id: "tired",
    emoji: "😴",
    label: "Tired",
    response:
      "অনেক ক্লান্ত তুমি… আজ আর কিছু prove করতে হবে না। সব কাজ, সব চিন্তা একটু পাশে রেখে চোখ দুটো বন্ধ করো। তুমি শুধু বিশ্রাম নাও, বাকিটা কাল দেখা যাবে। আমি আছি তোমার পাশে। 🫶🏻🌙",
  },
  {
    id: "cramps",
    emoji: "😣",
    label: "Cramps",
    response:
      "আহা, আবার ব্যথা হচ্ছে? 🥺 তুমি এখন শুধু আরামে শুয়ে থাকো। একটু গরম সেঁক নাও, জল খাও আর নিজের যত্ন নাও। যদি পারতাম, এখনই তোমার পাশে বসে মাথায় হাত বুলিয়ে দিতাম। ❤️‍🩹",
  },
  {
    id: "okay",
    emoji: "🥰",
    label: "I'm okay",
    response:
      "এই তো আমার মেয়েটা! 🥰 তুমি ভালো আছো শুনলেই আমার মনটাও ভালো হয়ে যায়। তবে ‘আমি okay’ বললেই কিন্তু দায়িত্ব শেষ না—আজ একটু বেশি আদর আর যত্ন তোমার প্রাপ্য। 💕",
  },
];

export const COMFORT_MESSAGES = [
  "আজ সবকিছু করতে হবে না।",
  "বিশ্রাম নেওয়াটা দোষের কিছু না।",
  "এদিকে এসো। 🫂",
  "আজ তুমি একটু extra attention পাবে।",
  "তুমি বোঝা না। তুমি আমার প্রিয় মানুষ, শুধু আজ কষ্ট পাচ্ছো।",
  "Slow is still a perfectly acceptable pace.",
  "নরম থাকা মানে দুর্বল হওয়া না।",
  "দুনিয়া অপেক্ষা করতে পারে। তোমাকে পেছনে ফেলা যাবে না।",
  "জল খাও, love. তারপর কিছু না করলেও চলবে।",
  "আজ impressive হতে হবে না।",
  "If all you did was make it through, that is already enough.",
  "যা কেউ দেখে না, সেগুলোর জন্যও আমি তোমার গর্বিত।",
  "আজ দিনটা নরম থাকুক। বাকিটা আমি সামলাব।",
  "কারো জন্য brighter mood বানিয়ে রাখতে হবে না।",
  "চুপচাপ পাশে বসো। কথা না বললেও চলবে।",
  "আগে তোমার আরাম। To-do list না।",
  "ভালো দিনেও ভালোবাসি। খারাপ দিনে আরও সত্যি করে ভালোবাসি।",
  "এক সেকেন্ড চোখ বন্ধ করো। আমি এখানেই আছি।",
  "You get to be taken care of. That is not a favour. It is a given.",
  "আজকের কিছুই তোমাকে কম সুন্দর করে না।",
  "যা খেতে ইচ্ছে করে, তাই খাও। নরম জামা পরে থাকো।",
  "তুমি অনেক ভালো করছো, অনুভব না করলেও।",
  "ফোনে চুপ করে থাকতে চাইলেও আমি থাকব।",
  "ছোট লাগলেও আজ জায়গা নিয়ে থাকতে পারো।",
  "এদিকে এসো। প্ল্যান এটুকুই।",
];

export const LOVE_NOTES = [
  "তুমি বিশ্রাম নিতে পারো।",
  "প্রতিদিন productive হতে হবে না।",
  "খারাপ দিন মানে তোমাকে ভালোবাসা কঠিন হয়ে যায় না।",
  "সবচেয়ে রাগের দিনেও আমি তোমাকেই বেছে নেব।",
  "তুমি যতটা ভাবো, তার থেকে অনেক বেশি শক্ত।",
  "আর হ্যাঁ, রাগ করলেও তোমাকে কিউট লাগে।",
  "You don't have to earn tenderness. It already belongs to you.",
  "চমকাতে চাইলেও ভালো লাগে। চুপ থাকলেও ভালো লাগে।",
  "আজ যা অনুভব করছো, আমার কাছে সেটা বেশি নয়।",
  "দিনটা ক্যান্সেল করলেও তুমি extraordinary।",
  "I didn't fall for the easy version of you. I fell for all of you.",
  "তুমি পিছিয়ে নেই। তুমি একজন মানুষ, যার একটা শরীর আছে।",
  "দুনিয়া কঠিন লাগলে আমার কাছে চলে এসো। আমি ইচ্ছে করেই নরম।",
  "বিশ্রাম নিলে তুমি কম ambitious হয়ে যাও না।",
  "সাধারণ দিনগুলোও আমি তোমার সাথেই চাই।",
  "তোমার সাথে আমার জীবনটা বাড়ির মতো লাগে।",
  "তোমার চুপচাপ থাকাটাও আমার পাশে বসার জায়গা।",
  "তুমি যতটা deserve করো ভাবো, তার থেকে বেশি যত্ন চাইতে পারো।",
  "ছোট ছোট জিনিস মনে থাকে। তুমি মনে থাকো।",
  "আজকের কোনো version-এই তুমি too much না।",
  "আমার জন্য okay হয়ে দেখাতে হবে না।",
  "এখান থেকেও কেউ তোমাকে নরম করে ভাবছে, সেটা যেন টের পাও।",
  "If I could, I would trade you my calm for your ache.",
  "তুমি আমার favourite almost-everything, আর আমার exactly-you।",
  "এই ভালোবাসা seasonal না। তোমার দরকার হলে এটা বন্ধ হয় না।",
  "নিজেকে সন্দেহ করলে আমার নিশ্চয়তা ধার নিয়ে নাও। অনেক আছে।",
  `Hi ${GIRLFRIEND_NAME}। এই নোটটা শুধু তোমার নাম, কারণ বলতে ইচ্ছে করে।`,
  "থাকো। আরাম করো। ভালোবাসা নিয়ে থাকো। কাজ এটুকুই।",
];

export const SECRET_LETTER = `Hey ${GIRLFRIEND_NAME},

আমি cramps, ক্লান্তি বা খারাপ মেজাজ
নিয়ে যেতে পারি না হয়তো।

কিন্তু এটা মনে করিয়ে দিতে পারি —
তুমি একা নও।

আজকে আরাম করো।

যা খেতে খুশি, তাই খাও।

যত খুশি complain করো।

দরকার হলেই কল করো।

আর আজকে যদি ১%ও সহজ করার
কিছু থাকে, আমাকে বলো।

আমি আছি। ❤️

— ${BOYFRIEND_NAME}`;

export const BREATHING_COPY =
  "পরের এক মিনিট কিছু ঠিক করতে হবে না।";

export function pickAnother<T>(list: readonly T[], current: T | null): T {
  if (list.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  const pool =
    current === null ? [...list] : list.filter((item) => item !== current);
  const source = pool.length > 0 ? pool : list;
  const chosen = source[Math.floor(Math.random() * source.length)];

  if (chosen === undefined) {
    const fallback = list[0];
    if (fallback === undefined) {
      throw new Error("Cannot pick from an empty list.");
    }
    return fallback;
  }

  return chosen;
}
