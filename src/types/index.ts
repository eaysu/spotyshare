export interface User {
  id: string;
  spotify_id: string;
  display_name: string;
  created_at: string;
}

export interface Playlist {
  id: string;
  name: string;
  slug: string;
  description?: string;
  owner_id: string;
  spotify_playlist_id: string;
  is_locked: boolean;
  max_songs_per_user: number;
  vote_threshold: number;
  created_at: string;
  owner?: User;
  songs?: Song[];
}

export interface Song {
  id: string;
  playlist_id: string;
  spotify_track_id: string;
  title: string;
  artist: string;
  album_cover: string;
  uri?: string;
  duration_ms?: number;
  added_by: string;
  added_by_session?: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  score: number;
  status: "pending" | "approved" | "synced" | "removed" | "rejected";
  synced_to_spotify: boolean;
  user_vote?: 1 | -1 | null;
}

export interface Vote {
  id: string;
  song_id: string;
  user_session: string;
  vote_type: 1 | -1;
  created_at: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  uri: string;
  duration_ms: number;
  explicit: boolean;
}
