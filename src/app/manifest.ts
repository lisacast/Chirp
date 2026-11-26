import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PlayChirp",
    short_name: "PlayChirp",
    description: "Practice skills for emotions, stress and relationships with Chirp.",
    start_url: "/",
    display: "standalone",
    background_color: "#b8cdd2",
    theme_color: "#b8cdd2",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
