import "server-only";

import nodemailer from "nodemailer";
import { BOYFRIEND_NAME, GIRLFRIEND_NAME } from "@/lib/constants";

type MailPayload = {
  subject: string;
  text: string;
};

const NOTIFICATION_INBOX =
  process.env.NOTIFICATION_EMAIL || "tarakeswarjana0808@gmail.com";

function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
}

function getTransporter() {
  const port = Number(process.env.SMTP_PORT || 465);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendMail({ subject, text }: MailPayload) {
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[email:dev]", subject, "\n", text);
      return;
    }

    throw new Error("Email is not configured");
  }

  const transporter = getTransporter();
  const to = NOTIFICATION_INBOX;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"${GIRLFRIEND_NAME}'s little website" <${from}>`,
    to,
    subject,
    text,
  });
}

export async function sendVisitNotification() {
  await sendMail({
    subject: "💗 She opened your little website",
    text: `She just opened the little website you made for her.

Maybe now is a good time to prepare a surprise. ❤️`,
  });
}

export async function sendWishlistNotification(item: string) {
  const match = {
    Chocolate: "Chocolate 🍫",
    "Ice Cream": "Ice Cream 🍦",
    Pizza: "Pizza 🍕",
    "Something warm": "Something warm 🍜",
    Cake: "Cake 🍰",
    "Cold drink": "Cold drink 🥤",
    "Tea / Coffee": "Tea / Coffee 🍵",
    Momos: "Momos 🥟",
  } as Record<string, string>;

  await sendMail({
    subject: "🚨 Girlfriend Emergency Request ❤️",
    text: `She wants:

${match[item] || item}

Your mission has been assigned.

Go make her day better. ❤️`,
  });
}

export async function sendFeelingNotification(message: string) {
  await sendMail({
    subject: "💌 She shared how she's feeling",
    text: `She wanted you to know this:

${message}

— Sent from the little website you made for ${GIRLFRIEND_NAME}.`,
  });
}

export async function sendHugNotification() {
  await sendMail({
    subject: "🫂 Mamon asked for a hug",
    text: `${GIRLFRIEND_NAME} held for a hug on the little website.

She wants you close. Call her, text her, or go to her if you can. ❤️

— ${BOYFRIEND_NAME}`,
  });
}

export async function sendNeedYouNotification() {
  await sendMail({
    subject: "🚨 Boyfriend Summoned ❤️",
    text: `Drop whatever you're doing.

She wants you. ❤️

— Sent from the little website you made for ${GIRLFRIEND_NAME}, ${BOYFRIEND_NAME}.`,
  });
}
