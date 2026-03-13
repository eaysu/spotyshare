# 🎧 Community Playlist SaaS — Enhanced Roadmap

A collaborative playlist web application where anyone can create a shared playlist page, invite others, and build a curated music list together through voting. High-scoring songs can be auto-synced to the creator’s Spotify playlist.

---

# 🎯 Product Vision

Create a simple platform where:

- Anyone can create a community playlist page
- Contributors can add songs
- Songs are voted up or down
- Best songs rise to the top
- High-scoring songs automatically sync to Spotify playlists

Examples:

```
app.com/p/coding-music
app.com/p/night-drive
app.com/p/chill-vibes
```

---

# 👥 User Roles

## Creator (Playlist Owner)

Can:

- Create playlist pages
- Connect Spotify
- Select which playlist to sync
- Remove songs
- Configure limits
- Share playlist link

## Contributors

Can:

- View songs
- Upvote / downvote songs
- Add songs
- Add their Twitter/X nickname
- Suggest songs

Restrictions:

- Maximum 3 songs per contributor
- Cannot delete songs
- Cannot edit other submissions

---

# 🔗 URL Structure

Each playlist has a unique page.

```
/p/[playlist-slug]
```

Examples:

```
/p/coding-music
/p/late-night-drive
/p/indie-vibes
```

---

# 🎨 UI / UX Design

## Style

- Soft dark theme, minimal UI
- Rounded components, subtle shadows, smooth transitions
- Colors: background dark gray / soft black, accent green, slightly lighter gray cards

## Layout Sections

```
Header
Playlist Info
Song Search
Add Song Form
Song List
Voting Buttons
Footer
```

## Mobile UX Requirements

- Mobile-first, vertical layout
- Large tap targets, sticky header
- Compact song cards, smooth scrolling, responsive grid
- Supported: iPhone, Android, Tablets

---

# 🧱 Tech Stack

Frontend:

- Next.js, React, TailwindCSS, shadcn/ui

Backend:

- Next.js API routes (App Router or Pages API)

Database:

- Supabase (PostgreSQL)

External APIs:

- Spotify Web API

Deployment:

- Vercel or Render.com (Web Service)

---

# 🔐 Authentication & Authorization

## Creator Authentication

Playlist owners authenticate using Spotify OAuth.

Permissions required:

```
playlist-modify-public
playlist-modify-private
```

### Implementation Notes

- Use NextAuth.js (Auth.js) with the Spotify provider for Creator login.
- Persist the Spotify refresh token; auto-refresh access tokens on expiry (server-side only).
- Store tokens in a secure server-side session (e.g., database adapter) and never expose them to the client.
- Protect admin routes and sensitive API endpoints with middleware checking the Creator session and playlist ownership.

## Contributor Identification (No Account)

Contributors do NOT need accounts. Identification uses:

- Cookie-based anonymous session ID
- Optional Twitter/X nickname (display only)
- IP + User-Agent rate limiting

Anti-abuse hardening:

- hCaptcha/ReCAPTCHA on submission and rapid-voting flows
- Optional magic link/OTP for events requiring stronger identity (feature flag)

---

# 🗄️ Database Schema

## users

```
id
spotify_id
display_name
created_at
```

## playlists

```
id
name
slug
owner_id
spotify_playlist_id
created_at
```

## songs

```
id
playlist_id
spotify_track_id
title
artist
album_cover
added_by
created_at
upvotes
downvotes
synced_to_spotify
```

## votes

```
id
song_id
user_session
vote_type
created_at
```

`vote_type` values:

```
1 = upvote
-1 = downvote
```

### Constraints & Indexes

```sql
-- One track per playlist (no duplicates)
create unique index if not exists songs_unique_per_playlist
  on songs (playlist_id, spotify_track_id);

-- One vote per song per contributor session
create unique index if not exists votes_unique_per_session
  on votes (song_id, user_session);

-- Unique, case-insensitive slugs
create unique index if not exists playlists_slug_unique
  on playlists (lower(slug));
```

### Additional Columns

- playlists: description, is_locked (boolean), max_songs_per_user (int), vote_threshold (int default 20), sync_mode (threshold | manual | top_n)
- songs: status (pending | approved | synced | removed | rejected), score (generated as upvotes - downvotes), uri, duration_ms, explicit, added_by_session, last_synced_at

Example for score column and sorting:

```sql
alter table songs add column if not exists score integer
  generated always as (coalesce(upvotes,0) - coalesce(downvotes,0)) stored;
create index if not exists songs_sort_idx on songs (playlist_id, score desc, created_at desc);
```

### Row-Level Security (Supabase)

- Enable RLS; suggested policies:
  - Public read of playlists and songs when is_locked = false (or creator-only when locked)
  - Insert into songs if contributor has < max_songs_per_user and no duplicate exists
  - Insert/Upsert into votes only once per (song_id, user_session)

---

# 🔌 Spotify Integration

## Required Spotify APIs

- Search Track: `GET /v1/search`
- Add Track to Playlist: `POST /v1/playlists/{playlist_id}/tracks`
- Get Playlist: `GET /v1/playlists/{playlist_id}`

### Token Refresh & Errors

- Use the Creator's refresh token to renew access tokens automatically.
- Handle rate limits (HTTP 429) using Retry-After and exponential backoff.
- Log and surface recoverable errors; mask credentials in logs.

### Deduplication & Post-sync Behavior

- Before adding a track to Spotify, check if it already exists; skip duplicates.
- Policy option: If a synced song’s score later drops below threshold, either keep it or optionally remove it (playlist-level setting).

---

# 🧰 API Design

Server-only endpoints; Spotify requests proxied from the server.

- POST `/api/playlists` — Create playlist (Creator only)
- GET `/api/playlists/[slug]` — Playlist + songs (public)
- POST `/api/songs` — Add song (contributor; duplicate guard; per-user limit)
- POST `/api/votes` — Vote (idempotent per song/session)
- POST `/api/admin/[slug]/remove|reset|lock|force-sync` — Admin actions (Creator only)
- POST `/api/cron/sync` — Background sync hook (cron-triggered)

Conventions:

- Consistent JSON error format; include error codes
- Idempotent mutations wherever possible
- Strict input validation and rate limiting at the edge of each endpoint

---

# 🧩 Core Features Checklist

## Project Setup

- [ ] Initialize Next.js project
- [ ] Setup TailwindCSS
- [ ] Install shadcn/ui
- [ ] Setup project folder structure
- [ ] Configure environment variables

## UI Development

- [ ] Create Spotify-style dark theme
- [ ] Build responsive layout
- [ ] Implement mobile-first design
- [ ] Create song card component
- [ ] Add loading states
- [ ] Add animations

## Playlist Creation

- [ ] Create playlist creation page
- [ ] Implement Spotify OAuth login
- [ ] Allow user to select Spotify playlist
- [ ] Save playlist configuration
- [ ] Generate playlist slug

## Playlist Page

- [ ] Create dynamic route `/p/[slug]`
- [ ] Load playlist information
- [ ] Display playlist header
- [ ] Show song list

Playlist header should include:

- Playlist name
- Creator name
- Total songs
- Follow on Spotify button

## Song Search

- [ ] Create search bar
- [ ] Connect Spotify search API
- [ ] Display results with album covers
- [ ] Allow selecting songs

## Song Submission

Submission form should include:

```
Twitter/X nickname
Selected song
Submit button
```

Features:

- [ ] Limit 3 songs per user
- [ ] Prevent duplicates
- [ ] Store song in database

## Voting System

Each song card includes:

```
Album cover
Song title
Artist
Added by @username
Upvote button
Downvote button
Vote counts
```

Tasks:

- [ ] Implement upvote system
- [ ] Implement downvote system
- [ ] Prevent duplicate voting
- [ ] Store votes in database
- [ ] Update vote counts

## Sorting

Songs should be sorted by score.

```
score = upvotes - downvotes
```

Tasks:

- [ ] Implement score calculation
- [ ] Sort songs dynamically
- [ ] Display highest score first

---

# 🛡️ Anti-Spam System

Required protections:

- [ ] Limit submissions per user
- [ ] Cookie-based session ID
- [ ] IP rate limiting
- [ ] Duplicate song detection

Details:

- Add hCaptcha/ReCAPTCHA to submission and rapid voting flows
- Apply per-IP and per-session rate limits (sliding window) on `songs` and `votes` endpoints
- Maintain a lightweight `contributor_sessions` table (id, created_at, ip_hash, ua_hash)
- Log suspicious patterns and optionally soft-ban abusive sessions

---

# 👑 Admin Features

Playlist creators can:

- [ ] Remove songs
- [ ] Reset votes
- [ ] Force add songs to Spotify
- [ ] Lock submissions

Admin access through:

```
/admin/[playlist-slug]
```

Background Jobs & Queues:

- Use a scheduled cron to call `/api/cron/sync` every 5–10 minutes (Render Cron or Vercel Cron)
- Ensure idempotency: process only songs with `status = 'approved' AND synced_to_spotify = false`
- Batch operations to respect Spotify rate limits; exponential backoff on failures

---

# 🔄 Spotify Auto Sync

Optional automation feature.

When a song reaches threshold:

```
score >= 20 (playlist-level default; configurable)
```

System will:

- Add track to Spotify playlist
- Mark as synced

Tasks:

- [ ] Check vote score
- [ ] Call Spotify API
- [ ] Update database flag

---

# 🎵 Footer Section

Footer appears on every playlist page.

Content:

```
Curated playlist

Follow on Spotify
```

Creator Spotify profile link (replace with creator’s profile):

```
https://open.spotify.com/user/YOUR_SPOTIFY_ID
```

Display:

- Spotify icon
- Clickable profile link

---

# 🧪 Testing Strategy

- Unit: score calculation, duplicate detection, per-user limit, sorting
- Integration: `songs`/`votes` endpoints (happy path + abuse cases)
- E2E (Playwright): create playlist → add song → vote → auto-sync (stub Spotify for CI)

---

# 📈 Observability & Analytics

- Sentry for error tracking (server and client boundaries)
- Structured logs for API calls and sync jobs; redact PII and tokens
- Lightweight analytics (e.g., PostHog/umami) to track key funnel events

---

# 📣 SEO & Social

- Per-playlist dynamic metadata (title, description) and Open Graph images (top tracks/cover)
- Share buttons (Twitter/X, WhatsApp) with UTM tags; optional QR for events

---

# 🚀 Deployment

Environment variables:

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Vercel (option)

- Import repo → Framework Preset: Next.js
- Build: default, Start: default
- Set env vars above
- Add Vercel Cron to hit `/api/cron/sync` (if using auto-sync)

## Render.com (supported)

Yes, you can host this Next.js app on Render as a Web Service (SSR/ISR).

1) Create Web Service

- Connect GitHub repo
- Runtime: Node 18+
- Build Command: `npm ci && npm run build` (or `pnpm install --frozen-lockfile && pnpm build`)
- Start Command: `npm run start -- -p $PORT` (ensure `start` runs `next start`)

2) Environment Variables

- All from the list above
- `NEXTAUTH_URL` = your Render URL (e.g., https://spotyshare.onrender.com)
- `NEXTAUTH_SECRET` = a strong random string

3) Cron (optional but recommended)

- Add a Render Cron Job to GET `https://<service>.onrender.com/api/cron/sync` every 5–10 minutes
- Alternatively, run a separate Worker service that executes a small script (e.g., `node scripts/sync.js`)

Notes:

- Filesystem is ephemeral; do not rely on local writes
- Configure `next.config.js` for any remote image domains used by Spotify covers

---

# 💰 Monetization (Optional SaaS)

- Free: 1 playlist, limited songs/month
- Pro: custom domain/slug, advanced moderation, auto-sync, branding removal
- Implement with Stripe subscriptions + webhooks; enforce quotas per plan

---

# 🧠 Development Priorities

1. Playlist creation (Creator auth)
2. Song submission (duplicate guard, limits)
3. Voting (idempotent, rate-limited)
4. Spotify search (server-proxied)
5. Playlist sync (cron + idempotent job)

Everything else is secondary.

---

# ❓ Open Questions

- Vote threshold global mı yoksa playlist bazlı mı? (Öneri: playlist bazlı, varsayılan 20)
- Eşik altına düşen şarkılar Spotify’dan geri kaldırılsın mı?
- Katkıcılar için OTP/magic link ister misiniz, yoksa tamamen friksiyonsuz mu kalsın?
- SaaS planları ve paywall kapsamı?

---

# 🎯 Final Goal

Create a simple but powerful community music platform where anyone can create collaborative playlists and discover music through crowd voting.
