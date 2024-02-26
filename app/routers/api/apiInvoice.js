import express from "express";
import jwt from "../../middlewares/authentificationJwt.js";
import * as invoiceController from "../../controller/invoiceController.js";
const apiInvoices = express.Router();

// routes pour les orders

// route localhost:3000/api/invoices/
/**
 * @swagger
 * tags:
 *   name: Factures
 *   description: Opérations relatives aux factures
*/
/**
 * @swagger
 * /api/invoices/user:
 *   post:
 *     tags: [Invoices]
 *     summary: Génère une facture
 *     description: Génère une facture à la validation du panier en utilisant le token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token JWT de l'utilisateur
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Commande récupérée avec succès
 *       '404':
 *         description: Commande non trouvée
 *       '500':
 *         description: Erreur serveur
 *   get:
 *     tags: [Invoices]
 *     summary: User récupère ses factures
 *     description: User récupère ses factures si identifié par un token
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token JWT de l'utilisateur
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Commande récupérée avec succès
 *       '404':
 *         description: Commande non trouvée
 *       '500':
 *         description: Erreur serveur
 */
//! USER
apiInvoices.route("/user")
  .post(jwt, invoiceController.createInvoieByCartOfUser)
  .get(jwt, invoiceController.getInvoiceByUserToken);

//! ADMIN
apiInvoices.route("/")
  .get(invoiceController.getAllinvoices);
//! ADMIN
apiInvoices.route("/user/:id")
  .get(invoiceController.getInvoicesByUserId);
//! ADMIN 
apiInvoices.route("/:id/")
  .put(invoiceController.updateInvoiceById);

//? NECESSAIRE ?
apiInvoices.route("/cart/:id")
  .get(invoiceController.getInvoiceByCartId);

export default apiInvoices;
