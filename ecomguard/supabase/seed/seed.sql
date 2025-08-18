insert into stores (id, name) values ('00000000-0000-0000-0000-000000000001', 'Demo Store') on conflict do nothing;
insert into customers (id, store_id, email, first_name, last_name) values
  ('00000000-0000-0000-0000-000000000101','00000000-0000-0000-0000-000000000001','jane@example.com','Jane','Doe') on conflict do nothing;

insert into carts (id, store_id, customer_id, value_cents, status) values
  ('00000000-0000-0000-0000-000000000201','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000101', 12900, 'recovered') on conflict do nothing;

insert into orders (id, store_id, customer_id, total_cents, status) values
  ('00000000-0000-0000-0000-000000000301','00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000101', 7900, 'hold') on conflict do nothing;

insert into interventions (id, store_id, trigger, channel, ab_bucket, goal, outcome) values
  ('00000000-0000-0000-0000-000000000401','00000000-0000-0000-0000-000000000001','cart_abandoned','email','A','recover_cart','{"status":"sent"}'::jsonb) on conflict do nothing;

