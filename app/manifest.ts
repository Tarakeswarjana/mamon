import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "For You",
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F7",
    theme_color: "#FFF8F7",
    lang: "en",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["lifestyle"],
    id: "/",
  };
}
