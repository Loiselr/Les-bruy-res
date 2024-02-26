import "../helpers/env.load.js";
import { validateLoginData } from "./validateLoginData.js";
import userDatamapper from "../datamapper/userDatamapper.js";
import bcrypt from "bcrypt";

export default async function checkDataUser(req, res, next) {
  try {
    // Validation des données de connexion
    const loginDataValidationError = validateLoginData(req.body);
    if (loginDataValidationError) {
      throw { status: 400, message: loginDataValidationError };
    }

    // Vérification si l'utilisateur existe dans la base de données
    const userData = await userDatamapper.findEmail(req.body.email);
    if (!userData) {
      throw { status: 404, message: "Adresse email ou mot de passe incorrect" };
    }

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!isValidPassword) {
      throw { status: 401, message: "Adresse email ou mot de passe incorrect" };
    }
    req.user = userData;
    // Si tout est OK, passez au middleware suivant
    next();
  } catch (error) {
    console.error(
      "Erreur lors de la vérification des données utilisateur :",
      error
    );
    return res.status(error.status || 500).json({
      error: error.message || "Une erreur est survenue lors de la connexion",
    });
  }
}
