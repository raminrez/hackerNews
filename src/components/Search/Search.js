import React from "react";

export default function Search({ value, onChange, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  );
}
