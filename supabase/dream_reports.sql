-- ══════════════════════════════════════════════════════════════
--  dream_reports — Tabla de informes de sueños
--  Ejecuta este script en el SQL Editor de tu proyecto Supabase.
-- ══════════════════════════════════════════════════════════════

create table if not exists dream_reports (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  email             text,
  dream             text not null,
  feelings          text[] not null default '{}',
  symbols           text[] not null default '{}',
  free_result       text not null default '',
  premium_result    text not null default '',
  paid              boolean not null default false,
  stripe_session_id text unique
);

-- ── Índices ───────────────────────────────────────────────────
-- Búsquedas por email (dashboard, deduplicación)
create index if not exists dream_reports_email_idx
  on dream_reports (email)
  where email is not null;

-- Búsquedas por sesión Stripe (webhook + PDF download)
create index if not exists dream_reports_stripe_session_idx
  on dream_reports (stripe_session_id)
  where stripe_session_id is not null;

-- ── Row Level Security ────────────────────────────────────────
alter table dream_reports enable row level security;

-- Solo el service_role puede leer y escribir.
-- El cliente anónimo (navegador) no tiene acceso directo a esta tabla.
create policy "service_role only"
  on dream_reports
  as restrictive
  for all
  to authenticated, anon
  using (false)
  with check (false);

-- ── Vista: informes pagados (útil para analítica en el dashboard) ─
create or replace view dream_reports_paid as
  select
    id,
    created_at,
    email,
    dream,
    feelings,
    symbols,
    stripe_session_id
  from dream_reports
  where paid = true;
