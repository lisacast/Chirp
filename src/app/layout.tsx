import type { Metadata, Viewport } from "next";
import { Fraunces, Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz", "SOFT"] });

export const metadata: Metadata = {
  title: "Chirp",
  description: "Practice skills for emotions, stress and relationships with Chirp, your friendly guide.",
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-192.png", type: "image/png" }], apple: "/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: "Chirp", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#001c38",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${fraunces.variable} antialiased`}>{children}</body>
    </html>
  );
}
