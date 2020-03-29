import React from "react";
import axios from "axios";

export default class AdminConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      mdp: ""
    };
  }

  handleSubmission(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/database/auth`;

    // On fait une requête au serveur
    axios
      .post(url, { data: this.state })
      .then(res => {
        console.log(res);
        // ici on reçoit la réponse du serveur et on la traite
        this.props.handleConnection(res.data.connected);
      })
      .catch(err => console.log(err));
  }

  handleIDChange(event) {
    this.setState({ id: event.target.value });
  }

  handleMDPChange(event) {
    this.setState({ mdp: event.target.value });
  }

  render() {
    return (
      <form>
        <input
          type="email"
          required
          placeholder="identifiant"
          onChange={e => this.handleIDChange(e)}
        />
        <input
          type="password"
          placeholder="mdp"
          onChange={e => this.handleMDPChange(e)}
        />
        <input
          type="submit"
          placeholder="Connexion"
          onClick={e => this.handleSubmission(e)}
        />
      </form>
    );
  }
}
