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

COMMIT;