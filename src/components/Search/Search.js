import React from "react";
import PropTypes from "prop-types";

export default function Search({ value, onChange, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
};
