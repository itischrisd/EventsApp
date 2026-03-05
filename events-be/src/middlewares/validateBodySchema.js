const validateSchema = schema => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const translatedErrors = error.details.map((detail) => {
      const path = detail.path.join(".");
      const type = detail.type;
      const translationKey = `validation.${path}.${type}`;
      if (type === "object.unknown") {
        return req.t("validation.object.unknown") + " " + path + ".";
      }
      return req.t(translationKey);
    });

    return res.status(400).json({
      error: req.t("validation.failed"),
      details: translatedErrors
    });
  }
  next();
};

module.exports = { validateSchema };
