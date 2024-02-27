import express from "express";
import jwt from "../../middlewares/authentificationJwt.js";
import * as invoiceController from "../../controller/invoiceController.js";
const apiInvoices = express.Router();

// routes pour les orders

// route localhost:3000/api/articles/
/**
 * @swagger
 * tags:
 *   name: Commandes
 *   description: Opérations relatives aux commandes
*/

/**
 * @swagger
 * /api/orders/:
 *   get:
 *     tags: [Commandes]
 *     summary: Récupère toutes les commandes
 *     description: Récupère la liste de toutes les commandes.
 *     responses:
 *       '200':
 *         description: Liste des commandes récupérée avec succès
 *       '500':
 *         description: Erreur serveur
 *   post:
 *     tags: [Commandes]
 *     summary: Crée une nouvelle commande
 *     description: Crée une nouvelle commande avec les détails fournis.
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Les détails de la commande à créer
 *         required: true
 *         schema:
 *           type: object
 *           
 *     responses:
 *       '201':
 *         description: Commande créée avec succès
 *       '500':
 *         description: Erreur serveur
*/
//! ADMIN
apiInvoices.route("/")
  .get(invoiceController.getAllinvoices);
//! ADMIN
apiInvoices.route("/user/:id")
  .get(invoiceController.getInvoicesByUserId);
//! ADMIN 
apiInvoices.route("/:id/")
  .put(invoiceController.updateInvoiceById);


//! USER
apiInvoices.route("/user")
  .post(jwt, invoiceController.createInvoieByCartOfUser)
  .get(jwt, invoiceController.getInvoiceByUserToken);
/**
 * @swagger
 * /api/invoice/{id}:
 *   get:
 *     tags: [Commandes]
 *     summary: Récupère une commande par son ID
 *     description: Récupère les détails d'une commande spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la commande à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Commande récupérée avec succès
 *       '404':
 *         description: Commande non trouvée
 *       '500':
 *         description: Erreur serveur
 *   put:
 *     tags: [Commandes]
 *     summary: Met à jour une commande
 *     description: Met à jour les détails d'une commande spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la commande à mettre à jour
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: Invoice
 *         description: Les détails de la commande à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           
 *     responses:
 *       '200':
 *         description: Commande mise à jour avec succès
 *       '404':
 *         description: Commande non trouvée
 *       '500':
 *         description: Erreur serveur
 *   delete:
 *     tags: [Commandes]
 *     summary: Supprime une commande
 *     description: Supprime une commande spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la commande à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Commande supprimée avec succès
 *       '404':
 *         description: Commande non trouvée
 *       '500':
 *         description: Erreur serveur
 */

//? NECESSAIRE ?
apiInvoices.route("/cart/:id")
  .get(invoiceController.getInvoiceByCartId);

export default apiInvoices;
