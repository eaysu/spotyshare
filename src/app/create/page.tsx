"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Loader2 } from "lucide-react";

export default function CreatePlaylistPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setIsCreating(true);
    // TODO: Call API to create playlist + Spotify OAuth
    await new Promise((r) => setTimeout(r, 800));
    router.push(`/p/${slug}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-16">
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Music className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Create a Community Playlist</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Set up your playlist page and share it with the world.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border border-border/60 bg-card/60 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Playlist Name</label>
              <Input
                placeholder="e.g. Coding Music"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary/50"
              />
              {slug && (
                <p className="text-xs text-muted-foreground">
                  URL: spotyshare.onrender.com/p/
                  <span className="text-primary">{slug}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                placeholder="What's this playlist about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-secondary/50"
              />
            </div>

            <div className="rounded-lg border border-border/40 bg-secondary/30 p-4">
              <p className="text-sm font-medium">Connect Spotify</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Sign in with Spotify to link your playlist. Top-voted songs will
                be synced automatically.
              </p>
              <Button variant="outline" size="sm" className="mt-3 gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Sign in with Spotify
              </Button>
            </div>

            <Button
              className="w-full rounded-full"
              size="lg"
              onClick={handleCreate}
              disabled={!name.trim() || isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Playlist"
              )}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
