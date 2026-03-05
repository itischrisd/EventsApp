const createError = require("http-errors");
const express = require("express");
const cors = require("./config/cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes");
const sequelize = require("./config/database");
const i18n = require("./config/i18n");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);

app.use(i18n);
app.use("/", routes);

sequelize.authenticate()
  .then(() => console.log("Connected to database."))
  .catch(err => console.error("Error while connecting to database: ", err));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: req.app.get("env") === "development" ? err.message : req.t("error.generic.message"),
    error: req.app.get("env") === "development" ? err : req.t("error.generic")
  });
});

module.exports = app;
