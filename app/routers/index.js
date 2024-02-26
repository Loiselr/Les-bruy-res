// import d'express
import express from "express";

// import de la variable apiRouter
import apiRouter from "./api/apiRouter.js";
import pageNotfound from "../middlewares/404.js";

const router = express.Router();

// ici c'est le point d'entrée de notre Api . localhost:3000/api
router.use("/api", apiRouter);
// ici c'est  un middleware qui récupére toutes les routes qui ne sont pas défini.
router.use(pageNotfound);

export default router;
