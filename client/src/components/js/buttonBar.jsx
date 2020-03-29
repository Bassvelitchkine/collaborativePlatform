// On créer un composant consituté de deux bouttons comportant des liens vers de nouvelles pages
import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/buttonBar.scss";

export default class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="button-bar">
        <Button
          size="lg"
          variant="outline-secondary"
          onClick={() => this.props.handleClick("ecrire")}
        >
          Comment écrire
        </Button>
        <Button
          size="lg"
          variant="outline-secondary"
          onClick={() => this.props.handleClick("enregistrer")}
        >
          Comment enregistrer
        </Button>
      </div>
    );
  }
}
