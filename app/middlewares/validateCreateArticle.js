import Joi from "joi";

// schema Joi pour la création d'un article
export function validateCreateArticle(dataSchema) {
  const articleSchema = Joi.object({
    name: Joi.string()
      .min(1)
      .required(),
    img: Joi.string()
      .min(1)
      .allow(null),
    article_brand: Joi.string()
      .min(1)
      .allow(null),
    description: Joi.string()
      .min(1)
      .allow(null),
    size: Joi.string()
      .min(1)
      .allow(null),
    stock_quantity: Joi.number()
      .min(1)
      .allow(null),
    article_price: Joi.number()
      .precision(2)
      .min(1)
      .allow(null),
    display_stock_article: Joi.boolean(),
    display_featured_article: Joi.boolean(),
    categoryId: Joi.number()
      .integer()
      .strict()
      .min(1)
      .allow(null),
    eventId: Joi.number()
      .integer()
      .strict()
      .min(1)
      .allow(null)
  });
  const { error } = articleSchema.validate(dataSchema);
  if (error) {
    return error ? error.details[0].message : null;
  }
}
