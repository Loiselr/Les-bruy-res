import express from "express";
import * as loginController from "../../controller/loginController.js";
import checkDataUser from "../../middlewares/checkDataUser.js";
const apiLogin = express.Router();

// route de login

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Opérations relatives à l'authentification des utilisateurs
 */

/**
 * @swagger
 * /api/login/:
 *   post:
 *     tags: [Authentification]
 *     summary: Authentification d'un utilisateur
 *     description: Authentifie un utilisateur avec les informations fournies et renvoit un Token.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Les informations d'authentification de l'utilisateur
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Utilisateur authentifié avec succès
 *       '401':
 *         description: Échec de l'authentification - Identifiants incorrects
 *       '500':
 *         description: Erreur serveur
 */
apiLogin.route("/").post(checkDataUser, loginController.login);

export default apiLogin;
