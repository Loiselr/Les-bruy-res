-- Verify bruyeres:add_cart_fonctionality on pg

BEGIN;

SELECT * FROM "cart" WHERE false;
SELECT * FROM "cart_has_article" WHERE false;
SELECT * FROM "invoice" WHERE false;

ROLLBACK;
