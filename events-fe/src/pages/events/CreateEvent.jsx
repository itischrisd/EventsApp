import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";
import ItemForm from "../../components/cards/ItemForm.jsx";
import Header from "../../components/shared/Header.jsx";
import { createEvent } from "../../services/api.js";
import { isLoggedIn } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import eventSchema from "../../validation/eventSchema.js";

function CreateEvent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [defaultValues] = useState({
    name: "",
    description: "",
    date: ""
  });

  const fields = [
    { name: "name", label: t("name"), type: "text" },
    { name: "description", label: t("description"), type: "textarea" },
    { name: "date", label: t("date"), type: "datetime-local" }
  ];

  const handleSubmit = async (data) => {
    try {
      const response = await createEvent(data);
      navigate(`/events/${response.data.id}`);
    } catch {
      dispatch(
        showToast({
          title: t("error-creating-event")
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
      <Header entityName={t("event")} buttons={buttons} />
      <ItemForm
        defaultValues={defaultValues}
        schema={eventSchema}
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateEvent;
