const express = require("express");
const { validateIdMatch, validateEventExists, validateSchema, isLoggedIn, isEventOwnerOrAdmin } = require("../middlewares");
const { createEventSchema, updateEventSchema } = require("../validators");
const { eventService, participationService } = require("../services");
const { defaultPage, defaultLimit } = require("../config/pagination");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || defaultPage;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;

  try {
    const events = await eventService.getAllEvents(page, limit);
    res.status(200).json(events);
  } catch (err) {
    console.error(`[GET /] Error fetching events: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.event.fetch-all") });
  }
});

router.get("/:id", validateEventExists, async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEventById(eventId);
    res.status(200).json(event);
  } catch (err) {
    console.error(`[GET /:id] Error fetching event with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.event.fetch") });
  }
});

router.get("/:id/participations", validateEventExists, async (req, res) => {
  const page = parseInt(req.query.page, 10) || defaultPage;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;

  try {
    const eventId = req.params.id;
    const participations = await participationService.getParticipationsByEventId(eventId, page, limit);
    res.status(200).json(participations);
  } catch (err) {
    console.error(`[GET /:id/participations] Error fetching participations for event ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.event.participations") });
  }
});

router.post("/", [isLoggedIn, validateSchema(createEventSchema)], async (req, res) => {
  try {
    const eventData = req.body;
    const createdBy = req.user.id;
    const newEvent = await eventService.createEvent(eventData, createdBy);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(`[POST /] Error creating event: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.event.create") });
  }
});

router.put("/:id", [validateIdMatch, validateEventExists, isLoggedIn, isEventOwnerOrAdmin, validateSchema(updateEventSchema)], async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;
    const createdBy = req.user.id;
    const updatedEvent = await eventService.updateEvent(eventId, updatedData, createdBy);
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(`[PUT /:id] Error updating event with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.event.update") });
  }
});

router.delete("/:id", [validateEventExists, isLoggedIn, isEventOwnerOrAdmin], async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventService.deleteEvent(eventId);
    res.status(204).send();
  } catch (err) {
    console.error(`[DELETE /:id] Error deleting event with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.event.delete") });
  }
});

module.exports = router;
