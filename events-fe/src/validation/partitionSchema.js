import * as yup from "yup";
import i18n from "../i18n";

const partitionSchema = yup.object().shape({
  comment: yup
    .string()
    .nullable()
    .max(500, i18n.t("validation-comment"))
});

export default partitionSchema;
