# A Little Care For You ❤️

A private Next.js website. A small, quiet corner of the internet for one person — not a period tracker, not a medical app, not a product.

It is meant to feel like a digital gift: warm, unhurried, and made by hand.

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

That is the only command you need for local development.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

| Variable | Where it runs | Purpose |
| --- | --- | --- |
| `SMTP_HOST` | Server only | SMTP hostname, e.g. `smtp.gmail.com` |
| `SMTP_PORT` | Server only | `465` (SSL) or `587` (STARTTLS) |
| `SMTP_USER` | Server only | SMTP username, usually your Gmail address |
| `SMTP_PASS` | Server only | SMTP password or Gmail App Password |
| `NOTIFICATION_EMAIL` | Server only | Inbox that receives the care alerts |
| `SMTP_FROM` | Server only, optional | From address. Defaults to `SMTP_USER` |
| `NEXT_PUBLIC_GIRLFRIEND_NAME` | Browser-safe | The name shown in the greeting and letter |
| `UPSTASH_REDIS_REST_URL` | Server only, optional | Production rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Server only, optional | Production rate limiting |

Never put `SMTP_USER`, `SMTP_PASS`, or `NOTIFICATION_EMAIL` in client code. Only Route Handlers in `app/api` may send mail.

If SMTP is missing, local development still runs. Emails are printed to the terminal instead of being sent. In production, unconfigured email fails closed with a generic error.

## SMTP setup (Gmail)

1. Use a Google account with 2-Step Verification enabled.
2. Open [Google App Passwords](https://myaccount.google.com/apppasswords).
3. Create an app password for “Mail”.
4. Put these values in `.env.local` and in Vercel:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=you@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=you@gmail.com
```

Gmail may reject sign-in from less secure apps. An App Password is the reliable path.

Other providers work the same way: host, port, user, pass, destination inbox.

## Local development

1. Install dependencies with `npm install`.
2. Add `.env.local`.
3. Run `npm run dev`.
4. Keep the terminal open. Visit, wishlist, and “I need you” actions log there until SMTP is configured.

Useful scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Vercel deployment

This project is App Router + Route Handlers only. It is meant to deploy to Vercel as a single Next.js app.

1. Push the project to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the environment variables from the table above.
4. Deploy.

No Express server. No Docker. No separate frontend. No cron jobs. No WebSockets.

After deploy, open the production URL on your phone and add it to the home screen if you want it to feel like a little app.

### Optional Redis

Vercel serverless instances do not share memory. The included rate limiter still works without Redis (and is enough for a private site). If you want limits to persist across instances later, create a free [Upstash Redis](https://upstash.com/) rest database and set:

```text
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The app does not require Redis to run.

## Customization

### Her name

Set `NEXT_PUBLIC_GIRLFRIEND_NAME` in `.env.local` and Vercel.

The fallback lives in `lib/constants.ts`.

### His name

Change `BOYFRIEND_NAME` in `lib/constants.ts`.

### Messages

All copy lives in `lib/messages.ts`:

- mood replies
- comfort messages (20+)
- love notes (25+)
- the secret letter
- breathing line

Change the arrays. The UI picks them up.

### Colors

The palette is in `app/globals.css` under `:root`.

```text
Background: #FFF8F7
Secondary: #FFF0F1
Rose: #EFA3AC
Deep Rose: #C96A79
Lavender: #D9C7E8
Cream: #FFF5E9
Text: #49383B
Muted Text: #8D777B
```

### Email

`lib/email.ts` owns the notifications:

- `sendVisitNotification`
- `sendWishlistNotification`
- `sendNeedYouNotification`

### Adding a new surprise food

1. Add it to `FOOD_OPTIONS` in `lib/constants.ts`.
2. Add a matching line in `sendWishlistNotification` if you want a custom emoji in the email.

## Privacy

The site can notify you when she:

- opens it (once per session, with a cooldown)
- asks for a food
- presses **I just want you**

There is no hidden tracking, no fingerprinting, and no third-party analytics.

## Project shape

```text
app/           pages, metadata, Route Handlers
components/    the experience
lib/           messages, email, validation, rate limiting
public/        PWA icons and the service worker
```
