-- Deploy bruyeres:add_cart_fonctionality to pg

BEGIN;

DROP TABLE "order_has_article";
DROP TABLE "order";

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

CREATE TABLE "invoice"(
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int REFERENCES "user"(id),
    "process_status" text,
    -- created_at
    "issued_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "paid_at" TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ
);
COMMIT;
