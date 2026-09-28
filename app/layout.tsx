import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Noto_Sans_Bengali, Nunito } from "next/font/google";
import "./globals.css";
import { GIRLFRIEND_NAME, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} ❤️`,
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  authors: [{ name: "Tarak" }],
  robots: { index: false, follow: false },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "For You",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  keywords: [GIRLFRIEND_NAME, "care", "love"],
};

export const viewport: Viewport = {
  themeColor: "#FFF8F7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${cormorant.variable} ${caveat.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full min-h-dvh bg-background font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
