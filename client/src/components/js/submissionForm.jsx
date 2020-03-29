import React from "react";
import Dropzone from "./dropzone";
import FileList from "./fileList";

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box">
        <form className="container" onSubmit={this.props.onFormSubmit}>
          {/* PSEUDO */}
          <div className="fields">
            <div className="field">
              <label htmlFor="pseudo">
                Prends le même à chaque fois que tu contribues 😉
              </label>
              <input
                type="text"
                name="pseudo"
                placeholder="Pseudo"
                onChange={this.props.handlePseudo}
                required
              />
            </div>
            {/* MAIL OU INSTA */}
            <div className="field">
              <label htmlFor="contact">
                Nous serons les seuls à disposer de ces informations.
              </label>
              <input
                type="text"
                name="contact"
                placeholder="Email ou Insta pour qu'on puisse te recontacter"
                onChange={this.props.handleContact}
                required
              />
            </div>
            {!this.props.audio ? (
              <div className="field">
                <label htmlFor="titre">
                  Donne un titre à tes contributions{" "}
                </label>
                <input
                  type="text"
                  name="titre"
                  placeholder="Titre ✍🏽"
                  onChange={this.props.handleTitle}
                />
              </div>
            ) : (
              <span></span>
            )}
            <div className="field">
              <textarea
                name="message"
                rows="2"
                placeholder="Si tu as quelque chose à nous dire 💬"
                onChange={this.props.handleMessage}
              />
            </div>
            <div className="field">
              <Dropzone onDrop={this.props.onDrop} />
              <FileList filenames={this.props.filenames} />
            </div>
          </div>
          <ul className="actions special">
            <li>
              <input type="submit" value="C'est parti !" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default SubmissionForm;
