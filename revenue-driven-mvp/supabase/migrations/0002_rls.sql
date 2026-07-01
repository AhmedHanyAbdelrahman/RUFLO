-- Row Level Security: tenant isolation by client_id.
-- Each authenticated user belongs to exactly one client (users.client_id),
-- except rd_admin who can see all clients.

create or replace function auth_client_id() returns uuid as $$
  select client_id from users where id = auth.uid();
$$ language sql stable security definer;

create or replace function auth_is_rd_admin() returns boolean as $$
  select coalesce((select role = 'rd_admin' from users where id = auth.uid()), false);
$$ language sql stable security definer;

do $$
declare
  t text;
begin
  for t in select unnest(array[
    'clients', 'locations', 'users', 'customers', 'vehicles', 'repair_orders',
    'opportunities', 'campaigns', 'campaign_steps', 'messages', 'appointments',
    'outcomes', 'audit_reports', 'opt_outs', 'files_imports', 'qa_scores', 'follow_up_tasks'
  ])
  loop
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- clients: row id itself is the tenant key
create policy clients_tenant_select on clients for select
  using (auth_is_rd_admin() or id = auth_client_id());
create policy clients_tenant_update on clients for update
  using (auth_is_rd_admin() or id = auth_client_id());

-- generic tenant-scoped policies for tables with a client_id column
do $$
declare
  t text;
begin
  for t in select unnest(array[
    'locations', 'customers', 'vehicles', 'repair_orders', 'opportunities',
    'campaigns', 'messages', 'appointments', 'outcomes', 'audit_reports',
    'opt_outs', 'files_imports', 'qa_scores', 'follow_up_tasks'
  ])
  loop
    execute format(
      'create policy %I_tenant_all on %I for all using (auth_is_rd_admin() or client_id = auth_client_id()) with check (auth_is_rd_admin() or client_id = auth_client_id())',
      t, t
    );
  end loop;
end $$;

-- campaign_steps: scoped via parent campaign's client_id
create policy campaign_steps_tenant_all on campaign_steps for all
  using (
    auth_is_rd_admin() or
    campaign_id in (select id from campaigns where client_id = auth_client_id())
  )
  with check (
    auth_is_rd_admin() or
    campaign_id in (select id from campaigns where client_id = auth_client_id())
  );

-- users: can see users within own client, rd_admin sees all
create policy users_tenant_select on users for select
  using (auth_is_rd_admin() or client_id = auth_client_id());
create policy users_self_update on users for update
  using (auth_is_rd_admin() or id = auth.uid());

-- vehicles has no direct client_id? it does (client_id column present).
