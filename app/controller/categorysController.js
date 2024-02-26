import "../helpers/env.load.js";
import categoryDatamapper from "../datamapper/categoryDatamapper.js";

// Récupère toutes les catégories
export async function getAllCategorys(req, res) {
  try {
    const result = await categoryDatamapper.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// Crée une nouvelle catégorie
export async function postCategorys(req, res) {
  try {
    const { title } = req.body;
    const existingEvent = await categoryDatamapper.validateTitle(title);

    if (existingEvent) {
      return res
        .status(400)
        .json({ error: "Le titre existe déjà dans la base de données." });
    }
    const result = await categoryDatamapper.postOne(title);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// Récupère une catégorie par son ID
export async function getCategorysById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await categoryDatamapper.getOne(id);

    if (!result) {
      return res.status(404).json({ error: "La catégorie n'existe pas." });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// Met à jour une catégorie
export async function updateCategorys(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
  
    const result = await categoryDatamapper.updateOne(data, id);

    if (!result) {
      return res.status(400).json({ error: "La categorie n'existe pas." });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// Supprime une catégorie
export async function deleteCategorys(req, res) {
  try {
    const id = parseInt(req.params.id);
    const existingID = await categoryDatamapper.deleteOne(id);

    if (!existingID) {
      return res.status(404).json({ error: "La catégorie n'existe pas." });
    }
    const result = await categoryDatamapper.deleteOne(id);
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
