const Joi = require('joi');

const productSchemaCreateValid = Joi.object({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  inStorage: Joi.number()
    .required()
    .min(0)
    .message('Value cannot be lower than 0'),
  price: Joi.number().required().min(0).message('Value cannot be lower than 0'),
  newPrice: Joi.number().min(0).message('Value cannot be lower than 0'),
  categoryId: Joi.string().required(),
});

module.exports = (product) => productSchemaCreateValid.validate(product);
