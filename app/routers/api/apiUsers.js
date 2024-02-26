import express from "express";
import jwt from "../../middlewares/authentificationJwt.js";
import * as usersController from "../../controller/usersController.js";
import checkSession from "../../middlewares/chechSession.js";

const apiUser = express.Router();

// routes pour un user non admin
/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Opérations relatives aux utilisateurs
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupère un utilisateur par son ID
 *     description: Récupère les détails d'un utilisateur spécifique en fonction de son ID.Nécessite une session admin.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré avec succès
 *       '401':
 *         description: Non autorisé - 
 *       '404':
 *         description: Utilisateur non trouvé
 *       '500':
 *         description: Erreur serveur
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags: [Utilisateurs]
 *     summary: Met à jour un utilisateur
 *     description: Met à jour les détails d'un utilisateur. Et renvoie un nouveau token à jour
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: string
 *       - name: Authorization
 *         in: header
 *         description: Token d'authentification
 *         required: true
 *         type: string
 *         default: Bearer
 *       - in: body
 *         name: user
 *         description: Les détails de l'utilisateur à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *             newPassword:
 *               type: string
 *             newPasswordConfirm:
 *               type: string
 *             newName:
 *               type: string
 *             newEmail:
 *               type: string
 *             newAddress:
 *               type: string
 *             newZip_code:
 *               type: string
 *             newCity:
 *               type: string
 *             newPhone_number:
 *               type: string
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour avec succès
 *       '401':
 *         description: Non autorisé - Token invalide ou non fourni veuillez vous reconnecter
 *       '500':
 *         description: Erreur serveur
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags: [Utilisateurs]
 *     summary: Supprime un utilisateur
 *     description: Supprime un utilisateur en fonction de son token, nécessite également un email et un mot de passe.
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token d'authentification
 *         required: true
 *         type: string
 *         default: Bearer
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: Les détails de l'utilisateur à supprimer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '204':
 *         description: Utilisateur supprimé avec succès
 *       '401':
 *         description: Non autorisé - Token invalide ou non fourni veuillez vous reconnecter
 *       '500':
 *         description: Erreur serveur
 * 
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

apiUser.route("/:id")
  .get(checkSession, usersController.getOneUser)
  .put(jwt, usersController.updateOneUser)
  .delete(jwt, usersController.deleteOne);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupère tous les utilisateurs
 *     description: Récupère tous les utilisateurs avec un token valide.Nécessite une session admin.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Utilisateurs récupérés avec succès
 *       '401':
 *         description: Non autorisé -
 *       '500':
 *         description: Erreur serveur
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Crée un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec les données fournies. Renvoie un token
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Les détails de l'utilisateur à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             passwordConfirm:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             address:
 *               type: string
 *             zip_code:
 *               type: string
 *             city:
 *               type: string
 *             phone_number:
 *               type: string
 *             is_admin:
 *               type: boolean
 *     responses:
 *       '201':
 *         description: Utilisateur créé avec succès
 *       '500':
 *         description: Erreur serveur
 */


apiUser.route("/").get(checkSession, usersController.getAll);
apiUser.route("/").post(usersController.postOneUser);

export default apiUser;
