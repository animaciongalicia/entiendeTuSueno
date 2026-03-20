-- Ejecutar en Supabase → SQL Editor
-- Crea la tabla de suscriptores del newsletter

create table if not exists newsletter_subscribers (
  id         uuid        primary key default gen_random_uuid(),
  email      text        not null unique,
  contexto   text        not null default 'blog',
  created_at timestamptz not null default now()
);

-- Solo el service_role (backend) puede leer/escribir — ningún usuario anónimo
alter table newsletter_subscribers enable row level security;

-- Índice para búsquedas rápidas por email
create index if not exists newsletter_subscribers_email_idx
  on newsletter_subscribers (email);

-- Vista opcional para Make: exporta suscriptores de los últimos 7 días
-- Útil si Make consulta Supabase directamente para el newsletter semanal
create or replace view newsletter_recent as
  select email, contexto, created_at
  from newsletter_subscribers
  where created_at >= now() - interval '7 days'
  order by created_at desc;
