-- Migración: Añadir soporte de double opt-in al newsletter
-- Ejecutar en Supabase → SQL Editor DESPUÉS de newsletter_subscribers.sql

-- Nuevas columnas para verificación de email
alter table newsletter_subscribers
  add column if not exists verified          boolean     not null default false,
  add column if not exists verification_token text        unique,
  add column if not exists verified_at       timestamptz;

-- Índice para lookups rápidos por token
create index if not exists newsletter_subscribers_token_idx
  on newsletter_subscribers (verification_token)
  where verification_token is not null;

-- Vista de suscriptores verificados (útil para Make o consultas manuales)
-- security_invoker = true: la vista usa los permisos del usuario que consulta,
-- no los del owner, para que RLS de newsletter_subscribers se aplique correctamente.
create or replace view newsletter_verified
  with (security_invoker = true)
as
  select email, contexto, created_at, verified_at
  from newsletter_subscribers
  where verified = true
  order by verified_at desc;
