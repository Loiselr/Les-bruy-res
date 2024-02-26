import "../helpers/env.load.js";
import eventDatamapper from "../datamapper/eventDatamapper.js";

export async function getAllEvents(req, res) {
  try {
    const result = await eventDatamapper.findAll();
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}
export async function getEventsById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await eventDatamapper.findByID(id);

    if (!result) {
      return res.status(404).json({ error: "L'event n'existe pas." });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}

export async function updateEvents(req, res) {
  try {
    const data = req.body;

    const id = parseInt(req.params.id);
    const result = await eventDatamapper.updateEvents(data, id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}
export async function deleteEvents(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await eventDatamapper.deleteEvents(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}
export async function postEvents(req, res) {
  try {
    const data = req.body;
    // On vérifie si le titre existe déjà dans la base de données
    const existingEvent = await eventDatamapper.validateTitle(data.title);

    // Si le titre existe déjà, renvoie un message d'erreur
    if (existingEvent) {
      return res
        .status(400)
        .json({ error: "Le titre existe déjà dans la base de données." });
    }

    const result = await eventDatamapper.postOneEvent(data);
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}
