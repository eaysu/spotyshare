"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlaylistHeader } from "@/components/playlist-header";
import { SongCard } from "@/components/song-card";
import { SearchBar } from "@/components/search-bar";
import { Separator } from "@/components/ui/separator";
import { mockPlaylist, mockSongs } from "@/lib/mock-data";
import type { Song, SpotifyTrack } from "@/types";

export default function PlaylistPage() {
  const [songs, setSongs] = useState<Song[]>(
    [...mockSongs].sort((a, b) => b.score - a.score)
  );

  const handleVote = (songId: string, voteType: 1 | -1) => {
    // TODO: Call API to persist vote
    console.log("Vote", songId, voteType);
  };

  const handleAddSong = (track: SpotifyTrack, nickname: string) => {
    const newSong: Song = {
      id: `new-${Date.now()}`,
      playlist_id: mockPlaylist.id,
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
    setSongs((prev) => [newSong, ...prev]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <PlaylistHeader playlist={mockPlaylist} songCount={songs.length} />

        <Separator className="my-6" />

        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Add a Song
          </h2>
          <SearchBar onAddSong={handleAddSong} />
        </div>

        <Separator className="my-6" />

        <div className="space-y-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Songs ({songs.length})
            </h2>
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
              No songs yet. Be the first to add one!
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
