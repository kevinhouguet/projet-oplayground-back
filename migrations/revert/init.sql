-- Active: 1676920512537@@127.0.0.1@5432@oplayground

-- Revert migrations:init from pg

BEGIN;

DROP TABLE "participe", "encounter", "member", "playground" CASCADE;

DROP DOMAIN "email", "postal_code_fr" CASCADE;

COMMIT;