import articleDatamapper from "../datamapper/articleDatamapper.js";
import categoryDatamapper from "../datamapper/categoryDatamapper.js";
import eventDatamapper from "../datamapper/eventDatamapper.js";
import { validateCreateArticle } from "../middlewares/validateCreateArticle.js";
import { validateUpdateArticle } from "../middlewares/validateUpdateArticle.js";


// Fonction pour récupérer tous les articles
export async function getAll(req, res) {
  try {
    const result = await articleDatamapper.getAllArticles();

    res.status(200).json(result);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }

}

// Fonction pour récupérer un article par son Id
export async function getOne(req, res) {
  try {
    const articleId = parseInt(req.params.id);
    const result = await articleDatamapper.getOneArticle(articleId);

    res.status(200).json(result);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }

}

// Fonction pour créer un article
export async function createArticle(req, res) {
  try {
    // on récupère le body de la requête
    const createArticleBody = req.body;
    // on passe les data de l'article au schéma Joi pour validation ou gestion de l'erreur
    validateCreateArticle(createArticleBody);
    // on check si le nom de l'article est déjà présent en bdd, on revoie une erreur si oui
    const isArticleExist = await articleDatamapper.validateName(createArticleBody.name);
    if (isArticleExist) {
      return res
        .status(400)
        .json({ error: "L'article existe déjà dans la base de données." });
    }

    // on crée l'article avec les informations données
    const article = await articleDatamapper.createOneArticle(createArticleBody);

    // on récupère l'id de la catégorie et parse integer pour être sûr de ne récupérer qu'un integer
    const categoryBodyId = parseInt(createArticleBody.categoryId);
    // on récupère l'id de l'event et parse integer pour être sûr de ne récupérer qu'un integer
    const eventBodyId = parseInt(createArticleBody.eventId);
    // on récupère l'id de l'article et parse integer pour être sûr de ne récupérer qu'un integer
    const articleId = parseInt(article.id);

    // on fait un insert dans la bdd de l'article et sa category
    const categoryHasArticle = await categoryDatamapper.postCategoryHasArticle(articleId, categoryBodyId);
    // on fait un insert dans la bdd de l'article et son event
    const categoryHasEvent = await eventDatamapper.postEventHasArticle(articleId, eventBodyId);

    // on envoie la réponse dans les headers avec toutes les donnes dont les liaisons
    res.status(201).json(article, categoryHasArticle, categoryHasEvent);

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }

}

// Fonction qui met à jour un article
export async function updateOne(req, res) {
  try {
    // on récupère l'id de l'article envoyé dans la requête, automatiquement une string que je convertis en integer
    const articleId = parseInt(req.params.id);
    // on le passe à Joi
    validateUpdateArticle(articleId);

    // On recherche l'article de la requête
    const foundArticle = await articleDatamapper.getOneArticle(articleId);
    if (!foundArticle) {
      // Si l'article n'existe pas, on bloque.
      return res.status(400).json({ error: "Article not found. Please verify the provided id." });
    }

    // Si l'article correspond on gère la mise à jour des éléments modifiés
    const newDataArticle = {
      name: req.body.name || foundArticle.name,
      img: req.body.img || foundArticle.img,
      article_brand: req.body.article_brand || foundArticle.article_brand,
      description: req.body.description || foundArticle.description,
      size: req.body.size || foundArticle.size,
      stock_quantity: req.body.stock_quantity || foundArticle.stock_quantity,
      article_price: req.body.article_price || foundArticle.article_price,
      // pour les display pas de valeur par défault car mise en place d'une checkbox côté admin qui oblige la saisie d'une donnée à chaque mise à jour
      display_stock_article: req.body.display_stock_article,
      display_featured_article: req.body.display_featured_article
    };
    // Idem pour les id de la catégorie et l'event, puis on parse pour être certain de ne récupérer qu'un integer
    const newDataCategoryArticle = {
      categoryId: parseInt(req.body.categoryId) || foundArticle.category_id
    };
    const newDataEventArticle = {
      eventId: parseInt(req.body.eventId) || foundArticle.event_id
    };
    // on appelle la méthode update d'un article du datamapper pour effectuer la mise à jour
    const updatedArticle = await articleDatamapper.updateOneArticle(newDataArticle, articleId);
    // on appelle la méthode update de category_id du datamapper pour effectuer la mise à jour
    const updatedCategoryArticle = await categoryDatamapper.updateCategoryHasArticle(newDataCategoryArticle, articleId);
    // on appelle la méthode update de event_id du datamapper pour effectuer la mise à jour
    const updatedEventArticle = await eventDatamapper.updateEventHasArticle(newDataEventArticle, articleId);


    // envoi de la réponse
    res.status(200).json(updatedArticle, updatedCategoryArticle, updatedEventArticle);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }

}

// Fonction qui supprime un article
export async function deleteOne(req, res) {
  try {
    // on récupère l'id de l'article à supprimer
    const articleId = parseInt(req.params.id);
    // on va chercher l'article correspondant dans la bdd
    const foundArticle = await articleDatamapper.getOneArticle(articleId);
    if (!foundArticle) {
      // Si l'article n'existe pas, on bloque.
      return res.status(400).json({ error: "Article not found. Please verify the provided id." });
    }
    const deletedArticle = await articleDatamapper.deleteOneArticle(articleId);
    // réponse
    
    res.status(204).json(deletedArticle);
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }

}
