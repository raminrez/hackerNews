import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, children, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          ref={node => (this.input = node)}
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
};
