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
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-primary/30">
          <Music className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Community Playlist
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

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="gap-1">
          <Users className="h-3 w-3" />
          by {playlist.owner?.display_name || "Unknown"}
        </Badge>
        <Badge variant="secondary">
          {songCount} {songCount === 1 ? "song" : "songs"}
        </Badge>
        <Badge variant="secondary">
          Threshold: {playlist.vote_threshold} votes
        </Badge>
        {playlist.is_locked && (
          <Badge variant="destructive" className="text-xs">
            Locked
          </Badge>
        )}
        <a
          href={`https://open.spotify.com/playlist/${playlist.spotify_playlist_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "outline",
            size: "xs",
            className: "gap-1",
          })}
        >
          <ExternalLink className="h-3 w-3" />
          Open in Spotify
        </a>
      </div>
    </div>
  );
}
