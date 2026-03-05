import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";
import ItemForm from "../../components/cards/ItemForm.jsx";
import Header from "../../components/shared/Header.jsx";
import { getEvent, updateEvent } from "../../services/api.js";
import { isEventOwnerOrAdmin } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import { dateWithHourNoTimezone } from "../../utils/functions.js";
import eventSchema from "../../validation/eventSchema.js";

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    description: "",
    date: ""
  });

  const fields = [
    { name: "name", label: t("name"), type: "text" },
    { name: "description", label: t("description"), type: "textarea" },
    { name: "date", label: t("date"), type: "datetime-local" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEvent(eventId);
      return response.data;
    };
    fetchData()
      .then((data) => {
        data.date = dateWithHourNoTimezone(data.date);
        setDefaultValues(data);
        if (!isEventOwnerOrAdmin(data)) {
          navigate("/unauthorized");
        }
      })
      .catch(() => {
        dispatch(
          showToast({
            title: t("error-fetching-event")
          })
        );
      });
  }, [dispatch, eventId, navigate, t]);

  const handleSubmit = async (data) => {
    try {
      await updateEvent(eventId, data);
      navigate(`/events/${eventId}`);
    } catch {
      dispatch(
        showToast({
          title: t("error-updating-event")
        })
      );
    }
  };

  const buttons = [
    <Button text={t("go-back")} icon="fa-solid fa-rotate-left" key="back" action={() => window.history.back()} />
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

export default EditEvent;
