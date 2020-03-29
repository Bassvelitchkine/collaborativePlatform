// On veut un élément qu'on puisse disposer en haut de chaque nouvelle page : l'élement contient un titre et
// une courte introduction

import React from "react";
import play from "../images/play.png";
import "../styles/pageIntro.scss";

class PageIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
  }

  handleClick() {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    const explainations = this.props.text;
    return (
      <section className="page intro">
        {this.props.withTitle ? <h1>{this.props.title}</h1> : null}
        <div className="explaination">
          <h2>
            <img
              className={!this.state.toggled ? "tourne" : ""}
              src={play}
              onClick={() => this.handleClick()}
              height="20px"
              width="20px"
              alt="Une icone triangulaire"
            />
            {this.props.secondaryTitle}
          </h2>
          {!this.state.toggled ? explainations : <p></p>}
        </div>
      </section>
    );
  }
}

export default PageIntro;
