import express from "express";
import * as adminController from "../../controller/adminController.js";


const apiAdmin = express.Router();
// toutes les routes protégées spécifiques à l'admin
apiAdmin.route("/")
  .get(adminController.home);

apiAdmin.route("/articles/:id")
  .get(adminController.getArticle);

apiAdmin.route("/categorys")
  .get(adminController.homeCategorys);

apiAdmin.route("/events")
  .get(adminController.homeEvents);
apiAdmin.route("/articles")
  .get(adminController.homeArtciles);

export default apiAdmin;