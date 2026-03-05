import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Condition from "../components/shared/Condition.jsx";
import { isLoggedIn } from "../services/auth.js";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

function NavBar() {
  const { username, userId } = useSelector(state => state.auth);
  const { i18n, t } = useTranslation();

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    Cookies.set("lang", lang, { path: "/" });
  };

  return (
    <nav id="navbar">
      <ul id="navbar-list">
        <li className="navbar-item" onClick={() => setLanguage("en")}>
          <i className="navbar-icon"><img src="/images/united-states.png" alt={t("english")}></img></i>
        </li>

        <li className="navbar-item" onClick={() => setLanguage("pl")}>
          <i className="navbar-icon"><img src="/images/poland.png" alt={t("polish")}></img></i>
        </li>

        <div className="navbar-divider"></div>

        <li className="nav-item">
          <Condition
            condition={isLoggedIn()}
            fallback={(
              <Link to="/login" id="navbar-user">
                <span id="navbar-username"><i className="navbar-user-icon fa-solid fa-right-to-bracket"></i>{t("login")}</span>
              </Link>
            )}
          >
            <Link to={`/users/${userId}`} id="navbar-user">
              <span id="navbar-username">{username}</span>
              <img src="/images/user.png" alt={t("user-img")} id="navbar-user-img" />
            </Link>
          </Condition>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
