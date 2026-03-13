import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpotyShare — Community Playlists",
  description:
    "Create collaborative Spotify playlists. Add songs, vote, and let the community curate the best music.",
  openGraph: {
    title: "SpotyShare — Community Playlists",
    description:
      "Create collaborative Spotify playlists. Add songs, vote, and let the community curate the best music.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
