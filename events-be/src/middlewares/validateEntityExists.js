const { userRepository, participationRepository, eventRepository } = require("../repositories");
const { Participation } = require("../models");
const { getParticipationsByUserId } = require("../repositories/participationRepository");

const doesUserExist = async (userId) => {
  try {
    const user = await userRepository.getUserById(userId);
    return !!user;
  } catch (err) {
    console.error(`[doesUserExist] Error checking user with ID ${userId}:`, err);
    throw new Error("Error while checking user existence.");
  }
};

const doesEventExist = async (eventId) => {
  try {
    const event = await eventRepository.getEventById(eventId);
    return !!event;
  } catch (err) {
    console.error(`[doesEventExist] Error checking event with ID ${eventId}:`, err);
    throw new Error("Error while checking event existence.");
  }
};

const doesParticipationExist = async (participationId) => {
  try {
    const participation = await participationRepository.getParticipationById(participationId);
    return !!participation;
  } catch (err) {
    console.error(`[doesParticipationExist] Error checking participation with ID ${participationId}:`, err);
    throw new Error("Error while checking participation existence.");
  }
};

const validateUserExists = async (req, res, next) => {
  const id = req.params.id;

  try {
    const userExists = await doesUserExist(id);
    if (!userExists) {
      return res.status(404).json({ error: req.t("validation.user.not-found") });
    }
    next();
  } catch (err) {
    console.error(`[validateUserExists] Error validating user with ID ${id}:`, err);
    res.status(500).json({ error: req.t("validation.user.error") });
  }
};

const validateEmailUnique = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userRepository.getUserByEmail(email);
    const userExists = !!user;
    if (userExists) {
      return res.status(400).json({ error: req.t("validation.email.exists") });
    }
    next();
  } catch (err) {
    console.error(`[validateEmailUnique] Error checking for email ${email}:`, err);
    res.status(500).json({ error: req.t("validation.email.error") });
  }
};

const validateEventExists = async (req, res, next) => {
  const id = req.params.id;

  try {
    const eventExists = await doesEventExist(id);
    if (!eventExists) {
      return res.status(404).json({ error: req.t("validation.event.not-found") });
    }
    next();
  } catch (err) {
    console.error(`[validateEventExists] Error validating event with ID ${id}:`, err);
    res.status(500).json({ error: req.t("validation.event.error") });
  }
};

const validateParticipationExists = async (req, res, next) => {
  const id = req.params.id;

  try {
    const participationExists = await doesParticipationExist(id);
    if (!participationExists) {
      return res.status(400).json({ error: req.t("validation.participation.not-found") });
    }
    next();
  } catch (err) {
    console.error(`[validateParticipationExists] Error validating participation with ID ${id}:`, err);
    res.status(500).json({ error: req.t("validation.participation.error") });
  }
};

const validateNotCreatingSameParticipation = async (req, res, next) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  try {
    const participations = await getParticipationsByUserId(userId);
    const existingParticipation = participations.find(p => p.eventId === Number(eventId));
    if (existingParticipation) {
      return res.status(400).json({ error: req.t("validation.participation.exists") });
    }
    next();
  } catch (err) {
    console.error(`[validateNotCreatingSameParticipation] Error checking for existing participation:`, err);
    res.status(500).json({ error: req.t("validation.participation.error") });
  }
};

const validateRequestData = async (req, res, next) => {
  const { userId, eventId } = req.body;
  const errors = {};

  try {
    if (userId) {
      const userExists = await doesUserExist(userId);
      if (!userExists) {
        errors.userId = req.t("validation.user.not-found");
      }
    }

    if (eventId) {
      const eventExists = await doesEventExist(eventId);
      if (!eventExists) {
        errors.eventId = req.t("validation.event.not-found");
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: req.t("validation.data.failed"),
        details: errors
      });
    }

    next();
  } catch (err) {
    console.error(`[validateRequestData] Error validating request data:`, err);
    res.status(500).json({ error: req.t("validation.data.error") });
  }
};

module.exports = {
  validateUserExists,
  validateEmailUnique,
  validateEventExists,
  validateParticipationExists,
  validateNotCreatingSameParticipation,
  validateRequestData
};
