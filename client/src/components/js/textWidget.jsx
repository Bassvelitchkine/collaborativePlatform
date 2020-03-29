// Ici, on construit le composant qui permettra d'afficher
// une prévisualisation du texte
import React from "react";
import "../styles/textWidget.scss";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function ClickableImage(props) {
  const match = useRouteMatch();
  return (
    <Link to={`${match.url}/${props.listId}`}>
      <img
        src={props.src}
        alt="Illustre l'une des publications"
        height="100%"
        width="100%"
      />
    </Link>
  );
}

function GoToScript({ listId }) {
  const match = useRouteMatch();
  return (
    <section className="script-preview">
      <Link to={`${match.url}/${listId}`}>
        <Button className="newspaper">📰</Button>
      </Link>
    </section>
  );
}

class TextWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      src: null
    };
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT || "5000"}/api/`;
    axios
      .get(url + `content/${this.props.image}`)
      .then(res => {
        var image = res.data.file;
        this.setState({ src: "data:image/png;base64," + image });
      })
      .catch(err => console.log(err));
  }

  handleClick() {
    this.setState({ visible: true });
  }

  computeTextExtract(text) {
    var temp = text.split(" ");
    temp = temp.slice(0, 70);
    temp = temp.join(" ");
    return temp + " [...]";
  }

  render() {
    return (
      <article className={`preview ${this.props.side}`}>
        <div className="squares">
          <section className="image">
            <ClickableImage
              src={this.state.src}
              image={this.props.image}
              listId={this.props.listId}
            />
          </section>
          <section className="text info" onClick={() => this.handleClick()}>
            <h1>{this.props.title}</h1>
            <div
              className={`details ${
                this.props.withAudio === "true" ? "full" : ""
              }`}
            >
              <p>{`Script : ${this.props.author}`}</p>
              {this.props.withAudio === "true" ? (
                <p>{`Audio : ${this.props.audioAuthor}`}</p>
              ) : null}
              <p>{this.props.date}</p>
              <p>{"Mots : " + this.props.words}</p>
            </div>
            <p className="description">{this.props.description}</p>
          </section>
          <GoToScript listId={this.props.listId} />
        </div>
      </article>
    );
  }
}

export default TextWidget;
