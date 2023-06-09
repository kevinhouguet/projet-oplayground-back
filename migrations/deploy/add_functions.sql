-- Active: 1676920512537@@127.0.0.1@5432@oplayground
-- Deploy migrations:add_functions to pg

BEGIN;

CREATE FUNCTION "insert_member"(o_member json) RETURNS "member" AS $$ 
	INSERT INTO
	    "member" (
	        "email",
	        "username",
	        "password",
	        "firstname",
	        "lastname",
	        "avatar",
	        "age",
	        "sexe",
	        "city"
	    )
	VALUES (
	        o_member ->> 'email',
	        o_member ->> 'username',
	        o_member ->> 'password',
	        o_member ->> 'firstname',
	        o_member ->> 'lastname',
	        o_member ->> 'avatar', 
					(o_member ->> 'age') :: int,
	        o_member ->> 'sexe',
	        o_member ->> 'city'
	    )
	RETURNING *;
$$ LANGUAGE SQL STRICT;
	
CREATE FUNCTION "insert_playground"(playground JSON) RETURNS playground AS $$ 
	INSERT INTO
	    "playground" (
					"id",
	        "name",
	        "address",
	        "zip_code",
	        "city",
	        "surface",
	        "picture"
	    )
	VALUES (
					playground ->> 'playgroundId',
	        playground ->> 'name',
	        playground ->> 'address',
	        playground ->> 'zipCode',
	        playground ->> 'city',
	        playground ->> 'surface',
			playground ->> 'picture'
 
	    )
	RETURNING *;
$$ LANGUAGE SQL; 




CREATE FUNCTION "insert_encounter"(encounter JSON) RETURNS encounter AS $$ 
	INSERT INTO
	    "encounter" (
	        "name",
					"member_id",
	        "start_date",
	        "stop_date",
	        "max_player",
	        "playground_id"
	    )
	VALUES (
	        encounter ->> 'name',
					(encounter ->> 'member_id')::INT,
	        (encounter ->> 'start_date')::TIMESTAMPTZ,
	        (encounter ->> 'stop_date')::TIMESTAMPTZ,
	        (encounter ->> 'max_player')::INT,
	        encounter ->> 'playgroundId'
	    )
	RETURNING *;
$$ LANGUAGE SQL; 


COMMIT;