-- Active: 1676920512537@@127.0.0.1@5432@oplayground
-- Revert migrations:add_functions from pg

BEGIN;

DROP FUNCTION "insert_member", "insert_playground", "insert_encounter" CASCADE;

COMMIT;
