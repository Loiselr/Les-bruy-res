import express from "express";
import * as loginAdminController from "../../controller/loginAdminController.js";
import jwt from "../../middlewares/authentificationJwt.js";

const apiLoginAdmin = express.Router();

// route de login admin

/**
 * @swagger
 * tags:
 *   name: loginAdmin
 *   description: Opérations relatives à la connexion de l'admin
 */

/**
 * @swagger
 * /api/loginAdmin/:
 *   post:
 *     tags: [loginAdmin]
 *     summary: Authentification d'un utilisateur admin
 *     description: Authentifie un utilisateur avec les tokens et lui crée une session. Il faut envoyer le token dans le body.
 *     parameters:
 *       - in: body
 *         name: Authorization
 *         description: Le token d'authentification à transmettre dans le corps de la requête.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       '200':
 *         description: Utilisateur authentifié avec succès
 *       '401':
 *         description: Échec de l'authentification - Identifiants incorrects
 *       '500':
 *         description: Erreur serveur
 */
apiLoginAdmin.route("/").post(jwt, loginAdminController.login);

export default apiLoginAdmin;
