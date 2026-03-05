import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/shared/Button.jsx";
import ItemForm from "../../components/cards/ItemForm.jsx";
import Header from "../../components/shared/Header.jsx";
import { getParticipation, updateParticipation } from "../../services/api.js";
import { isParticipantOrAdmin } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import partitionSchema from "../../validation/partitionSchema.js";

function EditParticipation() {
  const { participationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = useState({
    comment: ""
  });

  const fields = [
    { name: "comment", label: t("domment"), type: "textarea" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getParticipation(participationId);
      return response.data;
    };
    fetchData()
      .then((data) => {
        setDefaultValues(data);
        if (!isParticipantOrAdmin(data)) {
          navigate("/unauthorized");
        }
      })
      .catch(() => {
        dispatch(
          showToast({
            title: t("error-fetching-participation")
          })
        );
      });
  }, [dispatch, navigate, participationId, t]);

  const handleSubmit = async (data) => {
    try {
      await updateParticipation(participationId, data);
      navigate(`/participations/${participationId}`);
    } catch {
      dispatch(
        showToast({
          title: t("error-updating-participation")
        })
      );
    }
  };

  const buttons = [
    <Button
      text={t("go back")}
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

export default EditParticipation;
