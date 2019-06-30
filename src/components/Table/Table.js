import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";

const style = {
  largeColumn: { width: "40%" },
  midColumn: { width: "30%" },
  smallColumn: { width: "10%" }
};
export default function Table({ list, onDismiss }) {
  return (
    <div className="table">
      {list.map(item => (
        <div className="table-row" key={item.objectID}>
          <span style={style.largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={style.midColumn}>{item.author}</span>
          <span style={style.smallColumn}>{item.num_comments}</span>
          <span style={style.smallColumn}>{item.points}</span>
          <span style={style.smallColumn}>
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};
