"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { VoteButtons } from "@/components/vote-buttons";
import { cn } from "@/lib/utils";
import type { Song } from "@/types";

interface SongCardProps {
  song: Song;
  rank: number;
  onVote?: (songId: string, voteType: 1 | -1) => void;
}

export function SongCard({ song, rank, onVote }: SongCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl bg-card/60 p-3 transition-colors hover:bg-card">
      <span className="w-6 text-center text-sm font-bold text-muted-foreground">
        {rank}
      </span>

      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
        <Image
          src={song.album_cover}
          alt={song.title}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {song.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {song.artist}
        </p>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <span className="text-xs text-muted-foreground">
          added by{" "}
          <span className="font-medium text-foreground">{song.added_by}</span>
        </span>
        {song.synced_to_spotify && (
          <Badge variant="secondary" className="text-[10px] text-primary">
            Synced
          </Badge>
        )}
      </div>

      <VoteButtons
        songId={song.id}
        upvotes={song.upvotes}
        downvotes={song.downvotes}
        userVote={song.user_vote ?? null}
        onVote={onVote}
      />
    </div>
  );
}
