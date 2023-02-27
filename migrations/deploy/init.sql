-- SQLBook: Code

-- Deploy migrations:init to pg

BEGIN;

CREATE DOMAIN "email" AS TEXT CHECK (

  VALUE ~ '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+.[a-z]+$'

);

CREATE DOMAIN "postal_code_fr" AS text
CHECK(
    value ~ '^\d{5}$' -- code postaux metropole de 01 a 09
    -- value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    -- OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    -- OR value ~ '^[3-8]\d{5}$' -- code postaux les plus génériques
    -- OR value ~ '^[13-8]\d{3}$' -- 
    -- OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    -- OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    -- OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    -- OR value ~ '^9{5}$' -- code postal de la poste
);

CREATE TABLE
    "member" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "email" "email" NOT NULL UNIQUE,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "firstname" TEXT,
        "lastname" TEXT,
        "avatar" TEXT,
        "age" INT,
        "sexe" TEXT,
        "city" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "playground" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL,
        "surface" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "zip_code" "postal_code_fr" NOT NULL,
        "city" TEXT NOT NULL,
        "picture" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "encounter"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL,
        "start_date" TIMESTAMPTZ NOT NULL,
        "stop_date" TIMESTAMPTZ NOT NULL,
        "max_player" INT NOT NULL,
        "member_id" INT NOT NULL REFERENCES "member"("id"),
        "playground_id" INT NOT NULL REFERENCES "playground"("id"),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ
    );

CREATE TABLE
    "participe" (
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "encounter_id" INT NOT NULL,
        "member_id" INT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ,
        UNIQUE ("encounter_id", "member_id")
    );

COMMIT;