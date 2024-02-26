import express from "express";
import jwt from "../../middlewares/authentificationJwt.js";
import * as cartController from "../../controller/cartController.js";

const apiCart = express.Router();

// toutes les routes du panier

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Stockage du panier en base de données
 */

/**
 * @swagger
 * /api/cart/user:
 *   post:
 *     tags: [Cart]
 *     summary: Insère des articles dans le panier
 *     description: Insère des articles dans le panier d'un utilisateur identifié par token, ajouter un objet au tableau par article
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token JWT de l'utilisateur
 *         required: true
 *         type: string
 *       - in: body
 *         name: Cart
 *         description: Insertion d'articles dans le panier
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               article_id:
 *                 type: integer
 *                 description: ID de l'article
 *               article_quantity:
 *                 type: integer
 *                 description: Quantité pour l'article
 *     responses:
 *       '200':
 *         description: Panier enregistré avec succès
 *       '500':
 *         description: Erreur serveur
 *   get:
 *     tags: [Cart]
 *     summary: Récupère le panier de l'utilisateur
 *     description: Récupère le contenu du panier de l'utilisateur identifié par token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token JWT de l'utilisateur
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Panier récupéré avec succès
 *       '400':
 *         description: Requête invalide
 *       '404':
 *         description: Panier non trouvé
 *       '500':
 *         description: Erreur serveur
 */
apiCart.route("/user")
  .post(jwt, cartController.pushAndClearArticlesToCart)
  .get(jwt, cartController.getCartByUserTokenId);


export default apiCart;


// ! doc + route put à conserver jusquà décision finale
// .put(jwt, cartController.clearArticlesFromCart);
//  * put:
//  * tags: [Cart]
//   * summary: Met à jour des articles dans le panier
//     * description: Supprime les articles dans le panier d'un utilisateur identifié par token
//       * parameters:
//  * - in: header
//   * name: Authorization
//     * description: Token JWT de l'utilisateur
//       * required: true
//         * type: string
//           * - in: body
//             * name: Cart
//               * description: Mise à jour des articles dans le panier
//                 * schema:
//  * type: array
//   * items:
//  * type: object
//   * properties:
//  * article_id:
//  * type: integer
//   * description: ID de l'article
//     * article_quantity:
//  * type: integer
//   * description: Nouvelle quantité pour l'article
//     * responses:
//  * '200':
//  * description: Panier mis à jour avec succès
//   * '500':
//  * description: Erreur serveur