const Joi = require("joi");

const createParticipationSchema = Joi.object({
  eventId: Joi.number().integer().positive().required(),
  comment: Joi.string().max(500).allow(null).allow("")
}).options({ allowUnknown: false });

const updateParticipationSchema = Joi.object({
  id: Joi.number().integer().positive(),
  comment: Joi.string().max(500).allow(null).allow("")
}).options({ allowUnknown: true });

module.exports = {
  createParticipationSchema,
  updateParticipationSchema
};
