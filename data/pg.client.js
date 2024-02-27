// import des variables d'environnement
import "../app/helpers/env.load.js";
// import de postgrés
import pg from "pg";

// Création d'un pool de connexions
const client = new pg.Pool({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: true // Permet de ne pas rejeter les certificats auto-signés
  }
});

// quand tout est ok on se connecte à la db puis on exporte le client
await client.connect();

console.log("👽👽 Connected to db");

export default client;
