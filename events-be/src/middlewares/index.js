const { validateUserExists, validateEmailUnique, validateEventExists, validateParticipationExists, validateRequestData } = require("./validateEntityExists");
const { validateIdMatch } = require("./validateIdParamMatch");
const { validateSchema } = require("./validateBodySchema");
const { isLoggedIn, isAdmin, isEventOwnerOrAdmin, isParticipantOrAdmin, isEditedUserOrAdmin } = require("./auth");

module.exports = {
  validateUserExists,
  validateEmailUnique,
  validateEventExists,
  validateParticipationExists,
  validateRequestData,
  validateIdMatch,
  validateSchema,
  isLoggedIn,
  isAdmin,
  isEventOwnerOrAdmin,
  isParticipantOrAdmin,
  isEditedUserOrAdmin
};
