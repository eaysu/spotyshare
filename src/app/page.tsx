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
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Music className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Your Personal
              <br />
              <span className="text-primary">Playlist Manager</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
              Create playlists, let others vote on songs, and sync the best tracks to Spotify automatically.
            </p>
            <div className="mt-8">
              <Link
                href="/create"
                className={buttonVariants({ size: "lg", className: "gap-2 rounded-full px-8" })}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Sign in with Spotify
              </Link>
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
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Music className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">No playlists yet</h2>
            <p className="mb-6 max-w-sm text-sm text-muted-foreground">
              Create your first playlist to start collecting and curating songs with community votes.
            </p>
            <Link
              href="/create"
              className={buttonVariants({ className: "gap-2 rounded-full" })}
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
                className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-5 transition-all hover:border-primary/40 hover:bg-card hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-primary/30 transition-all group-hover:scale-105">
                  <Music className="h-7 w-7 text-primary-foreground" />
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
