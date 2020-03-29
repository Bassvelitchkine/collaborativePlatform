import React from "react";

const SubmitButton = props => {
  return (
    <ul className={"actions special"}>
      <li>
        <input
          type={props.type}
          id={props.type}
          value={props.value}
          onClick={props.submissionFunction}
        />
      </li>
    </ul>
  );
};

export default SubmitButton;
