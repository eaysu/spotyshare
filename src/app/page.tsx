"use client";

import Link from "next/link";
import { Music, ArrowRight, Users, ThumbsUp, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { buttonVariants } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "Create a Playlist Page",
    description: "Anyone can create a community playlist and share it with a unique link.",
  },
  {
    icon: ThumbsUp,
    title: "Vote on Songs",
    description: "Contributors upvote and downvote to curate the best tracks.",
  },
  {
    icon: Zap,
    title: "Auto-Sync to Spotify",
    description: "Top-voted songs are automatically added to your Spotify playlist.",
  },
];

const examplePlaylists = [
  { name: "Coding Music", slug: "coding-music", songs: 42 },
  { name: "Late Night Drive", slug: "late-night-drive", songs: 28 },
  { name: "Indie Vibes", slug: "indie-vibes", songs: 35 },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-32">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Community-Curated
            <br />
            <span className="text-primary">Spotify Playlists</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Create a shared playlist page, invite anyone to add songs, and let
            the crowd vote for the best music.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/create"
              className={buttonVariants({ size: "lg", className: "gap-2 rounded-full px-6" })}
            >
              Create Playlist
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/p/coding-music"
              className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-6" })}
            >
              See Example
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border/40 bg-card/30">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example playlists */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Explore Community Playlists
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {examplePlaylists.map((p) => (
              <Link
                key={p.slug}
                href={`/p/${p.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-primary/40 hover:bg-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {p.songs} songs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
