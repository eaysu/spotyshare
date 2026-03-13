-- SpotyShare Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- ========================================
-- USERS (Playlist Creators via Spotify OAuth)
-- ========================================
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  spotify_id text unique not null,
  display_name text not null,
  created_at timestamptz default now()
);

-- ========================================
-- PLAYLISTS
-- ========================================
create table if not exists playlists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  description text,
  owner_id uuid not null references users(id) on delete cascade,
  spotify_playlist_id text,
  is_locked boolean default false,
  max_songs_per_user integer default 3,
  vote_threshold integer default 20,
  sync_mode text default 'threshold' check (sync_mode in ('threshold', 'manual', 'top_n')),
  created_at timestamptz default now()
);

create unique index if not exists playlists_slug_unique
  on playlists (lower(slug));

-- ========================================
-- SONGS
-- ========================================
create table if not exists songs (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid not null references playlists(id) on delete cascade,
  spotify_track_id text not null,
  title text not null,
  artist text not null,
  album_cover text,
  uri text,
  duration_ms integer,
  explicit boolean default false,
  added_by text not null default '@anonymous',
  added_by_session text,
  upvotes integer default 0,
  downvotes integer default 0,
  score integer generated always as (coalesce(upvotes, 0) - coalesce(downvotes, 0)) stored,
  status text default 'pending' check (status in ('pending', 'approved', 'synced', 'removed', 'rejected')),
  synced_to_spotify boolean default false,
  last_synced_at timestamptz,
  created_at timestamptz default now()
);

create unique index if not exists songs_unique_per_playlist
  on songs (playlist_id, spotify_track_id);

create index if not exists songs_sort_idx
  on songs (playlist_id, score desc, created_at desc);

-- ========================================
-- VOTES
-- ========================================
create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references songs(id) on delete cascade,
  user_session text not null,
  vote_type smallint not null check (vote_type in (1, -1)),
  created_at timestamptz default now()
);

create unique index if not exists votes_unique_per_session
  on votes (song_id, user_session);

-- ========================================
-- CONTRIBUTOR SESSIONS (anti-spam)
-- ========================================
create table if not exists contributor_sessions (
  id uuid primary key default gen_random_uuid(),
  ip_hash text,
  ua_hash text,
  created_at timestamptz default now()
);

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================
alter table playlists enable row level security;
alter table songs enable row level security;
alter table votes enable row level security;

-- Public read for playlists
create policy "Public can read playlists"
  on playlists for select
  using (true);

-- Public read for songs (non-removed)
create policy "Public can read songs"
  on songs for select
  using (status != 'removed');

-- Anyone can insert songs (enforced at API level: limit + dedupe)
create policy "Anyone can insert songs"
  on songs for insert
  with check (true);

-- Anyone can insert votes
create policy "Anyone can insert votes"
  on votes for insert
  with check (true);

-- Public can read votes
create policy "Public can read votes"
  on votes for select
  using (true);

-- ========================================
-- HELPER: Function to update song vote counts
-- ========================================
create or replace function update_song_vote_counts()
returns trigger as $$
begin
  update songs set
    upvotes = (select count(*) from votes where song_id = coalesce(new.song_id, old.song_id) and vote_type = 1),
    downvotes = (select count(*) from votes where song_id = coalesce(new.song_id, old.song_id) and vote_type = -1)
  where id = coalesce(new.song_id, old.song_id);
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

create or replace trigger on_vote_change
  after insert or update or delete on votes
  for each row execute function update_song_vote_counts();
