import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../../utils/functions.js";

Header.propTypes = {
  entityName: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.node)
};

function Header({ entityName, buttons }) {
  return (
    <div className="container-header">
      <h1 className="container-title">{ capitalizeFirstLetter(entityName) }</h1>
      <div className="header-buttons">{ buttons }</div>
    </div>
  );
}

export default Header;
