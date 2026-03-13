"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockPlaylist, mockSongs } from "@/lib/mock-data";
import {
  Trash2,
  RotateCcw,
  Lock,
  Unlock,
  Upload,
  Shield,
} from "lucide-react";
import type { Song } from "@/types";

export default function AdminPage() {
  const [songs, setSongs] = useState<Song[]>(
    [...mockSongs].sort((a, b) => b.score - a.score)
  );
  const [isLocked, setIsLocked] = useState(mockPlaylist.is_locked);

  const handleRemove = (songId: string) => {
    setSongs((prev) => prev.filter((s) => s.id !== songId));
  };

  const handleResetVotes = (songId: string) => {
    setSongs((prev) =>
      prev.map((s) =>
        s.id === songId
          ? { ...s, upvotes: 0, downvotes: 0, score: 0 }
          : s
      )
    );
  };

  const handleForceSync = (songId: string) => {
    setSongs((prev) =>
      prev.map((s) =>
        s.id === songId
          ? { ...s, synced_to_spotify: true, status: "synced" as const }
          : s
      )
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">
              {mockPlaylist.name}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="mb-6 flex items-center gap-3">
          <Button
            variant={isLocked ? "outline" : "secondary"}
            size="sm"
            className="gap-2"
            onClick={() => setIsLocked(!isLocked)}
          >
            {isLocked ? (
              <>
                <Unlock className="h-4 w-4" /> Unlock Submissions
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" /> Lock Submissions
              </>
            )}
          </Button>
          <Badge variant={isLocked ? "destructive" : "secondary"}>
            {isLocked ? "Locked" : "Open"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Manage Songs ({songs.length})
          </h2>
          <div className="space-y-1">
            {songs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-3 rounded-xl bg-card/60 p-3"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={song.album_cover}
                    alt={song.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {song.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {song.artist} &middot; Score: {song.score} &middot;{" "}
                    {song.added_by}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {song.synced_to_spotify ? (
                    <Badge
                      variant="secondary"
                      className="text-[10px] text-primary"
                    >
                      Synced
                    </Badge>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      title="Force sync to Spotify"
                      onClick={() => handleForceSync(song.id)}
                    >
                      <Upload className="h-3.5 w-3.5 text-primary" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Reset votes"
                    onClick={() => handleResetVotes(song.id)}
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Remove song"
                    onClick={() => handleRemove(song.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
