import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";
import ItemForm from "../../components/cards/ItemForm.jsx";
import Header from "../../components/shared/Header.jsx";
import { createUser } from "../../services/api.js";
import { showToast } from "../../store/toastSlice.js";
import userSchema from "../../validation/userSchema.js";

function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [defaultValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const fields = [
    { name: "username", label: t("username"), type: "text" },
    { name: "email", label: t("email"), type: "email" },
    { name: "password", label: t("password"), type: "password" }
  ];

  const handleSubmit = async (data) => {
    try {
      await createUser(data);
      navigate("/");
    } catch {
      dispatch(
        showToast({
          title: t("error-creating-user")
        })
      );
    }
  };

  const buttons = [
    <Button
      text={t("go-back")}
      icon="fa-solid fa-rotate-left"
      key="back"
      action={() => window.history.back()}
    />
  ];

  return (
    <div className="container">
      <Header entityName={t("register")} buttons={buttons} />
      <ItemForm
        defaultValues={defaultValues}
        schema={userSchema}
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateUser;
