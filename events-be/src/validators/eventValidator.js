const Joi = require("joi");

const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow(null).allow("").max(1000),
  date: Joi.date().greater("now").required()
}).options({ allowUnknown: false });

const updateEventSchema = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().allow(null).allow("").max(1000),
  date: Joi.date().greater("now").required()
}).options({ allowUnknown: true });

module.exports = {
  createEventSchema,
  updateEventSchema
};
