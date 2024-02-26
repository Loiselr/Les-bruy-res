import "../helpers/env.load.js";
import jwt from "jsonwebtoken";
import userDatamapper from "../datamapper/userDatamapper.js";

const secretKey = process.env.SECRET_KEY_FOR_JWT;

// Fonction de gestion de la connexion
export async function login(req, res) {
  try {
    const { token } = req.body; // Récupère le token JWT à partir du corps de la requête

    // Vérification du token JWT
    const decodedToken = jwt.verify(token, secretKey); // Décode le token JWT
    // Gère l'erreur si le token n'est pas valide
    const dataUser = await userDatamapper.findEmail(decodedToken.email); // Recherche l'utilisateur dans la base de données en utilisant l'adresse e-mail extraite du token
    // Vérifie si l'utilisateur n'est pas administrateur


    if (!dataUser) {
      return res.status(403).json("Accès refusé. Vous n'êtes pas autorisé à accéder à cette ressource.");
    }


    if (!dataUser.is_admin) {
      // Si l'utilisateur n'est pas administrateur, envoie un message d'erreur d'accès refusé
      return res.status(403).json({
        error: "Accès refusé. Vous n'êtes pas autorisé à accéder à cette ressource.",
      });
    }
    
    req.session.user = dataUser.email;
    
    // Redirige l'utilisateur vers la page d'administration après une connexion réussie
    res.redirect("/api/admin");


  } catch (error) {
    // Gère les erreurs survenues lors du processus de connexion
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}
