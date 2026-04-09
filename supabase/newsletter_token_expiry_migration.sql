-- Migración: Añadir expiración real de 72h al token de verificación
-- Ejecutar en Supabase → SQL Editor DESPUÉS de newsletter_subscribers_migration.sql

alter table newsletter_subscribers
  add column if not exists token_expires_at timestamptz;
