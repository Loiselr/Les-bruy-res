import client from "../../data/pg.client.js";

const categoryDatamapper = {
  //fonction qui permet d'envoyer une requete a la Bdd pour récupérer tous les articles .
  async getAll() {
    try {
      const query = "SELECT * FROM category ;";
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui crée une catégorie
  async postOne(title) {
    try {
      const query = {
        text: "INSERT INTO category (title , display_category) VALUES ($1,$2) RETURNING *",
        values: [title, true],
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui récupère une category par l'id
  async getOne(id) {
    try {
      const query = {
        text: "SELECT * FROM category WHERE id=$1 ;",
        values: [id],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui met à jour une catégorie
  async updateOne(data, id) {
    try {
      const query = {
        text: "UPDATE category SET title = $1, display_category=$2, updated_at = NOW() WHERE id = $3 RETURNING *",
        values: [data.title, data.display_category, id],
      };
      const result = await client.query(query);

      return result.rows[0];
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui vérifie si le title de la catégorie existe déjà en bdd
  async validateTitle(title) {
    try {
      const query = {
        text: "SELECT EXISTS (SELECT 1 FROM category WHERE title = $1);",
        values: [title],
      };
      const result = await client.query(query);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // fonction qui supprime une catégorie
  async deleteOne(id) {
    try {
      const query = {
        text: "UPDATE category SET display_category=false  WHERE id = $1 RETURNING *",
        values: [id]
      };
      await client.query(query);
      //  un message indiquant que l'event a été supprimé
      return { message: "La categorie a été supprimé avec succès." };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // fonction qui envoie l'id de l'article et l'id de la category lors de la création de l'article pour alimenter la table de liaison des 2
  async postCategoryHasArticle(article_id, category_id) {
    try {
      const query = {
        text: "INSERT INTO category_has_article (article_id, category_id) VALUES ($1, $2)",
        values: [article_id, category_id]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // idem pour l'update on envoie l'id de l'article et la nouvelle catégory qu'on lui rattache à la table de liaison des 2
  async updateCategoryHasArticle(newDataCategoryArticle, article_id) {
    try {
      const query = {
        text: "UPDATE category_has_article SET category_id = $1, updated_at = NOW() WHERE article_id = $2",
        values: [
          newDataCategoryArticle.categoryId,
          article_id
        ]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
};
export default categoryDatamapper;
