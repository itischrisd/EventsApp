import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/cards/Loading.jsx";
import Table from "../../components/cards/Table.jsx";
import ConfirmModal from "../../components/modals/ConfirmModal.jsx";
import Button from "../../components/shared/Button.jsx";
import ShowItem from "../../components/cards/ShowItem.jsx";
import Header from "../../components/shared/Header.jsx";
import Condition from "../../components/shared/Condition.jsx";
import { getEvent, deleteEvent, getEventParticipations } from "../../services/api.js";
import { isEventOwnerOrAdmin, isLoggedIn } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import { dateWithHour } from "../../utils/functions.js";

function Events() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fields = [
    { name: t("name"), render: event => event.name },
    { name: t("description"), render: event => event.description },
    { name: t("date"), render: event => dateWithHour(event.date) },
    { name: t("created-by"), render: event => event.createdByUsername }
  ];

  const participantsFields = [
    { header: t("username"), render: row => row.username },
    { header: t("registration-date"), render: row => dateWithHour(row.registrationDate) }
  ];

  const fetchParticipants = async (page, pageSize) => {
    const response = await getEventParticipations(eventId, page, pageSize);
    console.log(response);
    return {
      items: response.data.participations,
      totalItems: response.data.totalItems
    };
  };

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    try {
      deleteEvent(eventId);
      navigate("/events");
    } catch {
      dispatch(
        showToast({
          title: t("error-deleting-event")
        })
      );
    } finally {
      setIsConfirmOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEvent(eventId);
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
            title: t("error-fetching-event")
          })
        );
      });
  }, [dispatch, eventId, t]);

  if (loading) {
    return <Loading />;
  }

  const isAllowedToCreate = isLoggedIn();
  const isAllowedToEditOrDelete = isEventOwnerOrAdmin(data);

  return (
    <div className="container">
      <Header
        entityName={t("event")}
        buttons={[
          <Condition
            key="sign-up"
            loading={loading}
            condition={isAllowedToCreate}
          >
            <Button
              text={t("sign-up-for-event")}
              icon="fa-solid fa-user-plus"
              target={`/events/${eventId}/participate`}
            />
          </Condition>,
          <Condition
            key="edit"
            loading={loading}
            condition={isAllowedToEditOrDelete}
          >
            <Button
              text={t("edit-event")}
              icon="fa-solid fa-pen-to-square"
              target={`/events/${eventId}/edit`}
            />
          </Condition>,
          <Condition
            key="delete"
            loading={loading}
            condition={isAllowedToEditOrDelete}
          >
            <Button
              text={t("delete-event")}
              icon="fa-solid fa-trash-can"
              action={handleDelete}
              classes="button-red"
            />
          </Condition>
        ]}
      />
      <ShowItem data={data} fields={fields} />
      <Table
        columns={participantsFields}
        fetchData={fetchParticipants}
        entityName="participations"
        dataKey="id"
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={t("confirm-delete")}
        message={t("confirm-delete-message-event")}
      />
    </div>
  );
}

export default Events;
