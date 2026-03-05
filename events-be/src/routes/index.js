const express = require("express");
const userRouter = require("./users");
const eventRouter = require("./events");
const participationRouter = require("./participations");
const loginRouter = require("./login");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/participations", participationRouter);
router.use("/login", loginRouter);

module.exports = router;
