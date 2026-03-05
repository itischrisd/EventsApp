import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  action: PropTypes.func,
  target: PropTypes.string,
  classes: PropTypes.string
};

function Button({ text, icon, action, target, classes }) {
  const buttonClasses = `button ${classes}`;
  const iconClasses = `button-icon ${icon}`;
  const iconNode = <i className={iconClasses}></i>;
  const isLink = target && target.length > 0;

  if (isLink) {
    return (
      <Link to={target} className={buttonClasses}>
        {iconNode}
        {text}
      </Link>
    );
  }

  return (
    <button onClick={action} className={buttonClasses}>
      {iconNode}
      {text}
    </button>
  );
}

export default Button;
