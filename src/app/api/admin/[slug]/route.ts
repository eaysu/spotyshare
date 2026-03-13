import { NextRequest, NextResponse } from "next/server";

// POST /api/admin/[slug] — Admin actions (Creator only)
// Body: { action: "remove" | "reset" | "lock" | "unlock" | "force-sync", song_id?: string }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { action, song_id } = body;

    // TODO: Validate Creator auth session
    // TODO: Verify playlist ownership (owner_id matches session user)

    const validActions = ["remove", "reset", "lock", "unlock", "force-sync"];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${validActions.join(", ")}` },
        { status: 400 }
      );
    }

    if (["remove", "reset", "force-sync"].includes(action) && !song_id) {
      return NextResponse.json(
        { error: "song_id is required for this action" },
        { status: 400 }
      );
    }

    // TODO: Execute action against Supabase
    // - remove: update song status to 'removed'
    // - reset: set upvotes/downvotes to 0
    // - lock/unlock: update playlist is_locked
    // - force-sync: call Spotify API + mark song as synced

    return NextResponse.json({
      success: true,
      action,
      slug,
      song_id: song_id || null,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
