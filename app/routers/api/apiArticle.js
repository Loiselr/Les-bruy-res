import express from "express";
import * as articlesController from "../../controller/articlesController.js";
import checkSession from "../../middlewares/chechSession.js";

const apiArticle = express.Router();
// toutes les routes pour les articles


/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Opérations relatives aux articles
 */

/**
 * @swagger
 * /api/articles/:
 *   get:
 *     tags: [Articles]
 *     summary: Récupère tous les articles
 *     description: Récupère tous les articles.
 *     responses:
 *       '200':
 *         description: Articles récupérés avec succès
 *       '500':
 *         description: Erreur serveur
 *   post:
 *     tags: [Articles]
 *     summary: Crée un nouvel article
 *     description: Crée un nouvel article avec les données fournies.Nécessite une session admin.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Nouveaux détails de l'article
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             img:
 *               type: string
 *             description:
 *               type: string
 *             size:
 *               type: string
 *             stock_quantity:
 *               type: number
 *             article_price:
 *               type: number
 *             display_stock_article:
 *               type: boolean
 *             display_featured_article:
 *               type: boolean
 *             categoryId:
 *               type: number
 *             eventId:
 *               type: number
 *             article_brand:
 *               type: string
 *             display_article:
 *               type: boolean
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '201':
 *         description: Article créé avec succès
 *       '500':
 *         description: Erreur serveur
 */

apiArticle.route("/")
  .get(articlesController.getAll)
  .post(articlesController.createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     tags: [Articles]
 *     summary: Récupère un article par son ID
 *     description: Récupère les détails d'un article spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'article à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Article récupéré avec succès
 *       '404':
 *         description: Article non trouvé
 *       '500':
 *         description: Erreur serveur
 *   put:
 *     tags: [Articles]
 *     summary: Met à jour un article existant
 *     description: Met à jour les détails d'un article spécifique en fonction de son ID.Nécessite une session admin.
  *     parameters:
 *       - name: body
 *         in: body
 *         description: Nouveaux détails de l'article
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             img:
 *               type: string
 *             description:
 *               type: string
 *             size:
 *               type: string
 *             stock_quantity:
 *               type: number
 *             article_price:
 *               type: number
 *             display_stock_article:
 *               type: boolean
 *             display_featured_article:
 *               type: boolean
 *             categoryId:
 *               type: number
 *             eventId:
 *               type: number
 *             article_brand:
 *               type: string
 *             display_article:
 *               type: boolean
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Article mis à jour avec succès
 *       '404':
 *         description: Article non trouvé
 *       '500':
 *         description: Erreur serveur
 *   delete:
 *     tags: [Articles]
 *     summary: Supprime un article existant
 *     description: Supprime un article spécifique en fonction de son ID.Nécessite une session admin.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'article à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Article supprimé avec succès
 *       '404':
 *         description: Article non trouvé
 *       '500':
 *         description: Erreur serveur
 */

apiArticle.route("/:id")
  .get(articlesController.getOne)
  .put(articlesController.updateOne)
  .delete(articlesController.deleteOne);

export default apiArticle;
