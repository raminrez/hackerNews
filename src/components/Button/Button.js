import React from "react";
import PropTypes from "prop-types";

export default function Button({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: ""
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
