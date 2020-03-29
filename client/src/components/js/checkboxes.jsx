import React from "react";

// On veut créer nos propres composants "boutons", ceux qui déterminent si on préfère un site ou une app mobile
function CheckBoxButton(props) {
  const action = props.action;
  const value = props.value;
  const text = props.text;
  const id = props.id;
  const classname = props.classname;
  return (
    <div className={"half-field"}>
      <input
        type={"checkbox"}
        value={value}
        id={value}
        name={"platform"}
        className={"checkbox"}
      />
      <label
        className={"container" + classname}
        htmlFor={value}
        id={id}
        onClick={() => action(id)}
      >
        {text}
      </label>
    </div>
  );
}

export default CheckBoxButton;
