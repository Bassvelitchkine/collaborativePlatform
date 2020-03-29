import React from "react";

const TextArea = props => {
  return (
    <textarea
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      rows={props.rows}
    />
  );
};

export default TextArea;
