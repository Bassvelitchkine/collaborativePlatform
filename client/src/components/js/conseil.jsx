import React from "react";
import "../styles/conseil.scss";

var play = require("../images/play.png");

export default class Conseil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  handleClick() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <section className="advice">
        <h3>
          <img
            src={play}
            alt="Icone de triangle qui tourne quand on clique dessus"
            onClick={() => this.handleClick()}
            className={this.state.visible ? "tourne" : ""}
            height="15px"
            width="15px"
          />
          Conseil {this.props.title}
        </h3>
        {this.state.visible ? (
          <div>
            {this.props.text}
            <figure>
              <img src={this.props.image} alt="Un .gif illustrant le propos" />
              <figcaption>{this.props.caption}</figcaption>
            </figure>
          </div>
        ) : null}
      </section>
    );
  }
}
