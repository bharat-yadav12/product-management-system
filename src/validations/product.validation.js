import Joi from "joi";

export const createProductSchema = Joi.object({
  metaTitle: Joi.string().max(70).required(),
  productName: Joi.string().required(),
  slug: Joi.string().required(),
  price: Joi.number().positive().required(),
  discountedPrice: Joi.number()
    .positive()
    .less(Joi.ref("price"))
    .optional(),

  description: Joi.string().required()
});

export const updateProductSchema = Joi.object({
  metaTitle: Joi.string().max(70).optional(),
  productName: Joi.string().optional(),
  slug: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  discountedPrice: Joi.number()
    .positive()
    .less(Joi.ref("price"))
    .optional(),

  description: Joi.string().optional()
});
