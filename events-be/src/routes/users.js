const express = require("express");
const { validateIdMatch, validateUserExists, validateSchema, isAdmin, isEditedUserOrAdmin, isLoggedIn, validateEmailUnique } = require("../middlewares");
const { createUserSchema, updateUserSchema } = require("../validators");
const { userService, participationService } = require("../services");
const { defaultPage, defaultLimit } = require("../config/pagination");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || defaultPage;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;

  try {
    const users = await userService.getAllUsers(page, limit);
    res.status(200).json(users);
  } catch (err) {
    console.error(`[GET /] Error fetching users: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.user.fetch-all") });
  }
});

router.get("/:id", validateUserExists, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(`[GET /:id] Error fetching user with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.user.fetch") });
  }
});

router.get("/:id/participations", validateUserExists, async (req, res) => {
  const page = parseInt(req.query.page, 10) || defaultPage;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;

  try {
    const userId = req.params.id;
    const participations = await participationService.getParticipationsByUserId(userId, page, limit);
    res.status(200).json(participations);
  } catch (err) {
    console.error(`[GET /:id/participations] Error fetching participations for user ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.user.participations") });
  }
});

router.post("/", [validateSchema(createUserSchema), validateEmailUnique], async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(`[POST /] Error creating user: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.user.create") });
  }
});

router.put("/:id", [validateIdMatch, validateUserExists, isLoggedIn, isEditedUserOrAdmin, validateSchema(updateUserSchema)], async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await userService.updateUser(userId, updatedData);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(`[PUT /:id] Error updating user with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.user.update") });
  }
});

router.delete("/:id", [validateUserExists, isLoggedIn, isAdmin], async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (err) {
    console.error(`[DELETE /:id] Error deleting user with ID ${req.params.id}: ${err.message}`, err);
    res.status(500).json({ error: req.t("error.user.delete") });
  }
});

module.exports = router;
