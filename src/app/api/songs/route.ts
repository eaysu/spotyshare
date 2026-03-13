import { NextRequest, NextResponse } from "next/server";

// POST /api/songs — Add a song to a playlist
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      playlist_id,
      spotify_track_id,
      title,
      artist,
      album_cover,
      added_by,
    } = body;

    if (!playlist_id || !spotify_track_id || !title || !artist) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Check contributor session (cookie)
    // TODO: Enforce max_songs_per_user limit
    // TODO: Check for duplicate song in playlist
    // TODO: Insert into Supabase songs table

    const song = {
      id: `song-${Date.now()}`,
      playlist_id,
      spotify_track_id,
      title,
      artist,
      album_cover: album_cover || "",
      added_by: added_by || "@anonymous",
      created_at: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      score: 0,
      status: "pending",
      synced_to_spotify: false,
    };

    return NextResponse.json(song, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
