import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpotyShare — Personal Playlist Manager",
  description:
    "Manage your Spotify playlists with community voting. Create playlists, let others vote, and sync the best tracks automatically.",
  openGraph: {
    title: "SpotyShare — Personal Playlist Manager",
    description:
      "Manage your Spotify playlists with community voting. Create playlists, let others vote, and sync the best tracks automatically.",
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
      <body className={`${inter.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
