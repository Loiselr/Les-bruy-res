BEGIN;

DROP TABLE IF EXISTS "cart_has_article";
DROP TABLE IF EXISTS "cart";
DROP TABLE IF EXISTS "event_has_article";
DROP TABLE IF EXISTS "category_has_article";
DROP TABLE IF EXISTS "invoice";
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "category";
DROP TABLE IF EXISTS "event";
DROP TABLE IF EXISTS "article";



CREATE TABLE "article" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "img" text,
    "article_brand" text NOT NULL,
    "description" text,
    "size" text,
    "stock_quantity" int,
    "article_price" decimal(10,2),
    "display_stock_article" boolean NOT NULL DEFAULT true,
    "display_featured_article" boolean NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ
);
CREATE TABLE "event" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL ,
    "display_event" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "category" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "display_category" boolean NOT NULL DEFAULT true,
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
CREATE TABLE "invoice" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int REFERENCES "user"(id),
    "process_status" text,
    "issued_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "paid_at" TIMESTAMPTZ
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
CREATE TABLE "cart" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int REFERENCES "user"(id),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE "cart_has_article" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "cart_id" int REFERENCES "cart"(id),
    "article_id" int REFERENCES "article"(id),
    "article_quantity" int,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
COMMIT;