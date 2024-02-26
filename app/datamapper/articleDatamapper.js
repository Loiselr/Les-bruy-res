import client from "../../data/pg.client.js";

const articleDatamapper = {
  // fonction qui permet d'envoyer une requete a la Bdd pour récupérer tous les articles .
  async getAllArticles() {
    try {
      // ici la requête permet d'éviter les doublons d'articles qui sont liés aux mêmes events et/ou categorys. Utilisation de sous requêtes sous forme d'aggrégat pour regrouper les résultats sur une seule ligne par article. DISTINCT permet que chaque ligne soit unique
      const query = `
      SELECT
        article.*,
        (SELECT ARRAY_AGG(DISTINCT event_has_article.event_id)
      FROM event_has_article
      WHERE
        event_has_article.article_id = article.id) AS event_ids,
        (SELECT ARRAY_AGG(DISTINCT event.title)
      FROM event_has_article
        JOIN event
          ON event_has_article.event_id = event.id
      WHERE
        event_has_article.article_id = article.id) AS event_titles,
        (SELECT ARRAY_AGG(DISTINCT category_has_article.category_id)
      FROM category_has_article
      WHERE
        category_has_article.article_id = article.id) AS category_ids,
        (SELECT ARRAY_AGG(DISTINCT category.title)
      FROM category_has_article
        JOIN category
          ON category_has_article.category_id = category.id
      WHERE
        category_has_article.article_id = article.id) AS category_titles
      FROM article;`;
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui permet de solliciter la BDD pour un article par son id, sécurisons la récupération de la value avec $1 pour que Postgrés vérifie si la donnée correspondà ce que l'on a en bdd
  async getOneArticle(articleId) {
    try {
      const query = {
        text: `
        SELECT
          article.*,
          event.id AS event_id,
          event.title AS event_title,
          category.id AS category_id,
          category.title AS category_title
        FROM article
          JOIN event_has_article
            ON article.id = event_has_article.article_id
          JOIN event
            ON event_has_article.event_id = event.id
          JOIN category_has_article
            ON article.id = category_has_article.article_id
          JOIN category ON category_has_article.category_id = category.id
        WHERE
          article.id = $1;`,
        values: [articleId],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui vérifie si le name envoyé est déjà présent en bdd
  async validateName(name) {
    try {
      const query = {
        text: "SELECT EXISTS (SELECT 1 FROM article WHERE name = $1);",
        values: [name],
      };
      const result = await client.query(query);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui crée un article
  async createOneArticle(articleBody) {
    const { name, img, article_brand, description, size, stock_quantity, article_price, display_stock_article, display_featured_article } = articleBody;
    try {
      const query = {
        text: "INSERT INTO article (name,img, article_brand, description, size, stock_quantity, article_price, display_stock_article, display_featured_article) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        values: [name, img, article_brand, description, size, stock_quantity, article_price, display_stock_article || true, display_featured_article || false],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  // fonction qui met à jour un article
  async updateOneArticle(newDataArticle, id) {

    try {
      const query = {
        text: "UPDATE article SET name=$1, img=$2, article_brand=$3, description=$4, size=$5, stock_quantity=$6, article_price=$7, display_stock_article=$8, display_featured_article=$9, updated_at = NOW() WHERE id = $10",
        values: [
          newDataArticle.name,
          newDataArticle.img,
          newDataArticle.article_brand,
          newDataArticle.description,
          newDataArticle.size,
          newDataArticle.stock_quantity,
          newDataArticle.article_price,
          newDataArticle.display_stock_article,
          newDataArticle.display_featured_article,
          id
        ],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  //fonction qui supprime un article
  async deleteOneArticle(id) {
    try {
      const query = {
        text: "UPDATE article SET display_stock_article=false, deleted_at=now() WHERE id = $1 RETURNING *",
        values: [id]
      };
      await client.query(query);

      // un message indiquant à l'utilisateur que l'article a été supprimé
      return { message: "L'article a été supprimé avec succès" };
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }
};

export default articleDatamapper;