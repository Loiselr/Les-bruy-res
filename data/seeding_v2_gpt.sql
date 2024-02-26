BEGIN;

-- Insertion des articles de fleurs avec génération automatique des IDs
INSERT INTO "article" ("name", "img", "article_brand", "description", "size", "stock_quantity", "article_price", "display_stock_article", "display_featured_article") VALUES
    ('Bougie parfumée à la lavande', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340579/bougie_viwgot.jpg', 'Bougies parfumées', 'Bougie parfumée à la lavande pour une ambiance relaxante.', 'Petite', 100, 12.99, true, false),
    ('Roses rouges', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Roses', 'Magnifiques roses rouges pour exprimer votre amour.', 'Moyenne', 50, 24.99, true, true),
    ('Bouquet de fleurs variées', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de fleurs fraîches et colorées pour toutes les occasions.', 'Grand', 75, 39.99, true, false),
    ('Tulipes multicolores', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Tulipes', 'Tulipes aux couleurs vives pour égayer votre journée.', 'Moyenne', 40, 19.99, true, false),
    ('Bougie parfumée à la vanille', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340579/bougie_viwgot.jpg', 'Bougies parfumées', 'Bougie parfumée à la vanille pour une ambiance chaleureuse.', 'Petite', 80, 12.99, true, true),
    ('Bouquet de roses blanches', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de roses blanches pour une occasion spéciale.', 'Grand', 60, 49.99, true, false),
    ('Bouquet de lys blancs', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de lys blancs pour une touche d élégance.', 'Moyenne', 30, 34.99, true, false),
    ('Bouquet de tournesols', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de tournesols pour ajouter du soleil à votre journée.', 'Grand', 45, 29.99, true, false),
    ('Lavande séchée', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Plantes séchées', 'Bouquet de lavande séchée pour parfumer votre maison.', 'Moyenne', 20, 9.99, true, false),
    ('Bougie parfumée à la rose', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340579/bougie_viwgot.jpg', 'Bougies parfumées', 'Bougie parfumée à la rose pour une ambiance romantique.', 'Petite', 90, 14.99, true, false),
    ('Orchidée blanche', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Orchidées', 'Orchidée blanche pour une touche d exotisme dans votre maison.', 'Moyenne', 35, 39.99, true, false),
    ('Bouquet de pivoines', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de pivoines pour un charme vintage.', 'Grand', 55, 44.99, true, false),
    ('Lys orientaux', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Lys', 'Lys orientaux pour une touche de raffinement.', 'Moyenne', 25, 19.99, true, false),
    ('Bougie parfumée à la cannelle', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340579/bougie_viwgot.jpg', 'Bougies parfumées', 'Bougie parfumée à la cannelle pour une ambiance festive.', 'Petite', 85, 12.99, true, false),
    ('Bouquet de marguerites', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de marguerites pour une fraîcheur printanière.', 'Moyenne', 42, 29.99, true, false),
    ('Bouquet de jasmin', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de jasmin pour une douceur parfumée.', 'Grand', 58, 49.99, true, true),
    ('Roses pastel', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Roses', 'Roses pastel pour une délicate déclaration.', 'Moyenne', 38, 27.99, true, false),
    ('Bougie parfumée au citron', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340579/bougie_viwgot.jpg', 'Bougies parfumées', 'Bougie parfumée au citron pour une ambiance rafraîchissante.', 'Petite', 95, 12.99, true, false),
    ('Lierre en pot', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Plantes', 'Lierre en pot pour une verdure facile à entretenir.', 'Moyenne', 22, 14.99, true, false),
    ('Bouquet de renoncules', 'https://res.cloudinary.com/dahcyrch4/image/upload/v1708340559/roses_nsol50.jpg', 'Bouquets', 'Bouquet de renoncules pour une explosion de couleurs.', 'Grand', 65, 37.99, true, false);



-- Insertion des utilisateurs (employés ou clients) avec génération automatique des IDs
INSERT INTO "user" ("name", "email", "password", "zip_code", "phone_number", "created_at") VALUES
    ('Jeanne', 'jeanne@example.com', 'motdepasse123', '75001', '0612345678', now()),
    ('Marc', 'marc@example.com', '123456', '69001', '0698765432', now()),
    ('Sophie', 'sophie@example.com', 'password123', '13001', '0610234567', now()),
    ('Pierre', 'pierre@example.com', 'abcdef', '31000', '0621345678', now()),
    ('Marie', 'marie@example.com', '123abc', '44000', '0609876543', now()),
    ('Paul', 'paul@example.com', 'password456', '59000', '0632145678', now()),
    ('Camille', 'camille@example.com', '789xyz', '75002', '0678123456', now()),
    ('Nicolas', 'nicolas@example.com', 'abc123', '69002', '0687654321', now()),
    ('Julie', 'julie@example.com', 'pass123', '13002', '0612345670', now()),
    ('Thomas', 'thomas@example.com', '456def', '31001', '0678234561', now()),
    ('Caroline', 'caroline@example.com', 'pass789', '44001', '0609123457', now()),
    ('Luc', 'luc@example.com', 'xyz456', '59001', '0612314568', now()),
    ('Alice', 'alice@example.com', '789pass', '75003', '0698123456', now()),
    ('Émilie', 'emilie@example.com', 'def123', '69003', '0612456789', now());

-- Insertion des commandes avec génération automatique des IDs
INSERT INTO "invoice" ("user_id", "process_status", "issued_at", "paid_at") VALUES
    (1, 'En attente', '2023-05-15', '2023-06-01'),
    (2, 'Livré', '2023-04-20', '2023-05-10'),
    (3, 'En cours de traitement', '2023-03-10', '2023-04-05'),
    (4, 'En attente', '2023-02-25', '2023-03-20'),
    (5, 'En attente', '2023-01-12', '2023-02-01'),
    (6, 'Livré', '2022-12-20', '2023-01-15'),
    (7, 'En cours de traitement', '2022-11-05', '2022-12-01'),
    (8, 'En attente', '2022-10-18', '2022-11-10'),
    (9, 'En attente', '2022-09-30', '2022-10-25'),
    (10, 'Livré', '2022-08-12', '2022-09-05');

-- Insertion de données dans la table "cart"
INSERT INTO "cart" ("user_id", "created_at") 
VALUES
  (1, now()),  
  (2, now()),  
  (3, now()),  
  (4, now()),  
  (5, now()),  
  (6, now()),  
  (7, now()),  
  (8, now()),  
  (9, now()),  
  (10, now()), 
  (11, now()), 
  (12, now()), 
  (13, now()); 
  


-- Liaison des articles avec les paniers dans la table "cart_has_article"
INSERT INTO "cart_has_article" ("cart_id", "article_id", "article_quantity", "created_at") 
VALUES 
  (1, 11, 2, now()), 
  (1, 14, 1, now()), 
  (2, 12, 1, now()), 
  (2, 13, 5, now()), 
  (2, 14, 2, now()), 
  (2, 3, 1, now()), 
  (3, 1, 1, now()), 
  (3, 15, 2, now()), 
  (4, 4, 1, now()),  
  (4, 2, 2, now()),  
  (4, 6, 4, now()),  
  (4, 10, 2, now()),  
  (4, 5, 1, now()),  
  (5, 5, 2, now()),  
  (6, 6, 1, now()),  
  (7, 7, 2, now()),  
  (8, 8, 3, now()),  
  (9, 9, 1, now()),  
  (10, 10, 2, now()),
  (11, 12, 1, now()), 
  (11, 1, 3, now()), 
  (11, 4, 1, now()), 
  (11, 16, 2, now()), 
  (11, 18, 2, now()), 
  (11, 20, 1, now()), 
  (11, 3, 5, now()), 
  (11, 8, 1, now()), 
  (12, 2, 2, now());
--   (13, 3, 2, now()); 

-- Insertion des catégories de fleurs avec génération automatique des IDs
INSERT INTO "category" ("title", "created_at") VALUES 
    ('Roses', now()),
    ('Lys', now()),
    ('Tulipes', now());

-- Insertion des événements promotionnels avec génération automatique des IDs
INSERT INTO "event" ("title", "created_at") VALUES 
    ('Fête des mères', now()),
    ('Saint-Valentin', now()),
    ('Deuil', now()),
    ('Mariage', now());


INSERT INTO "category_has_article" ("category_id", "article_id", "created_at") VALUES
    (1, 2, now()),
    (2, 7, now()),
    (3, 4, now()),
    (1, 18, now()),
    (2, 12, now()),
    (3, 8, now()),
    (1, 10, now()),
    (2, 14, now()),
    (3, 9, now()),
    (1, 16, now()),
    (2, 3, now()),
    (3, 15, now()),
    (1, 6, now()),
    (2, 11, now()),
    (3, 5, now()),
    (1, 17, now()),
    (2, 1, now()),
    (3, 2, now());

INSERT INTO "event_has_article" ("event_id", "article_id", "created_at") VALUES
    (1, 2, now()),
    (2, 4, now()),
    (1, 7, now()),
    (3, 18, now()),
    (4, 12, now()),
    (2, 8, now()),
    (1, 10, now()),
    (2, 14, now()),
    (3, 9, now()),
    (1, 16, now()),
    (4, 3, now()),
    (2, 15, now()),
    (1, 6, now()),
    (3, 11, now()),
    (2, 5, now()),
    (1, 17, now()),
    (3, 1, now()),
    (2, 2, now());


COMMIT;