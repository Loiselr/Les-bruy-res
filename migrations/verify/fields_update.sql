-- Verify bruyeres:fields_update on pg

BEGIN;


SELECT "display_category" FROM "category" WHERE false;

SELECT "display_event" FROM "event" WHERE false;

SELECT "img", "display_stock_article", "display_featured_article" FROM "article" WHERE false;



ROLLBACK;
