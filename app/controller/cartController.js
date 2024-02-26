import "../helpers/env.load.js";
import cartDatamapper from "../datamapper/cartDatamapper.js";
import userDatamapper from "../datamapper/userDatamapper.js";

// fonction qui insère les premières données d'un panier vide
export async function pushAndClearArticlesToCart(req, res) {
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

    // on récupère les datas contenus dans le panier envoyé côté client
    //! UN TABLEAU EST ATTENDU, QU'IL SOIT VIDE OU D'OBJET(S)
    const newCartData = req.body;

    // on crée une fonction d'insertion de données dans le panier
    const insertToCartHasArticle = async () => {
      for (const article of newCartData) {
        await cartDatamapper.insertArticlesToCart(
          cartData[0].cart_id,
          parseInt(article.article_id),
          parseInt(article.article_quantity)
        );
      }
    };
    switch (true) {
      // Si panier vide ET qu'il y a des articles en bdd on les efface (delete du panier en bdd)
      case (!newCartData.article_id && cartData[0].article_id):
        await cartDatamapper.clearCartData(cartData[0].cart_id);
        break;
      // Si panier plein et rien en bdd on insère directement en bdd
      case (newCartData.article_id && !cartData[0].article_id):
        await insertToCartHasArticle();
        break;
      // Par défault donc panier plein et articles dans panier en bdd, on clear ce dernier pour insérer les nouveaux (maj du panier en bdd)
      default:
        await cartDatamapper.clearCartData(cartData[0].cart_id);
        await insertToCartHasArticle();
        break;
    }
    res.status(200).json({
      message: "le panier est à jour"
    });

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête"
    });
  }
}

// fonction qui récupère un panier par l'id du client
export async function getCartByUserTokenId(req, res) {
  try {
    // on récupère l'id du user dans le token
    const { id } = req.user;
    // on vérifie si le user du token existe en bdd
    const isUserExists = await userDatamapper.getOneUser(id);
    if (!isUserExists) {
      res.status(404).json("Aucune donnée pour cet utilisateur");
    }
    // pour aller chercher le panier qui lui est rattaché
    const result = await cartDatamapper.findCartByUserId(id);
    if (!result) {
      return res.status(400).json({ message: "Pas de panier enregistré pour vous" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête"
    });
  }
}

// ! fonction PUT pour clear le panier maintenant intégrée au POST
// fonction qui supprime les data dans le panier sauf le user_id pour que le user conserve son panier, vide.
// export async function clearArticlesFromCart(req, res) {
//   try {
//     // on récupère l'id du user dans le token
//     const { id } = req.user;
//     // on vérifie si le user du token existe en bdd
//     const isUserExists = await userDatamapper.getOneUser(id);
//     if (!isUserExists) {
//       res.status(404).json("Aucune donnée pour cet utilisateur");
//     }
//     // pour aller chercher le panier qui lui est rattaché
//     const cartData = await cartDatamapper.findCartByUserId(id);
//     if (!cartData) {
//       return res.status(400).json({ message: "Pas de panier enregistré pour vous" });
//     }
//     // on récupère les nouvelles données du panier 
//     const newCartData = req.body;
//     if (!newCartData.article_id && cartData) {
//       await cartDatamapper.clearCartData(cartData[0].cart_id);
//     }
//     res.status(200).json("panier vidé avec succès");
//   } catch (error) {
//     console.error("Une erreur est survenue : ", error);
//     return res.status(500).json({
//       error: "Une erreur est survenue lors du traitement de la requête"
//     });
//   }
// }