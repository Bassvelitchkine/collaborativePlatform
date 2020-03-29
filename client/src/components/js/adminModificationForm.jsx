import React from "react";
import axios from "axios";
import "../styles/adminSubmissionForm.scss";

// Le form qu'on va placer dans son gestionnaire
function Form({
  handleChange,
  handleFile,
  handleSubmission,
  audioName,
  pdfName,
  imageName,
  anchor,
  author,
  audioAuthor,
  description,
  date,
  instagram,
  soundcloud,
  text,
  title,
  withAudio
}) {
  return (
    <form className="submission">
      <input
        type="text"
        value={anchor}
        onChange={e => handleChange("anchor", e)}
      />
      <input
        type="text"
        value={author}
        onChange={e => handleChange("author", e)}
        required
      />
      <input
        type="text"
        value={audioAuthor}
        onChange={e => handleChange("audioAuthor", e)}
      />
      <input
        type="text"
        value={description}
        maxLength="100"
        onChange={e => handleChange("description", e)}
        required
      />
      <input
        type="text"
        value={date}
        onChange={e => handleChange("date", e)}
        required
      />
      <input
        type="text"
        value={instagram}
        onChange={e => handleChange("instagram", e)}
        required
      />
      <input
        type="text"
        value={soundcloud}
        onChange={e => handleChange("soundcloud", e)}
      />
      <textarea value={text} onChange={e => handleChange("text", e)} required />
      <input
        type="text"
        value={title}
        onChange={e => handleChange("title", e)}
        required
      />
      <input
        type="text"
        value={withAudio}
        onChange={e => handleChange("withAudio", e)}
        required
      />
      <label htmlFor="illustration">Illustration actuelle : {imageName}</label>
      <input
        type="file"
        name="illustration"
        onChange={e => handleFile("image", e)}
        required
      />
      <label htmlFor="pdf">pdf actuel : {pdfName}</label>
      <input
        type="file"
        name="pdf"
        onChange={e => handleFile("pdf", e)}
        required
      />
      <label htmlFor="audio">Audio actuel : {audioName}</label>
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
export default class AdminModificationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: this.props.anchor,
      author: this.props.author,
      audioAuthor: this.props.audioAuthor,
      description: this.props.description,
      date: this.props.date,
      instagram: this.props.instagram,
      soundcloud: this.props.soundcloud,
      text: this.props.text,
      title: this.props.title,
      withAudio: this.props.withAudio,
      imageName: this.props.image,
      pdfName: this.props.pdf,
      audioName: this.props.anchor,
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
      "5000"}/api/database/modify/${this.props._id}`;
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
    // Les anciennes valeurs qui nous serviront à supprimer les fichiers du serveur
    formData.append("previousImage", this.props.image);
    formData.append("previousPdf", this.props.pdf);
    formData.append("previousAudio", this.props.audio);
    // Configuration pour que multer accepte de l'autre côté
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    // Envoi au serveur
    axios
      .put(url, formData, config)
      .then(res => {
        console.log(res);
        this.props.handleAbortModify();
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
        audioName={this.state.audioName}
        imageName={this.state.imageName}
        pdfName={this.state.pdfName}
        anchor={this.state.anchor}
        author={this.state.author}
        audioAuthor={this.state.audioAuthor}
        description={this.state.description}
        date={this.state.date}
        instagram={this.state.instagram}
        soundcloud={this.state.soundcloud}
        text={this.state.text}
        title={this.state.title}
        withAudio={this.state.withAudio}
      />
    );
  }
}
