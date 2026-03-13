"use client";

import { Music, Users, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Playlist } from "@/types";

interface PlaylistHeaderProps {
  playlist: Playlist;
  songCount: number;
}

export function PlaylistHeader({ playlist, songCount }: PlaylistHeaderProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-lg">
      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/80 via-primary/60 to-orange-500/40 shadow-lg shadow-primary/10">
          <Music className="h-10 w-10 text-white" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Playlist
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-sm text-muted-foreground">
              {playlist.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 border-white/[0.08] bg-white/[0.06]">
          <Users className="h-3 w-3" />
          by {playlist.owner?.display_name || "Unknown"}
        </Badge>
        <Badge variant="secondary" className="border-white/[0.08] bg-white/[0.06]">
          {songCount} {songCount === 1 ? "song" : "songs"}
        </Badge>
        <Badge variant="secondary" className="border-white/[0.08] bg-white/[0.06]">
          Threshold: {playlist.vote_threshold}
        </Badge>
        {playlist.is_locked && (
          <Badge variant="destructive" className="text-xs">
            Locked
          </Badge>
        )}
        {playlist.spotify_playlist_id && (
          <a
            href={`https://open.spotify.com/playlist/${playlist.spotify_playlist_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "gap-1.5 border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08]",
            })}
          >
            <ExternalLink className="h-3 w-3" />
            Open in Spotify
          </a>
        )}
      </div>
    </div>
  );
}
