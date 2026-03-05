import * as yup from "yup";
import i18n from "../i18n";

const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, i18n.t("validation-user-username-min"))
    .max(255, i18n.t("validation-user-username-max"))
    .required(i18n.t("validation-user-username-required")),
  email: yup
    .string()
    .email(i18n.t("validation-user-email-valid"))
    .required(i18n.t("validation-user-email-required")),
  password: yup
    .string()
    .min(8, i18n.t("validation-user-password-min"))
    .matches(/^(?=.*[A-Z])/, i18n.t("validation-user-password-uppercase"))
    .matches(/^(?=.*[a-z])/, i18n.t("validation-user-password-lowercase"))
    .matches(/^(?=.*\d)/, i18n.t("validation-user-password-number"))
    .required(i18n.t("validation-user-password-required"))
});

export default userSchema;
