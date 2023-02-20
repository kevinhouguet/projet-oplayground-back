-- Revert migrations:init from pg

BEGIN;

DROP TABLE "participe", "EVENT", "member", "playground";

COMMIT;