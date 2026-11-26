import type { NextConfig } from "next";

// Static export for SiteGround: `next build` writes plain HTML/JS/CSS to /out.
// The chat backend is public/api/chat.php (PHP runs on SiteGround).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
