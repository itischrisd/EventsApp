const validateIdMatch = async (req, res, next) => {
  const bodyId = parseInt(req.body.id, 10);
  const queryParamId = parseInt(req.params.id, 10);

  if (bodyId && queryParamId && bodyId === queryParamId) {
    next();
  } else {
    console.error(`[validateIdMatch] Body ID (${bodyId}) does not match Param ID (${queryParamId}).`);
    return res.status(400).json({ error: req.t("validation.ids.failed") });
  }
};

module.exports = {
  validateIdMatch
};
