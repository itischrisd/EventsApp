import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

ItemForm.propTypes = {
  defaultValues: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.oneOf([
        "text",
        "textarea",
        "email",
        "password",
        "checkbox",
        "datetime-local"
      ]).isRequired,
      options: PropTypes.array
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired
};

function ItemForm({ defaultValues, schema, fields, onSubmit }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const internalSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">{t("please-enter-data")}</h6>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(internalSubmit)}>
          {fields.map((field) => {
            const { name, label, type } = field;
            const hasError = !!errors[name];
            return (
              <div key={name} className="form-group">
                <label htmlFor={name}>{label}</label>
                {type === "textarea"
                  ? (
                      <textarea
                        id={name}
                        {...register(name)}
                        className={`form-input ${hasError ? "error" : ""}`}
                      />
                    )
                  : type === "checkbox"
                    ? (
                        <input
                          id={name}
                          type="checkbox"
                          {...register(name)}
                          className={`form-checkbox ${hasError ? "error" : ""}`}
                        />
                      )
                    : (
                        <input
                          id={name}
                          type={type}
                          {...register(name)}
                          className={`form-input ${hasError ? "error" : ""}`}
                        />
                      )}
                {hasError && (
                  <p className="form-error">{errors[name]?.message}</p>
                )}
              </div>
            );
          })}
          <div className="form-actions">
            <button type="submit" className="button button-big">
              <i className="button-icon fa-solid fa-floppy-disk"></i>
              { t("save") }
            </button>
            <button
              type="button"
              className="button button-big button-red"
              onClick={() => window.history.back()}
            >
              <i className="button-icon fa-solid fa-ban"></i>
              { t("cancel") }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;
