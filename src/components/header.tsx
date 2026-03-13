"use client";

import Link from "next/link";
import { Music } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Music className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">SpotyShare</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Explore
          </Link>
          <Link href="/create" className={buttonVariants({ size: "sm", className: "rounded-full" })}>
            Create Playlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
