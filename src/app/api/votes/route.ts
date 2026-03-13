import { NextRequest, NextResponse } from "next/server";

// POST /api/votes — Cast a vote on a song (idempotent per song/session)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { song_id, vote_type } = body;

    if (!song_id || (vote_type !== 1 && vote_type !== -1)) {
      return NextResponse.json(
        { error: "song_id and vote_type (1 or -1) are required" },
        { status: 400 }
      );
    }

    // TODO: Get or create contributor session from cookie
    // TODO: Upsert vote in Supabase (unique: song_id + user_session)
    // TODO: Update song upvotes/downvotes counts
    // TODO: Rate limit per session

    const vote = {
      id: `vote-${Date.now()}`,
      song_id,
      user_session: "session-placeholder",
      vote_type,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(vote, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
