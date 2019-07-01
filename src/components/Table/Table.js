import React from "react";
import PropTypes from "prop-types";
import { sortBy } from "lodash";
import classnames from "classnames";

import Button from "../Button/Button";

const style = {
  largeColumn: { width: "40%" },
  midColumn: { width: "30%" },
  smallColumn: { width: "10%" }
};

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

export default function Table({
  list,
  onDismiss,
  sortKey,
  onSort,
  isSortReverse
}) {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  return (
    <div className="table">
      <div className="table-header">
        <span style={style.largeColumn}>
          <Sort activeSortKey={sortKey} sortKey={"TITLE"} onSort={onSort}>
            Title
          </Sort>
        </span>
        <span style={style.midColumn}>
          <Sort activeSortKey={sortKey} sortKey={"AUTHOR"} onSort={onSort}>
            Author
          </Sort>
        </span>
        <span style={style.smallColumn}>
          <Sort activeSortKey={sortKey} sortKey={"COMMENTS"} onSort={onSort}>
            Comments
          </Sort>
        </span>
        <span style={style.smallColumn}>
          <Sort activeSortKey={sortKey} sortKey={"POINTS"} onSort={onSort}>
            Points
          </Sort>
        </span>
        <span style={style.smallColumn}>Archive</span>
      </div>
      {reverseSortedList.map(item => (
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

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classnames("button-inline", {
    "button-active": sortKey === activeSortKey
  });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

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
