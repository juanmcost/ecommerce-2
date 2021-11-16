const Joi = require("joi");

const joiSchema = Joi.object({
  username: Joi.string().min(3).max(30),

  password: Joi.string(), //.pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),

  email: Joi.string(), //.email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ar"] } }),
});

const joiProduct = Joi.object({
  appreciation: Joi.number().min(0).max(5),
});

module.exports = { joiSchema, joiProduct };
