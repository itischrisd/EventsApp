const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: "./locales/{{lng}}.json"
    },
    fallbackLng: "en",
    preload: ["en", "pl"],
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"]
    },
    saveMissing: true
  })
  .then(() => {
    console.log("i18n initialized successfully.");
  })
  .catch((err) => {
    console.error(`Error initializing i18n: ${err.message}`, err);
  });

const i18n = middleware.handle(i18next);

module.exports = i18n;
