import express from "express";
import * as categorysController from "../../controller/categorysController.js";
import checkSession from '../../middlewares/chechSession.js';


const apiCategorys = express.Router();
// toutes les routes des categorys

/**
 * @swagger
 * tags:
 *   name: Catégories
 *   description: Opérations relatives aux catégories
 */

/**
 * @swagger
 * /api/categorys/:
 *   get:
 *     tags: [Catégories]
 *     summary: Récupère toutes les catégories
 *     description: Récupère la liste de toutes les catégories.
 *     responses:
 *       '200':
 *         description: Liste des catégories récupérée avec succès
 *       '500':
 *         description: Erreur serveur
 *   post:
 *     tags: [Catégories]
 *     summary: Crée une nouvelle catégorie
 *     description: Crée une nouvelle catégorie ,le titre de la catégorie (obligatoire) .Nécessite une session admin.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Les détails de l'article à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             display_category:
 *               type : boolean
 *     security:
 *       - BearerAuth: []        
 *     responses:
 *       '201':
 *         description: Catégorie créée avec succès
 *       '400':
 *          description: Le titre existe déjà dans la base de données
 *       '500':
 *         description: Erreur serveur
 */
apiCategorys
  .route("/")
  .get(categorysController.getAllCategorys)
  .post(checkSession,categorysController.postCategorys);

/**
 * @swagger
 * /api/categorys/{id}:
 *   get:
 *     tags: [Catégories]
 *     summary: Récupère une catégorie par son ID
 *     description: Récupère les détails d'une catégorie spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la catégorie à récupérer
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Catégorie récupérée avec succès
 *       '400':
 *         description: Catégorie n'existe pas 
 *       '500':
 *         description: Erreur serveur
 *   put:
 *     tags: [Catégories]
 *     summary: Met à jour une catégorie
 *     description: Met à jour les détails d'une catégorie spécifique en fonction de son ID.Nécessite une session admin.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la catégorie à mettre à jour
 *         required: true
 *       - name: body
 *         in: body
 *         description: Les détails de l'article à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             display_category:
 *               type : boolean
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Catégorie mise à jour avec succès
 *       '404':
 *         description: Le nom de la categorie existe déja .
 *       '500':
 *         description: Erreur serveur
 *   delete:
 *     tags: [Catégories]
 *     summary: Supprime une catégorie
 *     description: Supprime une catégorie spécifique en fonction de son ID.Nécessite une session admin.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la catégorie à supprimer
 *         required: true
 *         schema:
 *           type: number
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Catégorie supprimée avec succès
 *       '404':
 *         description: Catégorie déja supprimer
 *       '500':
 *         description: Erreur serveur
 */

apiCategorys
  .route("/:id")
  .get(categorysController.getCategorysById)
  .put(checkSession,categorysController.updateCategorys)
  .delete(checkSession,categorysController.deleteCategorys);

export default apiCategorys;
