import { useTranslation } from "react-i18next";
import Header from "../../components/shared/Header.jsx";
import Table from "../../components/cards/Table.jsx";
import { fetchParticipations } from "../../services/api.js";

function Participations() {
  const { t } = useTranslation();

  const columns = [
    { header: t("username"), render: row => row.username },
    { header: t("event-name"), render: row => row.eventName }
  ];

  const fetchData = async (page, pageSize) => {
    const response = await fetchParticipations(page, pageSize);
    return {
      items: response.data.participations,
      totalItems: response.data.totalItems
    };
  };

  return (
    <div className="container">
      <Header entityName={t("participations")} />
      <Table
        columns={columns}
        fetchData={fetchData}
        entityName="participations"
        dataKey="id"
      />
    </div>
  );
}

export default Participations;
