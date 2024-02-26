import "../helpers/env.load.js";
import invoiceDatamapper from "../datamapper/invoiceDatamapper.js";
import userDatamapper from "../datamapper/userDatamapper.js";
import cartDatamapper from "../datamapper/cartDatamapper.js";

//! ADMIN Récupérer toutes les factures client 
export async function getAllinvoices(req, res) {
  try {
    const result = await invoiceDatamapper.findAllInvoices();
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}

//! ADMIN Récupérer une facture pour un client 
export async function getInvoicesByUserId(req, res) {
  try {
    // on récupère l'id du client sélectionné pour la recherche de factures
    const userIdForInvoice = parseInt(req.params.id);
    const isUserExist = await userDatamapper.getOneUser(userIdForInvoice);
    if (!isUserExist) {
      return res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }
    // si le user existe on vérifie s'il a bien une ou plusieurs factures
    const result = await invoiceDatamapper.findInvoiceByUserId(userIdForInvoice);
    if (!result) {
      return res.status(400).json("Pas de facture pour ce client");
    }
    // on renvoie les factures trouvées
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}

//! ADMIN update une facture
export async function updateInvoiceById(req, res) {
  try {
    // on récupère les data du body avec la nouvelle donnée
    const data = req.body;
    // on récupère l'id de la facture sélectionnée par l'admin
    const invoiceId = parseInt(req.params.id);
    // on vérifie si la facture est bien une vraie donnée de la bdd
    const isInvoiceExist = await invoiceDatamapper.findInvoiceByUserId(invoiceId);
    if (!isInvoiceExist) {
      return res.status(400).json("Pas de facture correspondante");
    }
    // on envoie le nouveau statut et l'id de la facture pour la mise 1a jour
    const result = await invoiceDatamapper.updateInvoice(data.process_status, invoiceId);
    console.log(result);
    // on valide le résultat
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}

//! USER POST INVOICE WITH CART AND TOKEN + GET INVOICE BY TOKEN
export async function createInvoieByCartOfUser(req, res) {
  try {
    // on récupère l'id du user dans le token
    const { id } = req.user;
    // on vérifie si le user du token existe en bdd
    const isUserExists = await userDatamapper.getOneUser(id);
    if (!isUserExists) {
      res.status(404).json("Aucune donnée pour cet utilisateur");
    }
    // on récupère les datas du panier qui lui est attribué et son contenu
    const cartData = await cartDatamapper.findCartByUserId(id);
    // on reprend la composition du panier client au moment de la validation et on l'envoie à la méthode datamapper qui crée une facture
    const result = await invoiceDatamapper.postInvoice(cartData[0].cart_id);
    console.log(cartData[0].cart_id);
    return res.status(200).json(result);

  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}

export async function getInvoiceByUserToken(req, res) {
  try {
    // on récupère l'id du user dans le token
    const { id } = req.user;
    // on vérifie si le user du token existe en bdd
    const isUserExists = await userDatamapper.getOneUser(id);
    if (!isUserExists) {
      res.status(404).json("Aucune donnée pour cet utilisateur");
    }
    // on va chercher les factures pour le client en bdd pour lui afficher
    const result = await invoiceDatamapper.findInvoiceByUserId(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}

//! POST INVOICE PAR L ADMIN SI COMMANDE NON FAITE PAR LE PANIER DU SITE
// export async function postInvoice(req, res) {
//   try {
//     const data = req.body;

//     const result = await invoiceDatamapper.postInvoice(data);
//     return res.status(200).json(result);
//   } catch (error) {
//     console.error("An error occurred: ", error);
//     return res.status(500).json({
//       error: "An error occurred while processing the request",
//     });
//   }
// }

//? Récupérer une facture par l'id du panier NECESSAIRE ???
export async function getInvoiceByCartId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const isCartExist = await cartDatamapper.findCartById(id);
    if (!isCartExist) {
      return res.status(400).json({ message: "Ce panier n'existe pas" });
    }
    const result = await invoiceDatamapper.findInvoiceByCartId(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
}