import Link from "next/link";
import { Music } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <Music className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">SpotyShare</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Community-curated playlists powered by votes.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Follow on Spotify
          </Link>
        </div>
      </div>
    </footer>
  );
}
