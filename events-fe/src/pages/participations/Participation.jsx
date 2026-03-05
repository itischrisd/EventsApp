import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/cards/Loading.jsx";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import Button from "../../components/shared/Button.jsx";
import ShowItem from "../../components/cards/ShowItem.jsx";
import Header from "../../components/shared/Header.jsx";
import Condition from "../../components/shared/Condition.jsx";
import { deleteParticipation, getParticipation } from "../../services/api.js";
import { isParticipantOrAdmin } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import { dateWithHour } from "../../utils/functions.js";

function Participation() {
  const { participationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fields = [
    { name: t("user"), render: participation => participation.username },
    { name: t("event"), render: participation => participation.eventName },
    { name: t("comment"), render: participation => participation.comment },
    { name: t("registration-date"), render: participation => dateWithHour(participation.registrationDate) }
  ];

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await deleteParticipation(participationId);
      navigate("/participations");
    } catch {
      dispatch(
        showToast({
          title: t("error-deleting-participation")
        })
      );
    } finally {
      setIsConfirmOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getParticipation(participationId);
      return response.data;
    };
    setLoading(true);
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showToast({
            title: t("error-fetching-participation")
          })
        );
      });
  }, [dispatch, participationId, t]);

  if (loading) {
    return <Loading />;
  }

  const isAllowedToEditOrDelete = isParticipantOrAdmin(data);

  return (
    <div className="container">
      <Header
        entityName={t("participation")}
        buttons={[
          <Condition
            key="edit"
            loading={loading}
            condition={isAllowedToEditOrDelete}
          >
            <Button
              text={t("edit-participation")}
              icon="fa-solid fa-pen-to-square"
              target={`/participations/${participationId}/edit`}
            />
          </Condition>,
          <Condition
            key="delete"
            loading={loading}
            condition={isAllowedToEditOrDelete}
          >
            <Button
              text={t("delete-participation")}
              icon="fa-solid fa-trash-can"
              action={handleDelete}
              classes="button-red"
            />
          </Condition>
        ]}
      />
      <ShowItem data={data} fields={fields} />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={t("confirm-delete")}
        message={t("confirm-delete-message-participation")}
      />
    </div>
  );
}

export default Participation;
