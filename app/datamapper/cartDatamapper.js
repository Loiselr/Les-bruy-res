import client from "../../data/pg.client.js";

const cartDatamapper = {

  // fonction qui insère une clé étrangère dans la table cart à la création d'un user pour lui attribuer un panier vide en bdd
  async insertUserIdToEmptyCart(userId) {
    try {
      const query = {
        text: "INSERT INTO cart (user_id) VALUES ($1)",
        values: [userId]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui récupère les articles pour les push dans la bdd, dans la table de liaison entre le panier et les articles, un user ayant déjá son panier attribué à la création du compte la liaison est éjà faite
  async insertArticlesToCart(cartId, articleId, articleQuantity) {
    try {
      const query = {
        text: "INSERT INTO cart_has_article (cart_id, article_id, article_quantity, created_at) VALUES ($1, $2, $3, now());",
        values: [cartId, articleId, articleQuantity]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  // fonction qui récupère le panier avec les infos du user rattaché, les articles et leurs quantités ainsi que leurs prix
  async findCartByUserId(id) {
    try {
      const query = {
        text: `
          SELECT 
            cart.id AS cart_id,
            "user".id AS user_id,
            "user".name AS user_name,
            cart_has_article.article_quantity,
            article.id AS article_id,
            article.name AS article_name,
            article.img AS article_img,
            article.article_price
          FROM 
            cart
              JOIN 
                "user" ON cart.user_id = "user".id
              LEFT JOIN 
                cart_has_article ON cart.id = cart_has_article.cart_id
              LEFT JOIN 
                article ON cart_has_article.article_id = article.id
          WHERE 
            cart.user_id = $1;`,
        values: [id]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  // fonction qui clear les articles et leurs quantités du panier
  async clearCartData(cartId) {
    try {
      const query = {
        text: `UPDATE cart_has_article
                SET cart_id = NULL, article_id = NULL, article_quantity = NULL
                WHERE cart_id = $1;`,
        values: [cartId]
      };
      console.log(query);
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }
};

export default cartDatamapper;