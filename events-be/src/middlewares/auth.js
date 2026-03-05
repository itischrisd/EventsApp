const jwt = require("jsonwebtoken");
const { getEventById } = require("../repositories/eventRepository");
const { getParticipationById } = require("../repositories/participationRepository");
const { getUserById } = require("../repositories/userRepository");
const config = require("../config/dotenv");

const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: req.t("auth.unauthorized.no-token") });
  }

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: req.t("auth.unauthorized.invalid") });
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: req.t("auth.forbidden.admin") });
  }
  next();
};

const isEventOwnerOrAdmin = async (req, res, next) => {
  const eventId = req.params.id;
  const event = await getEventById(eventId);

  if (req.user.id !== event.createdBy && !req.user.isAdmin) {
    return res.status(403).json({ error: req.t("auth.forbidden.resource") });
  }

  next();
};

const isParticipantOrAdmin = async (req, res, next) => {
  const participationId = req.params.id;
  const participation = await getParticipationById(participationId);

  if (req.user.id !== participation.userId && !req.user.isAdmin) {
    return res.status(403).json({ error: req.t("auth.forbidden.resource") });
  }

  next();
};

const isEditedUserOrAdmin = async (req, res, next) => {
  const userId = req.params.id;
  const user = await getUserById(userId);

  if (req.user.id !== user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: req.t("auth.forbidden.resource") });
  }

  next();
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isEventOwnerOrAdmin,
  isParticipantOrAdmin,
  isEditedUserOrAdmin
};
