-- Deploy bruyeres:fields_update to pg

BEGIN;

ALTER TABLE "article"
  DROP COLUMN "type";

ALTER TABLE "article"
  ADD COLUMN "img" text,
  ADD COLUMN "display_stock_article" boolean NOT NULL DEFAULT true,
  ADD COLUMN "display_featured_article" boolean NOT NULL DEFAULT false,
  ADD COLUMN "article_brand" text;

ALTER TABLE "event"
  ADD COLUMN "display_event" boolean NOT NULL DEFAULT true;

ALTER TABLE "category"
  ADD COLUMN "display_category" boolean NOT NULL DEFAULT true;

COMMIT;
