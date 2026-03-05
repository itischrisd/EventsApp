import { useTranslation } from "react-i18next";
import Header from "../../components/shared/Header.jsx";
import Table from "../../components/cards/Table.jsx";
import Button from "../../components/shared/Button.jsx";
import Condition from "../../components/shared/Condition.jsx";
import { fetchUsers } from "../../services/api.js";
import { isAdmin } from "../../services/auth.js";

function Users() {
  const { t } = useTranslation();

  const columns = [
    { header: t("id"), render: row => row.id },
    { header: t("username"), render: row => row.username }
  ];

  const fetchData = async (page, pageSize) => {
    const response = await fetchUsers(page, pageSize);
    return {
      items: response.data.users,
      totalItems: response.data.totalItems
    };
  };

  return (
    <div className="container">
      <Header
        entityName={t("users")}
        buttons={[
          <Condition
            key="create"
            condition={isAdmin()}
          >
            <Button
              text={t("create-user")}
              icon="fa-solid fa-plus"
              target="/users/add"
            />
          </Condition>
        ]}
      />
      <Table
        columns={columns}
        fetchData={fetchData}
        entityName="users"
        dataKey="id"
      />
    </div>
  );
}

export default Users;
