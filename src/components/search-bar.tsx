"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SpotifyTrack } from "@/types";

interface SearchBarProps {
  onAddSong?: (track: SpotifyTrack, nickname: string) => void;
}

const mockResults: SpotifyTrack[] = [
  {
    id: "mock1",
    name: "Starboy",
    artists: [{ name: "The Weeknd" }],
    album: {
      name: "Starboy",
      images: [
        { url: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7571c1", width: 300, height: 300 },
      ],
    },
    uri: "spotify:track:7MXVkk9YMctZqd1Srtv4MB",
    duration_ms: 230000,
    explicit: true,
  },
  {
    id: "mock2",
    name: "Levitating",
    artists: [{ name: "Dua Lipa" }],
    album: {
      name: "Future Nostalgia",
      images: [
        { url: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946", width: 300, height: 300 },
      ],
    },
    uri: "spotify:track:39LLxExYz6ewLAo9BUIW2E",
    duration_ms: 203000,
    explicit: false,
  },
  {
    id: "mock3",
    name: "Anti-Hero",
    artists: [{ name: "Taylor Swift" }],
    album: {
      name: "Midnights",
      images: [
        { url: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5", width: 300, height: 300 },
      ],
    },
    uri: "spotify:track:0V3wPSX9ygBnCm8psDIeLU",
    duration_ms: 200000,
    explicit: false,
  },
];

export function SearchBar({ onAddSong }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [nickname, setNickname] = useState("");
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsSearching(true);
    // TODO: Replace with real Spotify search API call
    await new Promise((r) => setTimeout(r, 300));
    setResults(
      mockResults.filter(
        (t) =>
          t.name.toLowerCase().includes(value.toLowerCase()) ||
          t.artists[0].name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsOpen(true);
    setIsSearching(false);
  };

  const handleAdd = (track: SpotifyTrack) => {
    onAddSong?.(track, nickname || "@anonymous");
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Your Twitter/X handle (e.g. @username)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="bg-secondary/50"
      />
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for a song..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-secondary/50 pl-9"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>

        {isOpen && results.length > 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-popover p-1 shadow-lg">
            {results.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                  <Image
                    src={track.album.images[0]?.url || ""}
                    alt={track.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{track.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {track.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="text-primary hover:text-primary"
                  onClick={() => handleAdd(track)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {isOpen && query.length >= 2 && results.length === 0 && !isSearching && (
          <div className="absolute z-20 mt-1 w-full rounded-xl border border-border bg-popover p-4 text-center text-sm text-muted-foreground shadow-lg">
            No songs found for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
