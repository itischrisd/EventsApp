import { useTranslation } from "react-i18next";
import Header from "../../components/shared/Header.jsx";
import Table from "../../components/cards/Table.jsx";
import Button from "../../components/shared/Button.jsx";
import Condition from "../../components/shared/Condition.jsx";
import { fetchEvents } from "../../services/api.js";
import { isLoggedIn } from "../../services/auth.js";
import { dateWithHour } from "../../utils/functions.js";

function Events() {
  const { t } = useTranslation();

  const columns = [
    { header: t("name"), render: row => row.name },
    { header: t("date"), render: row => dateWithHour(row.date) }
  ];

  const fetchData = async (page, pageSize) => {
    const response = await fetchEvents(page, pageSize);
    return {
      items: response.data.events,
      totalItems: response.data.totalItems
    };
  };

  return (
    <div className="container">
      <Header
        entityName={t("events")}
        buttons={[
          <Condition
            key="create"
            condition={isLoggedIn()}
          >
            <Button
              text={t("create-event")}
              icon="fa-solid fa-plus"
              target="/events/add"
            />
          </Condition>
        ]}
      />
      <Table
        columns={columns}
        fetchData={fetchData}
        entityName="events"
        dataKey="id"
      />
    </div>
  );
}

export default Events;
