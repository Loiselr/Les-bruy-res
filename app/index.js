import "./helpers/env.load.js";
// import de express
import express from "express";
// import du router
import router from "./routers/index.js";
// import des cors
import cors from "cors";

import swaggerSpec from "../swaggerConfig.js";
import swaggerUi from "swagger-ui-express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import Redis from "redis";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);


// Créer un client Redis
// Créer un client Redis
const redisClient = Redis.createClient({
  host: "redis-16047.c311.eu-central-1-1.ec2.cloud.redislabs.com", // Adresse du serveur Redis
  port: 16047, // Port Redis
  password: process.env.KEY_REDIS, // Mot de passe Redis (si nécessaire)
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
//on parametre les cors pour pouvoir appeler notre back partout .
app.use(cors({ origin: "*" }));
//on utilise express.json et express.urlencoded pour pouvoir lire le json et  le req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Utilisation du middleware express-session
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET_KEY_FOR_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.SECURE_COOKIE === "true", httpOnly: true, sameSite: "strict", maxAge: 3600000 }  //A définir secure à true en production 
}));




// Définir le moteur de modèle à utiliser 
app.set("view engine", "ejs");
app.set("views", "./app/views");
const publicDirectory = join(__dirname, "..", "public");
const dist = join(__dirname, "..", "dist");
app.use(express.static(publicDirectory));
app.use(express.static(dist));

// Configuration de Swagger-UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Configuration de la route principale pour rediriger vers la documentation Swagger


const cheminAbsolu = join(__dirname, "../test_route_admin/index.html");
app.get("/test_admin", (req, res) => {
  res.sendFile(cheminAbsolu);
});


// on lance le router
app.use(router);

export default app;
