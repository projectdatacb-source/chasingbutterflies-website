# Chasing Butterflies

Portfolio site for Chasing Butterflies, a Mumbai advertising and production house. Films are loaded from Supabase. Adding a film does not require a code change or a redeploy.

Without Supabase credentials, the site shows the current public catalogue so it can be reviewed locally. After credentials are added, only published database rows are shown.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/migrations/20261103153000_create_projects.sql`.
3. Run `supabase/seed.sql` to load the films currently on [chasingbutterflies.in](https://chasingbutterflies.in/).
4. Copy `.env.example` to `.env.local` and fill in:

| Variable | Where it is used |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public site |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public site. Read-only through row level security. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only. Never expose this in the browser. |
| `ADMIN_API_SECRET` | Server only. Protects the admin API. |
| `NEXT_PUBLIC_SITE_URL` | Canonical and social preview links. |

Published rows are public. Draft and archived rows are not. A film can belong to more than one category because `category` is a list.

The public page refreshes from the database about once a minute. The admin API clears that cache immediately after a change.

## Admin API

There is no dashboard yet. These routes are the foundation for one, and for a future WhatsApp worker.

Send `Authorization: Bearer <ADMIN_API_SECRET>`.

```bash
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Authorization: Bearer $ADMIN_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "title: Tata Yodha - Water\nurl: https://vimeo.com/256747378\ncategory: automobiles"
  }'
```

A structured body also works:

```json
{
  "title": "Tata Yodha - Water",
  "video_url": "https://vimeo.com/256747378",
  "category": ["automobiles"],
  "status": "published"
}
```

`status` can be `draft`, `published`, or `archived`. Omit `thumbnail_url` to use the YouTube poster, or the Vimeo poster when Vimeo provides one. Set `thumbnail_url` to replace it.

- `GET /api/admin/projects` lists every film.
- `PATCH /api/admin/projects/:id` edits title, link, categories, poster, order, or status.
- `DELETE /api/admin/projects/:id` removes a film.
- `GET /api/projects` returns published films only.

Categories: `automobiles`, `cgi`, `gadgets`, `fmcg`, `lifestyle`.

## WhatsApp

WhatsApp itself is not connected. `src/lib/services/whatsapp.ts` validates a message, and `ingestProjectMessage` saves it. A later worker can receive the WhatsApp payload and call that function. No site deploy is required to publish the film.

## Still needed from the studio

- Supabase URL, anon key, service-role key, and an admin secret.
- A public email or phone number, if contact should include one. The current site does not publish either.
- The original social share image was not available to download. The logo is used for previews until a replacement is supplied.
