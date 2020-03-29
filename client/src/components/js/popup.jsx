// WE WANT TO BUILD A POP UP COMPONENT THAT SHOWS ON OPENING TO PREVENT UNDERAGE USERS FROM ENTERING
import React, { Component } from "react";
import Modal from "react-awesome-modal";
import SubmitButton from "./submitButton";
import axios from "axios";

export default class Examples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    console.log(process.env.REACT_APP_URL);
  }

  openModal() {
    if (this.props.isUnderage) {
      this.setState({
        visible: true
      });
    }
  }

  closeModal() {
    this.setState({
      visible: false
    });
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/age`;
    axios.post(url, { isUnderage: false }).then(() => {
      console.log("Envoyé");
    });
  }

  componentDidMount() {
    setTimeout(() => this.openModal(), 500);
  }

  render() {
    return (
      <section id="popup">
        <Modal
          visible={this.state.visible}
          width="70%"
          height="85%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <header>
              <h2>Hop ! Hop ! Hop !</h2>
            </header>
            <img
              src={this.props.image}
              alt="Une icône quelconque qui représente l'idée qu'on ne peut pas aller plus loin sur le site si certaines conditions ne sont pas respectées"
              height="200px"
              width="200px"
            />
            <p>
              En entrant sur le site tu t'engages à être{" "}
              <strong className="couleur">respectueux et constructif</strong>.
            </p>
            <SubmitButton
              type="submit"
              value="Mais oui voyons !"
              submissionFunction={() => this.closeModal()}
            />
          </div>
        </Modal>
      </section>
    );
  }
}
