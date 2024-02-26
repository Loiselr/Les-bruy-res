import jwt from "jsonwebtoken";
import "../helpers/env.load.js";
import userDatamapper from "../datamapper/userDatamapper.js";

const secretKey = process.env.SECRET_KEY_FOR_JWT;

export default async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    // Vérification de la présence du token dans l'en-tête Authorization et qu'il commence par Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json("Veuillez vous reconnecter");
    }

    const token = authHeader.split(" ")[1];

    // Vérification du token JWT
    const decodedToken = jwt.verify(token, secretKey);

    // Ajout des données utilisateur décryptées à l'objet de requête
    req.user = decodedToken;

    // Vérification si l'utilisateur existe dans la base de données
    const userData = await userDatamapper.findEmail(decodedToken.email);
    if (!userData) {
      throw { status: 404, message: "Adresse email ou mot de passe incorrect" };
    }
    

    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error);

    // Gestion des différents types d'erreurs lors de la vérification du token
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json("La session a expiré, veuillez vous reconnecter");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json("Token invalide, accès non autorisé");
    } else {
      return res.status(500).json("Erreur interne du serveur");
    }
  }
}
