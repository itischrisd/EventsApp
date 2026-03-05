import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <h1>{t("home-header")}</h1>
      <p>{t("home-text")}</p>
      <div>
        <a href="/events" className="explore-link">
          {t("home-button")}
        </a>
      </div>
    </div>
  );
}

export default HomePage;
