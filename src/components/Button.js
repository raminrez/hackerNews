import React from "react";

export default function Button({ onClick, className = "", children }) {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}
