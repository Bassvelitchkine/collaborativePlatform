import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/scriptPageIntro.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class ScriptPageIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSrc: "",
      pdfSrc: ""
    };
  }

  computeTitle(title) {
    var res = title
      .split(" ")
      .join("")
      .toLowerCase();
    return res;
  }

  onAudioDownload() {
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT || "5000"}/api/`;
    axios
      .post(url + "tracking/newDownload", {
        title: this.props.title,
        type: "audio"
      })
      .then(
        res => console.log(res),
        err => console.log(err)
      );
    axios
      .get(url + `content/${this.props.audioName}`)
      .then(res => {
        var audio = res.data.file;
        const link = document.createElement("a");
        link.href = "data:audio/mpeg;base64," + audio;
        link.setAttribute("download", this.props.audioName);
        document.body.appendChild(link);
        link.click();
        this.setState({ audioSrc: "data:audio/mpeg;base64," + audio });
      })
      .catch(err => console.log(err));
  }

  onScriptDownload() {
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT || "5000"}/api/`;
    axios
      .post(url + "tracking/newDownload", {
        title: this.props.title,
        type: "script"
      })
      .then(
        res => console.log(res),
        err => console.log(err)
      );
    axios
      .get(url + `content/${this.props.pdfName}`)
      .then(res => {
        var pdf = res.data.file;
        const link = document.createElement("a");
        link.href = "data:application/pdf;base64," + pdf;
        link.setAttribute("download", this.props.pdfName);
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="page intro">
        <h1 className="script-title">{this.props.title}</h1>
        <div className="downloads">
          <Button
            onClick={() => this.onScriptDownload()}
            variant="outline-secondary"
            size="lg"
          >
            Télécharger le script
          </Button>
          {this.props.withAudio === "true" ? (
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => this.onAudioDownload()}
            >
              Télécharger l'audio
            </Button>
          ) : null}
        </div>
      </section>
    );
  }
}

export default ScriptPageIntro;
