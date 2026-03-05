import PropTypes from "prop-types";

Condition.propTypes = {
  condition: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  fallback: PropTypes.node,
  children: PropTypes.node.isRequired
};

function Condition({ condition, loading = false, fallback = null, children }) {
  if (loading) return null;
  if (!condition) {
    return fallback;
  }
  return <>{children}</>;
}

export default Condition;
