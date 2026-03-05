import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

ShowItem.propTypes = {
  data: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired
    })
  ).isRequired
};

function ShowItem({ data, fields }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">{ t("details") }</h6>
      </div>
      <div className="card-body">
        <div className="form-group">
          {fields.map(field => (
            <div className="form-group" key={field.name}>
              <label>{field.name}</label>
              <div className="form-value">{field.render(data)}</div>
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="button button-big"
            onClick={() => window.history.back()}
          >
            <i className="button-icon fa-solid fa-arrow-left"></i>
            { t("back") }
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowItem;
