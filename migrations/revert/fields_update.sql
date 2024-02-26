-- Revert bruyeres:fields_update from pg

BEGIN;

ALTER TABLE "category"
  DROP COLUMN "display_category";

ALTER TABLE "event"
  DROP COLUMN "display_event";

ALTER TABLE "article"
  DROP COLUMN "display_featured_article",
  DROP COLUMN "display_stock_article",
  DROP COLUMN "img";

  ALTER TABLE "article"
    ADD COLUMN "type" text;


COMMIT;
