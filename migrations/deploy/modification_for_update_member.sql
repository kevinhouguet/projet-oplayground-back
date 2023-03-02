-- Deploy migrations:modification_for_update_member to pg

BEGIN;

DROP FUNCTION "update_member";

CREATE FUNCTION "update_member"(o_member json, userId int) RETURNS "member" AS $$

  UPDATE "member"
  SET 
        "username" = o_member->>'username',
        "firstname" = o_member->>'firstname',
        "lastname" = o_member->>'lastname',
        "avatar" = o_member->>'avatar',
        "age" = (o_member->>'age')::int,
        "sexe" = o_member->>'sexe',
        "city" = o_member->>'city',
        "updated_at" = now()
  WHERE "member"."id" = userId
  RETURNING *;

$$ LANGUAGE SQL STRICT;

COMMIT;
