-- Deploy migrations:add_functions to pg

BEGIN;

CREATE FUNCTION "INSERTMEMBER"(MEMBER JSON) RETURNS 
MEMBER AS $$ 
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
	        member ->> 'avatar', (member ->> 'age') :: int,
	        member ->> 'sexe',
	        member ->> 'city'
	    )
	RETURNING *;
	$$ LANGUAGE 
SQL; 
CREATE FUNCTION "INSERTPLAYGROUND"(playground JSON) RETURNS 
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




CREATE FUNCTION "INSERTENCOUNTER"(encounter JSON) RETURNS 
encounter AS $$ 
	INSERT INTO
	    "encoutner" (
	        "name",
			"member_id",
	        "start_date",
	        "stop_date",
	        "max-player",
	        "playground",
	        "created_at", 
			"updated_at"
	    )
	VALUES (
	        playground ->> 'name',
			playground ->> 'member_id'
	        playground ->> 'start_date',
	        playground ->> 'stop_date',
	        playground ->> 'max_player',
	        playground ->> 'playground',
			playground ->> 'created_ad',
			playground ->> 'updated_at'
			
 
	    )
	RETURNING *;
	$$ LANGUAGE 
SQL; 



COMMIT;