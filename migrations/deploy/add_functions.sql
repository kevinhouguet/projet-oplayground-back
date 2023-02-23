-- Deploy migrations:add_functions to pg

BEGIN;

CREATE FUNCTION "insert_member"(member json) RETURNS "member" AS $$ 
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
	        member ->> 'email',
	        member ->> 'username',
	        member ->> 'password',
	        member ->> 'firstname',
	        member ->> 'lastname',
	        member ->> 'avatar', 
					(member ->> 'age') :: int,
	        member ->> 'sexe',
	        member ->> 'city'
	    )
	RETURNING *;
	$$ LANGUAGE SQL;
	
CREATE FUNCTION "insert_playground"(playground JSON) RETURNS 
playground AS $$ 
	INSERT INTO
	    "playground" (
	        "name",
	        "address",
	        "zip_code",
	        "city",
	        "surface",
	        "picture"
	    )
	VALUES (
	        playground ->> 'name',
	        playground ->> 'address',
	        playground ->> 'zip_code',
	        playground ->> 'city',
	        playground ->> 'surface',
			playground ->> 'picture'
 
	    )
	RETURNING *;
	$$ LANGUAGE 
SQL; 




CREATE FUNCTION "insert_encounter"(encounter JSON) RETURNS 
encounter AS $$ 
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
	        (encounter ->> 'playground_id')::INT
	    )
	RETURNING *;
	$$ LANGUAGE 
SQL; 



COMMIT;