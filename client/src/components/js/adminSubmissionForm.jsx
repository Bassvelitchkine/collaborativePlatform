import React from "react";
import axios from "axios";
import "../styles/adminSubmissionForm.scss";

// Le form qu'on va placer dans son gestionnaire
function Form({ handleChange, handleFile, handleSubmission }) {
  return (
    <form className="admin-submission">
      <input
        type="text"
        placeholder="Lien vers anchor"
        onChange={e => handleChange("anchor", e)}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={e => handleChange("author", e)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        onChange={e => handleChange("description", e)}
        maxLength="100"
        required
      />
      <input
        type="text"
        placeholder="Audio Author"
        onChange={e => handleChange("audioAuthor", e)}
        required
      />
      <input
        type="text"
        placeholder="Date"
        onChange={e => handleChange("date", e)}
        required
      />
      <input
        type="text"
        placeholder="Lien vers Instagram"
        onChange={e => handleChange("instagram", e)}
        required
      />
      <input
        type="text"
        placeholder="Lien vers Soundcloud"
        onChange={e => handleChange("soundcloud", e)}
      />
      <textarea
        rows={3}
        placeholder="Le script"
        onChange={e => handleChange("text", e)}
        required
      />
      <input
        type="text"
        placeholder="Titre de la publication"
        onChange={e => handleChange("title", e)}
        required
      />
      <input
        type="text"
        placeholder="Audio : true ou false"
        onChange={e => handleChange("withAudio", e)}
        required
      />
      <label htmlFor="illustration">Choisir l'illustration</label>
      <input
        type="file"
        name="illustration"
        onChange={e => handleFile("image", e)}
        required
      />
      <label htmlFor="pdf">Choisir le pdf</label>
      <input
        type="file"
        name="pdf"
        onChange={e => handleFile("pdf", e)}
        required
      />
      <label htmlFor="audio">Choisir l'audio</label>
      <input type="file" name="audio" onChange={e => handleFile("audio", e)} />
      <input
        type="submit"
        placeholder="Ajouter"
        onClick={e => handleSubmission(e)}
      />
    </form>
  );
}

// We want a form so that the administrator can add new elements to the database
export default class AdminSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: "",
      author: "",
      audioAuthor: "",
      description: "",
      date: "",
      instagram: "",
      soundcloud: "",
      text: "",
      title: "",
      withAudio: "",
      words: null,
      image: null, // Dans le form on a un emplacement pour un fichier mais on n'affiche que le titre
      pdf: null, // Dans le form on a un emplacement pour un fichier mais on n'affiche que le titre
      audio: null // Dans le form on a un emplacement pour un fichier mais on n'affiche que le titre
    };
  }

  handleChange(field, e) {
    if (field === "anchor") {
      this.setState({ anchor: e.target.value });
    }
    if (field === "author") {
      this.setState({ author: e.target.value });
    }
    if (field === "audioAuthor") {
      this.setState({ audioAuthor: e.target.value });
    }
    if (field === "description") {
      this.setState({ description: e.target.value });
    }
    if (field === "date") {
      this.setState({ date: e.target.value });
    }
    if (field === "instagram") {
      this.setState({ instagram: e.target.value });
    }
    if (field === "soundcloud") {
      this.setState({ soundcloud: e.target.value });
    }
    if (field === "text") {
      this.setState({ text: e.target.value });
    }
    if (field === "title") {
      this.setState({ title: e.target.value });
    }
    if (field === "withAudio") {
      this.setState({ withAudio: e.target.value });
    }
  }

  handleFile(field, e) {
    if (field === "image") {
      this.setState({ image: e.target.files[0] });
    }
    if (field === "pdf") {
      this.setState({ pdf: e.target.files[0] });
    }
    if (field === "audio") {
      this.setState({ audio: e.target.files[0] });
    }
  }

  handleSubmission(e) {
    // Requête post au serveur
    e.preventDefault();
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/database/new`;
    // Construction du form data
    const formData = new FormData();
    // Les fichiers
    formData.append("image", this.state.image);
    formData.append("pdf", this.state.pdf);
    formData.append("audio", this.state.audio);
    // Les Strings
    formData.append("title", this.state.title);
    formData.append("anchor", this.state.anchor);
    formData.append("author", this.state.author);
    formData.append("audioAuthor", this.state.audioAuthor);
    formData.append("description", this.state.description);
    formData.append("date", this.state.date);
    formData.append("instagram", this.state.instagram);
    formData.append("soundcloud", this.state.soundcloud);
    formData.append("withAudio", this.state.withAudio);
    formData.append("text", this.state.text);
    // Configuration pour que multer accepte de l'autre côté
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    console.log(formData);
    // Envoi au serveur
    axios
      .post(url, formData, config)
      .then(res => {
        console.log(res);
        this.props.handleReRender();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Form
        handleSubmission={e => this.handleSubmission(e)}
        handleChange={(field, e) => this.handleChange(field, e)}
        handleFile={(field, e) => this.handleFile(field, e)}
      />
    );
  }
}
