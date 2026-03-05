import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">{ t("loading") }</h6>
      </div>
      <div className="card-body">
        <p>{ t("loading-please") }</p>
      </div>
    </div>
  );
}

export default Loading;
