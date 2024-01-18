const Joi = require('joi');

const userSchemaRegisterValid = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(6)
    .message('username must be 6-20 characters')
    .max(20)
    .message('username must be 6-20 characters')
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    )
    .message(
      'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters',
    )
    .required(),
  fullname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
});

module.exports = (user) => userSchemaRegisterValid.validate(user);
