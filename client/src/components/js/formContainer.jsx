import React, { Component } from "react";
import axios from "axios";
import "../styles/formContainer.scss";

/* Import Components */
import CheckBox from "./checkboxes";
import Input from "./input";
import TextArea from "./textarea";
import SubmitButton from "./submitButton";

// On veut créer un form customisé
// Il faut que le form soit très propre, aussi bien côté
// React que côté Node pour éviter les problèmes que nous avons eus par le passé

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSubscriber: {
        pseudo: "",
        email: "",
        pourquoi: ""
      },
      options: ["", ""]
    };
  }

  handlePseudo(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newSubscriber: { ...prevState.newSubscriber, pseudo: value }
    }));
  }

  handleEmail(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newSubscriber: { ...prevState.newSubscriber, email: value }
    }));
  }

  handleTextArea(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newSubscriber: {
        ...prevState.newSubscriber,
        pourquoi: value
      }
    }));
  }

  handleBox(id) {
    var array = this.state.options.slice();
    if (array[id] !== "") {
      array[id] = "";
    } else {
      array[id] = " checked";
    }
    this.setState({ options: array });
  }

  /* This life cycle hook gets executed when the component mounts */

  handleFormSubmit(e) {
    e.preventDefault();
    const userData = this.state;
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/tracking/newsletter`;

    // The fetch or axios API is a tool to make AJAX calls to the server, on the other side we have a small node js server
    // dealing with the call and putting the data in the right file

    axios
      .post(url, userData)
      .then(res => {
        alert(res.data);
        this.handleClearForm(e);
      })
      .catch(err => console.log(err));
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newSubscriber: {
        pseudo: "",
        email: "",
        pourquoi: ""
      },
      options: ["", ""]
    });
  }

  render() {
    return (
      <form className="container">
        <div className="line">
          <Input
            name="pseudo"
            type="text"
            value={this.state.newSubscriber.pseudo}
            handleChange={e => this.handlePseudo(e)}
            placeholder="Pseudo"
          />
          <Input
            name="email"
            type="email"
            value={this.state.newSubscriber.email}
            handleChange={e => this.handleEmail(e)}
            placeholder="Email"
          />
        </div>
        <TextArea
          name="pourquoi"
          type="text"
          value={this.state.newSubscriber.pourquoi}
          handleChange={e => this.handleTextArea(e)}
          placeholder="Pourquoi notre contenu t'intéresse-t-il ?"
          rows={3}
        />
        <p>Tu préfères consommer le contenu :</p>
        <div className="line" id="checkboxes">
          <CheckBox
            action={id => this.handleBox(id)}
            value={"site"}
            text="Sur un site web"
            id={0}
            classname={this.state.options[0]}
          />
          <CheckBox
            action={id => this.handleBox(id)}
            value={"app"}
            text="Sur une appli mobile"
            id={1}
            classname={this.state.options[1]}
          />
        </div>
        <SubmitButton
          type="submit"
          value="Souscrire !"
          submissionFunction={e => this.handleFormSubmit(e)}
        />
      </form>
    );
  }
}

export default FormContainer;
