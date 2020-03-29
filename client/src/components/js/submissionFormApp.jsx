// On veut créer le fichier qui permet d'assembler l'entièreté du form avec le drag and drop
import React from "react";
import axios from "axios";
import SubmissionForm from "./submissionForm";
import "../styles/submissionFormApp.scss";

class SubmissionFormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      pseudo: "",
      filenames: [],
      message: "",
      titre: "",
      contact: "",
      sent: "no"
    };
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/submission`;
    this.setState({ sent: "yes" });
    axios.post(url, this.state).then(
      response => {
        console.log(response.data);
        this.setState({ sent: "yes" });
      },
      err => {
        console.log(err);
        this.setState({ sent: "problem" });
      }
    );
  }

  handlePseudo(e) {
    this.setState({ pseudo: e.target.value });
  }

  handleTitle(e) {
    this.setState({ titre: e.target.value });
  }

  handleContact(e) {
    this.setState({ contact: e.target.value });
  }

  handleMessage(e) {
    this.setState({ message: e.target.value });
  }

  fileConversion(file) {
    var reader = new FileReader();
    reader.onload = () => {
      var fileList = this.state.files.slice();
      fileList.push(reader.result);
      this.setState({ files: fileList });
    };
    reader.readAsDataURL(file);
  }

  onDrop(acceptedFiles) {
    var fileNames = this.state.filenames.slice();
    acceptedFiles.forEach(file => {
      this.fileConversion(file);
      fileNames.push(file.name);
    });
    this.setState({ filenames: fileNames });
  }

  returnContent(sent) {
    if (sent === "no") {
      return (
        <div className="content submission">
          <header>
            {this.props.audio ? (
              <h2>Envoie-nous ton audio pour ce script !</h2>
            ) : (
              <h2>A toi de contribuer !</h2>
            )}
          </header>
          <SubmissionForm
            onFormSubmit={e => this.onFormSubmit(e)}
            handlePseudo={e => this.handlePseudo(e)}
            handleContact={e => this.handleContact(e)}
            handleTitle={e => this.handleTitle(e)}
            handleMessage={e => this.handleMessage(e)}
            onDrop={e => this.onDrop(e)}
            filenames={this.state.filenames}
            audio={this.props.audio}
          />
        </div>
      );
    } else {
      if (sent === "yes") {
        return (
          <div className="content submission after">
            <header>
              <h2>
                Merci ! On te contacte au plus vite <span>🚄</span>
              </h2>
            </header>
          </div>
        );
      } else {
        return (
          <div className="content submission after">
            <header>
              <h2>
                Oups... Il y a eu un problème, réessaye plus tard, ou
                envoie-nous directement un mail <span>💀</span>
              </h2>
            </header>
          </div>
        );
      }
    }
  }

  render() {
    const sent = this.state.sent;
    var content = this.returnContent(sent);
    return content;
  }
}

export default SubmissionFormApp;
