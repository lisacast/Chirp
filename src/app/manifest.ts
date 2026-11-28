import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chirp",
    short_name: "Chirp",
    description: "Practice skills for emotions, stress and relationships with Chirp.",
    start_url: "/",
    display: "standalone",
    background_color: "#001c38",
    theme_color: "#001c38",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
