
import userDatamapper from "../datamapper/userDatamapper.js";

export default async function authenticateToken(req, res, next) {
  try {
    // on récupère le user de la requête
    const data = req.user;

    // on récupère son mail pour vérifier s'il existe, on renvoie une erreur si ce n'est pas le cas
    const userData = await userDatamapper.findEmail(data.email);
    if (!userData) {
      throw { status: 404, message: "Adresse email ou mot de passe incorrect" };
    }
    // on vérifie si le user est un admin et on lui refuse l'accès si ce n'est pas le cas
    if (userData.is_admin === false) {
      return res.status(401).json("accés refusé");
    }
    // on passe au MW suivant si tout est ok
    next();
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}
