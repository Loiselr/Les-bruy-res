import "../helpers/env.load.js";

import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    // Création du token JWT
    const secretKey = process.env.SECRET_KEY_FOR_JWT;
    const tokenData = {
      email: req.user.email,
      id: req.user.id,
      name: req.user.name,
    };
    const userData = {
      name: req.user.name,
      email: req.user.email,
      city: req.user.city,
      zip_code: req.user.zip_code,
      address: req.user.address,
      phone_number: req.user.phone_number,
    };

    const token = jwt.sign(tokenData, secretKey, { expiresIn: "72h" });
    return res.status(200).json({ token, userData });
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}
