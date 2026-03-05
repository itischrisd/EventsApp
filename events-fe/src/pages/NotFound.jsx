import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h1>{t("404")}</h1>
      <p>{t("page-does-not-exist")}</p>
      <div>
        <a href="/" className="explore-link">
          {t("home")}
        </a>
      </div>
    </div>
  );
}

export default NotFound;
