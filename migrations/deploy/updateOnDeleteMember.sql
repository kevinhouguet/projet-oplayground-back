-- Deploy migrations:updateOnDeleteMember to pg

BEGIN;

ALTER TABLE "encounter"
DROP CONSTRAINT "encounter_member_id_fkey";
ALTER TABLE "encounter"
ADD CONSTRAINT "encounter_member_id_fkey"
Foreign Key ("member_id") REFERENCES "member"("id")
ON DELETE CASCADE;

COMMIT;
