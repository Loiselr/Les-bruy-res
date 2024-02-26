-- Revert bruyeres:add_cart_fonctionality from pg

BEGIN;

DROP TABLE "invoice";

DROP TABLE "cart_has_article";

DROP TABLE "cart";

CREATE TABLE "order" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "article_id" int REFERENCES "article"(id),
    "order_price" decimal(10,2),
    "order_status" text NOT NULL,
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
