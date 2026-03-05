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
import { deleteUser, getUser, getUserParticipations } from "../../services/api.js";
import { isAdmin, isEditedUserOrAdmin } from "../../services/auth.js";
import { showToast } from "../../store/toastSlice.js";
import { dateWithHour } from "../../utils/functions.js";

function User() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  const fields = [
    { name: t("id"), render: user => user.id },
    { name: t("username"), render: user => user.username },
    { name: t("email"), render: user => user.email },
    { name: t("is-admin"), render: user => (user.isAdmin ? t("yes") : t("no")) }
  ];

  const participantsFields = [
    { header: t("event"), render: row => row.eventName },
    { header: t("registration-date"), render: row => dateWithHour(row.registrationDate) }
  ];

  const fetchParticipants = async (page, pageSize) => {
    console.log("tutaj1");
    const response = await getUserParticipations(userId, page, pageSize);
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
      deleteUser(userId);
      navigate("/users");
    } catch {
      dispatch(
        showToast({
          title: t("error-deleting-user")
        })
      );
    } finally {
      setIsConfirmOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUser(userId);
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
            title: t("Error-fetching-user")
          })
        );
      });
  }, [dispatch, t, userId]);

  if (loading) {
    return <Loading />;
  }

  const isAllowedToCreateOrDelete = isAdmin();
  const isAllowedToEdit = isEditedUserOrAdmin(data);

  return (
    <div className="container">
      <Header
        entityName={t("user")}
        buttons={[
          <Condition
            key="edit"
            loading={loading}
            condition={isAllowedToEdit}
          >
            <Button
              text={t("edit-user")}
              icon="fa-solid fa-pen-to-square"
              target={`/users/${userId}/edit`}
            />
          </Condition>,
          <Condition
            key="delete"
            loading={loading}
            condition={isAllowedToCreateOrDelete}
          >
            <Button
              text={t("delete-user")}
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
        message={t("confirm-delete-message-user")}
      />
    </div>
  );
}

export default User;
