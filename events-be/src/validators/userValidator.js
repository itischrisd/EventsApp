const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(8).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
    .required()
}).options({ allowUnknown: false });

const updateUserSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  username: Joi.string().min(8).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
    .required()
}).options({ allowUnknown: true });

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).options({ allowUnknown: false });

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema
};
