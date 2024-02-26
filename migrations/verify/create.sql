-- Verify bruyeres:create on pg

BEGIN;

SELECT * FROM "article" WHERE false;
SELECT * FROM "event" WHERE false;
SELECT * FROM "category" WHERE false;
SELECT * FROM "user" WHERE false;
SELECT * FROM "category_has_article" WHERE false;
SELECT * FROM "event_has_article" WHERE false;

ROLLBACK;
