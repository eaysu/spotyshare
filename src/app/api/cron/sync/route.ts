import { NextResponse } from "next/server";

// POST /api/cron/sync — Background sync: push approved songs above threshold to Spotify
// Triggered by Render Cron Job every 5–10 minutes
export async function POST() {
  try {
    // TODO: Query Supabase for songs where:
    //   status = 'approved' AND synced_to_spotify = false AND score >= playlist.vote_threshold
    //
    // For each qualifying song:
    //   1. Fetch the playlist's creator to get their Spotify access token
    //   2. Refresh the token if expired
    //   3. Check if track already exists in the Spotify playlist (dedupe)
    //   4. POST /v1/playlists/{playlist_id}/tracks with the track URI
    //   5. Update song: synced_to_spotify = true, status = 'synced', last_synced_at = now()
    //
    // Handle errors:
    //   - Spotify 429: respect Retry-After, exponential backoff
    //   - Unavailable/region-locked tracks: log and mark as 'rejected'
    //   - Token refresh failure: log and skip playlist

    const syncedCount = 0; // placeholder

    return NextResponse.json({
      success: true,
      synced: syncedCount,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Sync job failed" },
      { status: 500 }
    );
  }
}

// Also support GET for easy Render Cron Job invocation
export async function GET() {
  return POST();
}
