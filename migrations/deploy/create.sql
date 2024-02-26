-- Deploy bruyeres:create to pg

BEGIN;

CREATE TABLE "article" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL ,
    "type" text NOT NULL,
    "description" text,
    "size" text,
    "stock_quantity" int,
    "article_price" decimal(10,2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ
);
CREATE TABLE "event" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "category" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text,
    "email" text NOT NULL UNIQUE CHECK(
      "email" ~ '^.+@[a-z]+\.[a-z]{2,3}$'  -- check de validation mail simpliste avec une rélle contrainte après le "@"
    ),
    "password" text NOT NULL ,
    "address" text,
    "zip_code" text CHECK(
    "zip_code" ~ '^0[1-9]\d{3}$' -- code postaux (métropole) de 01 à 09
    OR "zip_code" ~ '^[1-8]\d{4}$' -- code postaux (métropole) de 10 à 89
    OR "zip_code" ~ '^9[0-59]\d{3}$' -- code postaux  (métropole) de 90 à 95 + La poste et les Jeu concours
    OR "zip_code" ~ '^97[1-8]\d{2}$' -- DOM
    OR "zip_code" ~ '^98[046-9]\d{2}$' -- TOM + monaco
    OR "zip_code" ~ '^00000$'
    ),
    "city" text,
    "phone_number" text CHECK(
      "phone_number" ~ '^(.33.|0)\d{9}$' -- numéros de téléphone commençant par "+33 " ou "0" suivi de 9 chiffres uniquement.
    ),
    "is_admin" boolean NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "order" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "article_id" int REFERENCES "article"(id),
    "order_price" decimal(10,2),
    "order_status" text NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "category_has_article" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "category_id" int REFERENCES "category"(id),
    "article_id" int REFERENCES "article"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "event_has_article" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "event_id" int REFERENCES event(id),
    "article_id" int REFERENCES "article"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "order_has_article" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "order_id" int REFERENCES "order"(id),
    "article_id" int REFERENCES "article"(id),
    "article_quantity" int NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;