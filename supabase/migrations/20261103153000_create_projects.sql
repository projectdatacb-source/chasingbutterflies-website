-- Projects catalogue for Chasing Butterflies.
-- Public visitors can read published rows only.
-- Inserts, edits, and deletes go through the service role (admin API or a future WhatsApp worker).

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  video_url text not null,
  video_platform text not null,
  video_id text not null,
  category text[] not null,
  thumbnail_url text,
  display_order integer not null default 0,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_title_not_blank check (char_length(btrim(title)) > 0),
  constraint projects_video_url_not_blank check (char_length(btrim(video_url)) > 0),
  constraint projects_video_id_not_blank check (char_length(btrim(video_id)) > 0),
  constraint projects_platform_valid check (video_platform in ('youtube', 'vimeo')),
  constraint projects_status_valid check (status in ('draft', 'published', 'archived')),
  constraint projects_category_not_empty check (cardinality(category) > 0),
  constraint projects_category_valid check (
    category <@ array['automobiles', 'cgi', 'gadgets', 'fmcg', 'lifestyle']::text[]
  ),
  constraint projects_display_order_non_negative check (display_order >= 0),
  constraint projects_platform_video_id_key unique (video_platform, video_id)
);

comment on table public.projects is
  'Portfolio films. category is an array so one film can appear in more than one section.';

comment on column public.projects.thumbnail_url is
  'Optional manual poster. When null, the site derives a YouTube poster or a Vimeo oEmbed poster.';

comment on column public.projects.status is
  'draft and archived rows stay private. Only published rows are readable by the website.';

create index projects_published_order_idx
  on public.projects (display_order, created_at)
  where status = 'published';

create index projects_category_idx
  on public.projects using gin (category);

create or replace function public.set_projects_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_projects_updated_at();

revoke all on function public.set_projects_updated_at() from public, anon, authenticated;

alter table public.projects enable row level security;

create policy "Published projects are publicly readable"
  on public.projects
  for select
  to anon, authenticated
  using (status = 'published');

revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
