import express from "express";
import * as eventsController from "../../controller/eventsController.js";
import checkSession from "../../middlewares/chechSession.js";

const apiEvents = express.Router();

/**
 * @swagger
 * tags:
 *   name: Événements
 *   description: Opérations relatives aux événements
 */

/**
 * @swagger
 * /api/events/:
 *   get:
 *     tags: [Événements]
 *     summary: Récupère tous les événements
 *     description: Récupère la liste de tous les événements.
 *     responses:
 *       '200':
 *         description: Liste des événements récupérée avec succès
 *       '500':
 *         description: Erreur serveur
 *   post:
 *     tags: [Événements]
 *     summary: Crée un nouvel événement
 *     description: Crée un nouvel événement avec les données fournies.Nécessite une session admin.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Les détails de l'event à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             display_event:
 *               type: boolean
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '201':
 *         description: Événement créé avec succès
 *       '500':
 *         description: Erreur serveur
 */
apiEvents.route("/")
  .get(eventsController.getAllEvents)
  .post(checkSession, eventsController.postEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags: [Événements]
 *     summary: Récupère un événement par son ID
 *     description: Récupère les détails d'un événement spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'événement à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Événement récupéré avec succès
 *       '404':
 *         description: Événement non trouvé
 *       '500':
 *         description: Erreur serveur
 *   put:
 *     tags: [Événements]
 *     summary: Met à jour un événement
 *     description: Met à jour les détails d'un événement spécifique en fonction de son ID.Nécessite une session admin.
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token d'authentification
 *         required: true
 *         type: string
 *         default: Bearer
 *       - name: id
 *         in: path
 *         description: ID de l'événement à mettre à jour
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: event
 *         description: Les détails de l'événement à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             display_event:
 *               type: boolean
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Événement mis à jour avec succès
 *       '404':
 *         description: Événement non trouvé
 *       '500':
 *         description: Erreur serveur
 *   delete:
 *     tags: [Événements]
 *     summary: Supprime un événement
 *     description: Supprime un événement spécifique en fonction de son ID.Nécessite une session admin.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'événement à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Événement supprimé avec succès
 *       '404':
 *         description: Événement non trouvé
 *       '500':
 *         description: Erreur serveur
 */
apiEvents.route("/:id")
  .get(eventsController.getEventsById)
  .put(checkSession, eventsController.updateEvents)
  .delete(checkSession, eventsController.deleteEvents);

export default apiEvents;
