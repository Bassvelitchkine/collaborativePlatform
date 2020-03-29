import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/adminPublicationList.scss";
import AdminModificationForm from "./adminModificationForm";
import axios from "axios";

class AdminPublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { delete: false, modify: false };
  }

  handleDelete() {
    this.setState({ delete: true });
  }

  handleAbort() {
    this.setState({ delete: false });
  }

  handleAbortModify() {
    this.setState({ modify: false });
  }

  handleDeleteConfirm() {
    const url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/database/delete/${this.props._id}`;
    axios
      .delete(url)
      .then(res => {
        console.log(res);
        // On demande un rerendering
        this.props.handleReRender();
      })
      .catch(err => console.log(err));
  }

  handleModify() {
    this.setState({ modify: true });
  }

  render() {
    var dependingOnDelete = this.state.delete ? (
      <div className="modifications">
        <Button onClick={() => this.handleAbort()}>Non</Button>
        <Button onClick={() => this.handleDeleteConfirm()}>Vraiment ?</Button>
      </div>
    ) : this.state.modify ? (
      <div className="modifications-initialized">
        <Button onClick={() => this.handleAbortModify()}>Annuler</Button>
        <AdminModificationForm
          audio={this.props.audio}
          image={this.props.image}
          pdf={this.props.pdf}
          anchor={this.props.anchor}
          author={this.props.author}
          audioAuthor={this.props.audioAuthor}
          description={this.props.description}
          date={this.props.date}
          instagram={this.props.instagram}
          soundcloud={this.props.soundcloud}
          text={this.props.text}
          title={this.props.title}
          withAudio={this.props.withAudio}
          _id={this.props._id}
          handleReRender={() => this.props.handleReRender()}
          handleAbortModify={() => this.handleAbortModify()}
        />
      </div>
    ) : (
      <div className="modifications">
        <Button onClick={() => this.handleDelete()}>Supprimer</Button>
        <Button onClick={() => this.handleModify()}>Modifier</Button>
      </div>
    );
    return (
      <div className="admin-publication">
        <ul>
          <li>
            <strong>Title</strong>: {this.props.title}
          </li>
          <li>
            <strong>Anchor</strong>: {this.props.anchor}
          </li>
          <li>
            <strong>Instagram</strong>: {this.props.instagram}
          </li>
          <li>
            <strong>Soundcloud</strong>: {this.props.soundcloud}
          </li>
          <li>
            <strong>withAudio</strong>: {this.props.withAudio}
          </li>
          <li>
            <strong>Text</strong>: {this.props.text.slice(0, 100)}
          </li>
          <li>
            <strong>Date</strong>: {this.props.date}
          </li>
          <li>
            <strong>Image</strong>: {this.props.image}
          </li>
          <li>
            <strong>Words</strong>: {this.props.words}
          </li>
          <li>
            <strong>Audio</strong>: {this.props.audio}
          </li>
          <li>
            <strong>Pdf</strong>: {this.props.pdf}
          </li>
          <li>
            <strong>Author</strong>: {this.props.author}
          </li>
          <li>
            <strong>Audio Author</strong>: {this.props.audioAuthor}
          </li>
          <li>
            <strong>Description</strong>: {this.props.description}
          </li>
        </ul>
        {dependingOnDelete}
      </div>
    );
  }
}

export default function AdminPublicationList(props) {
  var content = props.publications.map(
    ({
      title,
      author,
      audioAuthor,
      description,
      anchor,
      soundcloud,
      text,
      words,
      image,
      pdf,
      audio,
      withAudio,
      instagram,
      date,
      _id: _id
    }) => (
      <AdminPublication
        title={title}
        author={author}
        audioAuthor={audioAuthor}
        description={description}
        anchor={anchor}
        soundcloud={soundcloud}
        text={text}
        words={words}
        image={image}
        pdf={pdf}
        audio={audio}
        withAudio={withAudio}
        instagram={instagram}
        date={date}
        key={title}
        _id={_id}
        handleReRender={() => props.handleReRender()}
      />
    )
  );

  return content;
}
