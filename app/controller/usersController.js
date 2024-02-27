import "../helpers/env.load.js";
import userDatamapper from "../datamapper/userDatamapper.js";
import cartDatamapper from "../datamapper/cartDatamapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateUserData } from "../middlewares/validateUserData.js";
import { validateUpdateDataUser } from "../middlewares/validateUpdateDataUser.js";

//fonction qui permet de récupérer tous les articles .
export async function getAll(req, res) {
  try {
    const result = await userDatamapper.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

// Fonction qui permet de récupérer la query du datamapper getOneUser (by Id)
export async function getOneUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const result = await userDatamapper.getOneUser(userId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

//fonction qui permet de créer un user
export async function postOneUser(req, res) {
  try {
    const {
      password,
      passwordConfirm,
      name,
      email,
      address,
      zip_code,
      city,
      phone_number,
      is_admin,
    } = data;

    //Vérification des passwords
    if (password !== passwordConfirm) {
      return res.status(403).json("Les mots de passe ne correspondent pas");
    }

    // Vérification que l'email n'existe pas
    const verifyEmail = await userDatamapper.findEmail(email);

    if (verifyEmail) {
      return res.status(403).json("Cet email est déjà utilisé");
    }

    // Validation des données utilisateur
    const validationError = validateUserData(req.body);
    
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    //on hash le password
    const hashedPassword = await bcrypt.hash(password, 10);
    //on envoit tout au datamapper avec le password hashé
    const result = await userDatamapper.createUser({
      password: hashedPassword,
      name,
      email,
      address,
      zip_code,
      city,
      phone_number,
      is_admin
    });
    const { id } = result;
    const secretKey = process.env.SECRET_KEY_FOR_JWT;
    const userData = { email, id, name }; //result c'est l'ID du User
    const token = jwt.sign(userData, secretKey, { expiresIn: "72h" });

    // on crée un panier vide en arrière plan dès la création du user
    const createEmptyCart = await cartDatamapper.insertUserIdToEmptyCart(userData.id);

    return res.status(200).json({ user: result, token: token, createEmptyCart });
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

export async function updateOneUser(req, res) {
  try {
    const dataUser = req.user;
    const updateId = parseInt(req.params.id);
    if (updateId !== dataUser.id) {
      return res.status(403).json("erreur de connection a la base de donnée");
    }
    // Récupération des données que le client transmet
    const {
      oldPassword,
      newPassword,
      newPasswordConfirm,
      newName,
      newEmail,
      newAddress,
      newZip_code,
      newCity,
      newPhone_number,
    } = req.body;

    // Récupération des données de l'utilisateur à partir du token
    const { email, id } = req.user;

    // Validation des données utilisateur
    const DataUserValidet = validateUpdateDataUser(req.body);
    if (DataUserValidet) {
      return res.status(400).json({ error: DataUserValidet });
    }

    // Vérification des mots de passe
    if (newPassword) {
      if (newPassword !== newPasswordConfirm) {
        return res.status(403).json("Les mots de passe ne correspondent pas");
      }
    }

    // Récupération des données de l'utilisateur dans la base de données

    const dataUserDb = await userDatamapper.findEmail(email);

    // Vérification de l'ancien mot de passe
    if (oldPassword) {
      const isValidPassword = await bcrypt.compare(
        oldPassword,
        dataUserDb.password
      );
      if (!isValidPassword) {
        return res.status(400).json("L'ancien mot de passe ne correspond pas");
      }
    }

    // Hashage du nouveau mot de passe
    let hashedNewPassword;
    if (newPassword) {
      hashedNewPassword = await bcrypt.hash(newPassword, 10);
    }

    // Création de l'objet contenant les nouvelles données utilisateur
    const newDataUser = {
      password: hashedNewPassword || dataUserDb.password,
      name: newName || dataUserDb.name,
      email: newEmail || dataUserDb.email,
      address: newAddress || dataUserDb.address,
      zip_code: newZip_code || dataUserDb.zip_code,
      city: newCity || dataUserDb.city,
      phone_number: newPhone_number || dataUserDb.phone_number,
    };

    // Mise à jour des informations de l'utilisateur dans la base de données
    await userDatamapper.updateUser(newDataUser, id);
    //on lui redonne un token comme ses infos ont changées
    const secretKey = process.env.SECRET_KEY_FOR_JWT;
    const userData = {
      email: newDataUser.email,
      id,
      name: newDataUser.name,
    };
    const token = jwt.sign(userData, secretKey, { expiresIn: "48h" });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}
export async function deleteOne(req, res) {
  try {
    const dataUser = req.user;
    const deleteID = parseInt(req.params.id);
    if (deleteID !== dataUser.id) {
      return res.status(403).json("erreur de connection a la base de donnée");
    }
    const result = await userDatamapper.deleteUser(dataUser.id);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}
