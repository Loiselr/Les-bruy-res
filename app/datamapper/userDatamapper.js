import client from "../../data/pg.client.js";
const userDatamapper = {
  //fonction qui permet d'envoyer une requete a la Bdd pour récupérer tous les articles .
  async getAllUsers() {
    try {
      const query = "SELECT * FROM \"user\"";
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // fonction qui permet de solliciter la BDD pour un article par son id, sécurisons la récupération de la value avec $1 pour que Postgrés vérifie si la donnée correspondà ce que l'on a en bdd
  async getOneUser(userId) {
    try {
      const query = {
        text: "SELECT * FROM \"user\" WHERE id = $1",
        values: [userId],
      };
      const result = await client.query(query);

      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  //fonction qui créer un user
  async createUser(data) {
    try {
      const query = {
        text: "INSERT INTO \"user\" (password,name,email,address,zip_code,city,phone_number) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING id",
        values: [
          data.password,
          data.name,
          data.email,
          data.address,
          data.zip_code,
          data.city,
          data.phone_number
        ],
      };
      const result = await client.query(query);

      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  //fonction qui recherche le mail dans la bdd et qui renvoit toute la ligne du user
  async findEmail(email) {
    try {

      const query = {
        text: "SELECT * FROM \"user\" WHERE \"email\" = $1;",
        values: [email],
      };
      const result = await client.query(query);

      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // fonction qui met à jour un user
  async updateUser(newDataUser, id) {
    try {
      const query = {
        text: `UPDATE "user" SET
        password = $1,
        name = $2,
        email = $3,
        address = $4,
        zip_code = $5,
        city = $6 ,
        phone_number = $7,
        updated_at = NOW()
            WHERE id = $8`,
        values: [
          newDataUser.password,
          newDataUser.name,
          newDataUser.email,
          newDataUser.address,
          newDataUser.zip_code,
          newDataUser.city,
          newDataUser.phone_number,
          id,
        ],
      };
      const result = await client.query(query);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // fonction de suppression d'un user
  async deleteUser(id) {
    try {
      const query = {
        text: "DELETE FROM \"user\" WHERE id = $1;",
        values: [id],
      };
      await client.query(query);
      //  un message indiquant que l'utilisateur a été supprimé
      return { message: "L'utilisateur a été supprimé avec succès." };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};
export default userDatamapper;
