import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/catchPhrase.scss";

export default function CatchPhrase({ catchPhrase, link }) {
  return (
    <ul className={"plateformes catch-phrase"}>
      <li id={link}>
        <Link to={`/${link}`}>
          <Button>{catchPhrase}</Button>
        </Link>
      </li>
    </ul>
  );
}
