import "../helpers/env.load.js";
import userDatamapper from "../datamapper/userDatamapper.js";


// Fonction de gestion de la connexion
export async function login(req, res) {
  try {
    const dataUser = await userDatamapper.findEmail(req.user.email); // Recherche l'utilisateur dans la base de données en utilisant l'adresse e-mail extraite du token
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