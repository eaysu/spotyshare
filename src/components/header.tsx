"use client";

import Link from "next/link";
import { Music, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-400">
            <Music className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">SpotyShare</span>
        </Link>
        <nav className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className={buttonVariants({ variant: "ghost", size: "sm", className: "gap-1.5 text-muted-foreground hover:text-foreground" })}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className={buttonVariants({ size: "sm", className: "rounded-full gap-2" })}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
