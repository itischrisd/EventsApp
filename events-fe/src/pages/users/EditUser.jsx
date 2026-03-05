import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";
import ItemForm from "../../components/cards/ItemForm.jsx";
import Header from "../../components/shared/Header.jsx";
import { getUser, updateUser } from "../../services/api.js";
import { isEditedUserOrAdmin } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import userSchema from "../../validation/userSchema.js";

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const fields = [
    { name: "username", label: t("username"), type: "text" },
    { name: "email", label: t("email"), type: "email" },
    { name: "password", label: t("password"), type: "password" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUser(userId);
      return response.data;
    };
    fetchData()
      .then((data) => {
        setDefaultValues(data);
        if (!isEditedUserOrAdmin(data)) {
          navigate("/unauthorized");
        }
      })
      .catch(() => {
        dispatch(
          showToast({
            title: t("error-fetching-user")
          })
        );
      });
  }, [dispatch, navigate, t, userId]);

  const handleSubmit = async (data) => {
    try {
      await updateUser(userId, data);
      navigate(`/users/${userId}`);
    } catch {
      dispatch(
        showToast({
          title: t("error-updating-user")
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
      <Header entityName={t("user")} buttons={buttons} />
      <ItemForm
        defaultValues={defaultValues}
        schema={userSchema}
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditUser;
