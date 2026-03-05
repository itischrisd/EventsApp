const { createUserSchema, updateUserSchema, loginUserSchema } = require("./userValidator");
const { createEventSchema, updateEventSchema } = require("./eventValidator");
const { createParticipationSchema, updateParticipationSchema } = require("./participationValidator");

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
  createEventSchema,
  updateEventSchema,
  createParticipationSchema,
  updateParticipationSchema
};
