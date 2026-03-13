import { NextRequest, NextResponse } from "next/server";

// POST /api/playlists — Create a new playlist (Creator only)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, spotify_playlist_id } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Playlist name is required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    // TODO: Validate auth session (Creator must be logged in via Spotify OAuth)
    // TODO: Insert into Supabase playlists table
    // TODO: Check for slug uniqueness

    const playlist = {
      id: `pl-${Date.now()}`,
      name,
      slug,
      description: description || null,
      spotify_playlist_id: spotify_playlist_id || null,
      is_locked: false,
      max_songs_per_user: 3,
      vote_threshold: 20,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(playlist, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/playlists?slug=coding-music — Get playlist by slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "slug query parameter is required" },
      { status: 400 }
    );
  }

  // TODO: Fetch from Supabase by slug

  return NextResponse.json({
    message: `Playlist '${slug}' would be fetched from database`,
  });
}
