-- ══════════════════════════════════════════════════════════════
--  security_fixes_migration.sql
--  Fixes three security linter errors:
--    1. newsletter_recent view — SECURITY DEFINER → SECURITY INVOKER
--    2. newsletter_verified view — SECURITY DEFINER → SECURITY INVOKER
--    3. dream_reports table — ensure RLS is enabled
--
--  Run in Supabase → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── 1 & 2: Recreate views with security_invoker = true ───────
-- By default Supabase creates views as SECURITY DEFINER, which means
-- the view runs with the privileges of the view owner and bypasses RLS
-- on the underlying tables. Using security_invoker = true ensures the
-- view runs with the privileges of the querying user so that RLS
-- policies on newsletter_subscribers are properly enforced.

create or replace view public.newsletter_recent
  with (security_invoker = true)
as
  select email, contexto, created_at
  from public.newsletter_subscribers
  where created_at >= now() - interval '7 days'
  order by created_at desc;

create or replace view public.newsletter_verified
  with (security_invoker = true)
as
  select email, contexto, created_at, verified_at
  from public.newsletter_subscribers
  where verified = true
  order by verified_at desc;

-- ── 3: Ensure RLS is enabled on dream_reports ────────────────
-- Idempotent — safe to run even if RLS is already enabled.
alter table public.dream_reports enable row level security;
