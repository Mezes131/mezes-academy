-- Enterprise invitations: allow pending invites by email before account exists
alter table public.organization_members
  alter column user_id drop not null;

alter table public.organization_members
  add column if not exists invite_email text;

alter table public.organization_members
  drop constraint if exists organization_members_organization_id_user_id_key;

create unique index if not exists idx_org_members_user
  on public.organization_members(organization_id, user_id)
  where user_id is not null;

create unique index if not exists idx_org_members_invite_email
  on public.organization_members(organization_id, lower(invite_email))
  where invite_email is not null;

alter table public.organization_members
  drop constraint if exists org_member_identity_check;

alter table public.organization_members
  add constraint org_member_identity_check check (
    user_id is not null or invite_email is not null
  );
