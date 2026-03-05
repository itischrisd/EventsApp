const express = require("express");
const { userService } = require("../services");
const { validateSchema } = require("../middlewares");
const { loginUserSchema } = require("../validators");

const router = express.Router();

router.post("/", validateSchema(loginUserSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    if (!token) {
      return res.status(401).json({ error: req.t("validation.login") });
    }
    res.status(200).json(token);
  } catch (err) {
    console.error("[POST /login] Error logging in user:", err);
    res.status(500).json({ error: req.t("error.login") });
  }
});

module.exports = router;
