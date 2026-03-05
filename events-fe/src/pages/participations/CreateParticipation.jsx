import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";
import ItemForm from "../../components/cards/ItemForm.jsx";
import Header from "../../components/shared/Header.jsx";
import { createParticipation } from "../../services/api.js";
import { isLoggedIn } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import partitionSchema from "../../validation/partitionSchema.js";

function CreateParticipation() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [defaultValues] = useState({
    comment: ""
  });

  const fields = [
    { name: "comment", label: t("comment"), type: "textarea" }
  ];

  const handleSubmit = async (data) => {
    try {
      const payload = { ...data, eventId };
      const response = await createParticipation(payload);
      navigate(`/events/${response.data.eventId}`);
    } catch {
      dispatch(
        showToast({
          title: t("error-creating-participation")
        })
      );
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/unauthorized");
    }
  }, [navigate]);

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
      <Header entityName={t("participation")} buttons={buttons} />
      <ItemForm
        defaultValues={defaultValues}
        schema={partitionSchema}
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateParticipation;
