import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/modals/ConfirmModal.jsx";
import Condition from "../components/shared/Condition.jsx";
import { isLoggedIn } from "../services/auth.js";
import { logout } from "../store/authSlice.js";

function NavMenu() {
  const { userId } = useSelector(state => state.auth);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleConfirm = async () => {
    dispatch(logout());
    navigate("/");
    setIsConfirmOpen(false);
  };

  return (
    <ul id="sidebar">
      <li>
        <Link to="/" id="logo-link">
          <div id="logo-icon-wrapper">
            <i id="logo-icon" className="fa-regular fa-calendar-check"></i>
          </div>
          <div id="logo-text">{ t("app-name") }</div>
        </Link>
      </li>

      <li>
        <hr className="sidebar-divider" />
      </li>

      <li className="nav-item">
        <Link to="/" className="nav-link">
          <i className="nav-icon fa-solid fa-house"></i>
          <span className="nav-text">{ t("home") }</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/events" className="nav-link">
          <i className="nav-icon fa-solid fa-calendar-days"></i>
          <span className="nav-text">{ t("events") }</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/users" className="nav-link">
          <i className="nav-icon fa-solid fa-users"></i>
          <span className="nav-text">{ t("users") }</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/participations" className="nav-link">
          <i className="nav-icon fa-solid fa-user-check"></i>
          <span className="nav-text">{ t("participations") }</span>
        </Link>
      </li>

      <li>
        <hr className="sidebar-divider" />
      </li>

      <li className="nav-item">
        <Condition
          condition={isLoggedIn()}
          fallback={(
            <Link to="/register" className="nav-link">
              <i className="nav-icon fa-solid fa-user-plus"></i>
              <span className="nav-text">{ t("register") }</span>
            </Link>
          )}
        >
          <Link to={`/users/${userId}`} className="nav-link">
            <i className="nav-icon fa-solid fa-user-gear"></i>
            <span className="nav-text">{ t("my-account") }</span>
          </Link>
        </Condition>
      </li>

      <li className="nav-item">
        <Condition condition={isLoggedIn()}>
          <button className="nav-link " onClick={() => setIsConfirmOpen(true)}>
            <i className="nav-icon fa-solid fa-right-from-bracket"></i>
            <span className="nav-text">{ t("logout") }</span>
          </button>
        </Condition>
      </li>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={t("confirm-logout")}
        message={t("confirm-logout-message")}
      />
    </ul>
  );
}

export default NavMenu;
