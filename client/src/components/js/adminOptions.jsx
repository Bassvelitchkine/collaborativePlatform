import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../styles/adminOptions.scss";
import AdminSubmissionForm from "./adminSubmissionForm";
import AdminPublicationList from "./adminPublicationList";

function Downloads({ title, script, audio }) {
  return (
    <p>
      L'audio de <strong>{title}</strong> a été téléchargé {audio} fois et le
      script {script} fois
    </p>
  );
}

function Subscribers({ name, email, message, web, app }) {
  return (
    <ul className="subscriber">
      <li>
        <strong>Nom</strong> : {name}
      </li>
      <li>
        <strong>Email</strong> : {email}
      </li>
      <li>
        <strong>Web</strong> : {web}
      </li>
      <li>
        <strong>App</strong> : {app}
      </li>
      <li>
        <strong>Message</strong> : {message}
      </li>
    </ul>
  );
}

export default class AdminOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      compteurs: [],
      abonnes: [],
      publications: []
    };
  }

  handleFetchPublications() {
    axios
      .get(
        `${process.env.REACT_APP_URL}:${process.env.PORT ||
          "5000"}/api/database/`
      )
      .then(res => {
        console.log(res);
        var publications = res.data.map(
          ({
            title,
            anchor,
            author,
            audioAuthor,
            description,
            instagram,
            soundcloud,
            withAudio,
            text,
            date,
            image,
            words,
            audio,
            pdf,
            _id
          }) => ({
            title: title,
            anchor: anchor,
            author: author,
            audioAuthor: audioAuthor,
            description: description,
            instagram: instagram,
            soundcloud: soundcloud,
            withAudio: withAudio,
            text: text,
            date: date,
            image: image,
            words: words,
            audio: audio,
            pdf: pdf,
            _id: _id
          })
        );
        this.setState({ publications: publications });
      })
      .catch(err => console.log(err));
  }

  handleReRender() {
    this.handleFetchPublications();
  }

  handleSave() {
    axios
      .get(
        `${process.env.REACT_APP_URL}:${process.env.PORT ||
          "5000"}/api/save/all`
      )
      .then(res => {
        var db = res.data;
        var dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(db));
        const link = document.createElement("a");
        link.href = dataStr;
        link.setAttribute("download", "siteDB.json");
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.log(err));
  }

  handleRequests(val) {
    if (val === "compteurs") {
      if (this.state.compteurs !== []) {
        axios
          .get(
            `${process.env.REACT_APP_URL}:${process.env.PORT ||
              "5000"}/api/tracking/getDownloads`
          )
          .then(res => {
            console.log(res);
            var compteurs = res.data.map(({ title, audio, script }) => ({
              title: title,
              audio: audio,
              script: script
            }));
            this.setState({ compteurs: compteurs });
          })
          .catch(err => console.log(err));
      }
    }
    if (val === "abonnes") {
      if (this.state.abonnes !== []) {
        axios
          .get(
            `${process.env.REACT_APP_URL}:${process.env.PORT ||
              "5000"}/api/tracking/getSubscribers`
          )
          .then(res => {
            console.log(res);
            var abonnes = res.data.map(
              ({ name, email, message, web, app }) => ({
                name: name,
                email: email,
                message: message,
                web: web,
                app: app
              })
            );
            this.setState({ abonnes: abonnes });
          })
          .catch(err => console.log(err));
      }
    }
    if (val === "publications") {
      if (this.state.publications !== []) {
        this.handleFetchPublications();
      }
    }
  }

  handleClick(val) {
    this.handleRequests(val);
    this.setState({ value: val });
  }

  render() {
    if (this.state.value != null) {
      if (this.state.value === "compteurs") {
        var content = this.state.compteurs.map(
          ({ title, audio, script }, index) => (
            <Downloads
              title={title}
              audio={audio}
              script={script}
              key={index}
            />
          )
        );
      }
      if (this.state.value === "abonnes") {
        var content = this.state.abonnes.map(
          ({ name, email, message, web, app }, index) => (
            <Subscribers
              name={name}
              email={email}
              web={web}
              app={app}
              message={message}
              key={index}
            />
          )
        );
      }
      if (this.state.value === "publications") {
        var content = (
          <section>
            <AdminSubmissionForm handleReRender={() => this.handleReRender()} />
            <AdminPublicationList
              publications={this.state.publications}
              handleReRender={() => this.handleReRender()}
            />
          </section>
        );
      }
    }

    return (
      <article>
        <div className="admin-options">
          <Button onClick={() => this.handleClick("compteurs")}>
            Compteurs
          </Button>
          <Button onClick={() => this.handleClick("abonnes")}>Abonnés</Button>
          <Button onClick={() => this.handleClick("publications")}>
            Publications
          </Button>
          <Button onClick={() => this.handleSave()}>Sauvegarder la bdd</Button>
        </div>
        <div>{this.state.value != null ? content : null}</div>
      </article>
    );
  }
}
