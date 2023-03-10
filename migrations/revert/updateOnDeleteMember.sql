-- Revert migrations:updateOnDeleteMember from pg

BEGIN;

ALTER TABLE "encounter"
DROP CONSTRAINT "encounter_member_id_fkey";
ALTER TABLE "encounter"
ADD CONSTRAINT "encounter_member_id_fkey"
Foreign Key ("member_id") REFERENCES "member"("id");

COMMIT;
