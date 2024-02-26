import client from "../../data/pg.client.js";

const eventDatamapper = {

  // fontion qui retourne tous les events
  async findAll() {
    try {
      const query = "SELECT * FROM \"event\";";
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // fonction qui permet de toruver un event par son id
  async findByID(id) {
    try {
      const query = {
        text: "SELECT * FROM \"event\" WHERE id = $1",
        values: [id],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // fonction qui met à jour un event
  async updateEvents(data, id) {
    try {
      const query = {
        text: "UPDATE \"event\" SET title = $1, display_event=$2, updated_at = NOW() WHERE id = $3 RETURNING *",
        values: [data.title, data.display_event, id],
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // fonction qui supprime un event
  async deleteEvents(id) {
    try {
      const query = {
        text: "UPDATE event SET display_event=false  WHERE id = $1 RETURNING *",
        values: [id]
      };
      await client.query(query);
      //  un message indiquant que l'event a été supprimé
      return { message: "L'event a été supprimé avec succès." };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // fonction qui crée un event
  async postOneEvent(data) {
    try {
      const query = {
        text: "INSERT INTO \"event\" (title,display_event) VALUES ($1,$2) RETURNING *;",
        values: [data.title, true],
      };
      await client.query(query);
      //  un message indiquant que l'event a été supprimé
      return { message: "L'event a été ajouté avec succès." };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // fonction qui vérifie si le title de l'event existe déjà
  async validateTitle(title) {
    try {
      const query = {
        text: "SELECT EXISTS (SELECT 1 FROM event WHERE title = $1);",
        values: [title],
      };
      const result = await client.query(query);
      return result.rows[0].exists;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // fonction qui envoie l'id de l'article et l'id de l'event lors de la création de l'article pour alimenter la table de liaison des 2
  async postEventHasArticle(article_id, event_id) {
    try {
      const query = {
        text: "INSERT INTO event_has_article (article_id, event_id) VALUES ($1, $2)",
        values: [article_id, event_id]
      };
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // idem pour l'update on envoie l'id de l'article et le nouvel event qu'on lui rattache à la table de liaison des 2
  async updateEventHasArticle(newDataEventArticle, article_id) {
    try {
      const query = {
        text: "UPDATE event_has_article SET event_id = $1, updated_at = NOW() WHERE article_id = $2",
        values: [
          newDataEventArticle.eventId,
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
export default eventDatamapper;
