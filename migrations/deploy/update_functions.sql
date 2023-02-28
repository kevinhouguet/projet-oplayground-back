-- Deploy migrations:update_functions to pg

BEGIN;

CREATE FUNCTION "update_member"(o_member json, userId int) RETURNS "member" AS $$

  UPDATE "member"
  SET 
        "username" = o_member->>'username',
        "password" = o_member->>'password',
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

CREATE FUNCTION "update_encounter"(o_encounter json) RETURNS "encounter" AS $$

  UPDATE "encounter"
  SET 
        "name"  = o_encounter->>'name',
        "start_date"  = (o_encounter->>'start_date')::TIMESTAMPTZ,
        "stop_date"  = (o_encounter->>'stop_date')::TIMESTAMPTZ,
        "max_player"  = (o_encounter->>'max_player')::int,
        "updated_at" = now()
  WHERE "encounter"."id" = (o_encounter->>'id')::int
  RETURNING *;

$$ LANGUAGE SQL STRICT;

COMMIT;
