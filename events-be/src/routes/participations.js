const express = require("express");
const { validateParticipationExists, validateRequestData, validateSchema, validateIdMatch, isLoggedIn, isParticipantOrAdmin } = require("../middlewares");
const { createParticipationSchema, updateParticipationSchema } = require("../validators");
const { participationService } = require("../services");
const { defaultPage, defaultLimit } = require("../config/pagination");
const { validateNotCreatingSameParticipation } = require("../middlewares/validateEntityExists");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || defaultPage;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;

  try {
    const participations = await participationService.getAllParticipations(page, limit);
    res.status(200).json(participations);
  } catch (err) {
    console.error(`[GET /] Error fetching participations: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.participation.fetch-all") });
  }
});

router.get("/:id", validateParticipationExists, async (req, res) => {
  try {
    const participationId = req.params.id;
    const participation = await participationService.getParticipationById(participationId);
    res.status(200).json(participation);
  } catch (err) {
    console.error(`[GET /:id] Error fetching participation with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.participation.fetch") });
  }
});

router.post("/", [isLoggedIn, validateRequestData, validateSchema(createParticipationSchema), validateNotCreatingSameParticipation], async (req, res) => {
  try {
    const participationData = req.body;
    const userId = req.user.id;
    const newParticipation = await participationService.createParticipation(participationData, userId);
    res.status(201).json(newParticipation);
  } catch (err) {
    console.error(`[POST /] Error creating participation: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.participation.create") });
  }
});

router.put("/:id", [validateIdMatch, validateParticipationExists, isLoggedIn, isParticipantOrAdmin, validateRequestData, validateSchema(updateParticipationSchema)], async (req, res) => {
  try {
    const participationId = req.params.id;
    const updatedData = req.body;
    const userId = req.user.id;
    const updatedParticipation = await participationService.updateParticipation(participationId, updatedData, userId);
    res.status(200).json(updatedParticipation);
  } catch (err) {
    console.error(`[PUT /:id] Error updating participation with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.participation.update") });
  }
});

router.delete("/:id", [validateParticipationExists, isLoggedIn, isParticipantOrAdmin], async (req, res) => {
  try {
    const participationId = req.params.id;
    await participationService.deleteParticipation(participationId);
    res.status(204).send();
  } catch (err) {
    console.error(`[DELETE /:id] Error deleting participation with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.participation.delete") });
  }
});

module.exports = router;
