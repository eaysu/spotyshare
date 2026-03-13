"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlaylistHeader } from "@/components/playlist-header";
import { SongCard } from "@/components/song-card";
import { SearchBar } from "@/components/search-bar";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { Playlist, Song, SpotifyTrack } from "@/types";

export default function PlaylistPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        // TODO: Fetch playlist and songs from Supabase
        // const res = await fetch(`/api/playlists?slug=${slug}`);
        // const data = await res.json();
        // setPlaylist(data.playlist);
        // setSongs(data.songs);
        setPlaylist(null);
        setSongs([]);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
      setLoading(false);
    }
    fetchPlaylist();
  }, [slug]);

  const handleVote = async (songId: string, voteType: 1 | -1) => {
    // TODO: Call API to persist vote
    console.log("Vote", songId, voteType);
  };

  const handleAddSong = async (track: SpotifyTrack, nickname: string) => {
    // TODO: Call API to add song
    const newSong: Song = {
      id: `new-${Date.now()}`,
      playlist_id: playlist?.id || "",
      spotify_track_id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album_cover: track.album.images[0]?.url || "",
      uri: track.uri,
      duration_ms: track.duration_ms,
      added_by: nickname,
      created_at: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      score: 0,
      status: "pending",
      synced_to_spotify: false,
      user_vote: null,
    };
    setSongs((prev) => [newSong, ...prev].sort((a, b) => b.score - a.score));
  };

  if (loading || status === "loading") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading playlist...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold">Playlist not found</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              This playlist doesn't exist or has been removed.
            </p>
            <Link href="/" className={buttonVariants()}>
              Go Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = session?.spotifyId === playlist.owner_id;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <PlaylistHeader playlist={playlist} songCount={songs.length} />

        {isOwner && (
          <>
            <Separator className="my-6" />
            <div className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Add a Song
              </h2>
              <SearchBar onAddSong={handleAddSong} />
            </div>
          </>
        )}

        <Separator className="my-6" />

        <div className="space-y-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Songs ({songs.length})
            </h2>
            {isOwner && (
              <Link
                href={`/admin/${slug}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Manage
              </Link>
            )}
          </div>
          <div className="space-y-1">
            {songs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                rank={index + 1}
                onVote={handleVote}
              />
            ))}
          </div>
          {songs.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              {isOwner
                ? "No songs yet. Add your first song above!"
                : "No songs in this playlist yet."}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
