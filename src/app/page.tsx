"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Music, ArrowRight, Plus } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { buttonVariants } from "@/components/ui/button";
import type { Playlist } from "@/types";

export default function Home() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylists() {
      if (status === "authenticated" && session?.spotifyId) {
        try {
          // TODO: Fetch user's playlists from Supabase
          // const res = await fetch(`/api/playlists?owner_id=${session.spotifyId}`);
          // const data = await res.json();
          // setPlaylists(data);
          setPlaylists([]);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      }
      setLoading(false);
    }
    fetchPlaylists();
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="mx-auto max-w-3xl px-4 py-32 text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500/80 via-primary/60 to-orange-500/40 shadow-2xl shadow-primary/20">
              <Music className="h-10 w-10 text-white" />
            </div>
            <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-primary via-teal-400 to-orange-400 bg-clip-text text-transparent">Playlist Manager</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Create playlists, let others vote on songs, and sync the best tracks to Spotify automatically.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Sign in with Spotify
              </Link>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
                  <Music className="h-5 w-5 text-teal-400" />
                </div>
                <h3 className="font-semibold">Create Playlists</h3>
                <p className="mt-1 text-xs text-muted-foreground">Build collaborative playlists with a shareable link</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Community Votes</h3>
                <p className="mt-1 text-xs text-muted-foreground">Let listeners upvote the best tracks</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                  <Plus className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="font-semibold">Spotify Sync</h3>
                <p className="mt-1 text-xs text-muted-foreground">Top songs auto-sync to your Spotify playlist</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Playlists</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your community playlists
            </p>
          </div>
          <Link
            href="/create"
            className={buttonVariants({ className: "gap-2 rounded-full" })}
          >
            <Plus className="h-4 w-4" />
            New Playlist
          </Link>
        </div>

        {playlists.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] py-24 text-center backdrop-blur-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 via-primary/15 to-orange-500/10">
              <Music className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No playlists yet</h2>
            <p className="mb-6 max-w-sm text-sm text-muted-foreground">
              Create your first playlist to start collecting and curating songs with community votes.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Create Your First Playlist
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                href={`/p/${playlist.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-md transition-all hover:border-white/[0.12] hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/80 via-primary/60 to-orange-500/40 shadow-md transition-transform group-hover:scale-110">
                  <Music className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{playlist.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {playlist.songs?.length || 0} songs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
