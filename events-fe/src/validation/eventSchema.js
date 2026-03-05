import * as yup from "yup";
import i18n from "../i18n";

const eventSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, i18n.t("validation-event-name-min"))
    .max(255, i18n.t("validation-event-name-max"))
    .required(i18n.t("validation-event-name-required")),
  description: yup
    .string()
    .nullable()
    .max(1000, i18n.t("validation-event-description-max")),
  date: yup
    .date()
    .typeError(i18n.t("validation-event-date-valid"))
    .min(new Date(), i18n.t("validation-event-date-future"))
    .required(i18n.t("validation-event-date-required"))
});

export default eventSchema;
