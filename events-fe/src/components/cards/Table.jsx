import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { showToast } from "../../store/toastSlice.js";
import { capitalizeFirstLetter } from "../../utils/functions.js";
import Loading from "./Loading.jsx";

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired
    })
  ).isRequired,
  fetchData: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired
};

function Table({ columns, fetchData, entityName, dataKey }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const title = t(entityName);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  useEffect(() => {
    setLoading(true);
    fetchData(page, limit)
      .then(({ items, totalItems }) => {
        setData(items);
        setTotalItems(totalItems);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showToast({
            title: `${t("error-fetching")} ${title}`
          })
        );
      });
  }, [page, limit, fetchData, dispatch, t, title]);

  const totalPages = Math.ceil(totalItems / limit);

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="card-title">{capitalizeFirstLetter(title)}</h6>
      </div>
      <div className="card-body">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.header}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0
                ? (
                    data.map(row => (
                      <tr key={row[dataKey]}>
                        {columns.map(col => (
                          <td key={col.header}>
                            <Link to={`/${entityName}/${row[dataKey]}`} className="tr-link">
                              {col.render(row)}
                            </Link>
                          </td>
                        ))}
                      </tr>
                    ))
                  )
                : (
                    <tr>
                      <td colSpan={columns.length}>{ t("no-data-available") }</td>
                    </tr>
                  )}
            </tbody>
          </table>

          <div className="table-pagination">
            <button
              onClick={() => goToPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="pagination-button"
            >
              { t("previous") }
            </button>
            <span className="pagination-text">
              { t("page") } {Math.max(1, page)} { t("of") } {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => goToPage(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages}
              className="pagination-button"
            >
              { t("next") }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
