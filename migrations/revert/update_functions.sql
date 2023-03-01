-- Revert migrations:update_functions from pg

BEGIN;

DROP FUNCTION "update_member", "update_encounter";

COMMIT;
