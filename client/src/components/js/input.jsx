import React from "react";

const Input = props => {
  return (
    <div className="half-field">
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={e => props.handleChange(e)}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default Input;
