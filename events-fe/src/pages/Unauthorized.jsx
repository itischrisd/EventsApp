import { useTranslation } from "react-i18next";

function Unauthorized() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h1>{t("unauthorized")}</h1>
      <p>{t("unauthorized-message")}</p>
      <p>{t("please-login-auth")}</p>
      <div>
        <a href="/" className="explore-link">
          {t("home")}
        </a>
      </div>
    </div>
  );
}

export default Unauthorized;
