import React from "react";
import AdminConnect from "../../components/js/adminConnect";
import AdminOptions from "../../components/js/adminOptions";
import "../styles/adminPage.scss";

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }

  handleConnection(connectionBool) {
    this.setState({ connected: connectionBool });
  }

  render() {
    var content = this.state.connected ? (
      <AdminOptions />
    ) : (
      <AdminConnect handleConnection={bool => this.handleConnection(bool)} />
    );
    return (
      <section className="admin-header">
        <h1>Bienvenue sur la page administrateur</h1>
        {content}
      </section>
    );
  }
}
