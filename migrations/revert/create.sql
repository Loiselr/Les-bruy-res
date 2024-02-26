-- Revert bruyeres:create from pg

BEGIN;

DROP TABLE "article", "event", "category", "user", "order", "category_has_article", "event_has_article", "order_has_article" CASCADE;


COMMIT;
