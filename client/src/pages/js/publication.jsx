import React, { Component } from "react";
import PageIntro from "../../components/js/pageIntro";
import CatchPhrase from "../../components/js/catchPhrase";
import TextWidget from "../../components/js/textWidget";
import ScriptPage from "./scriptPage";
import "../styles/publication.scss";
import axios from "axios";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// Constantes pour la page publication
const publicationText = (
  <p>
    Ici, tu trouveras tout ce qui a été créé par la communauté{" "}
    <strong>Site</strong> depuis la création de notre compte Instagram. C'est
    l'ensemble du contenu participatif de la plateforme. Chacune des
    publications regroupe les articles que vous avez écrits et éventuellement
    les audios associés. Tu vas voir, c'est mindblowing... <span>🤯</span>
  </p>
);

const secondaryTitle = <span>Qu'est-ce qu'il se passe ici ? 👾</span>;

function RouterWrapper({ scripts, publicationPage }) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {publicationPage}
      </Route>
      <Route
        path={`${match.url}/:scriptKey`}
        render={() => <ScriptPage publicationData={scripts} />}
      ></Route>
    </Switch>
  );
}

class PublicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scripts: []
    };
    // On va récupérer les écrits et toutes les informations les concernant auprès du serveur pour les ranger dans
    // l'état du composant
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/database/`;
    axios.get(url).then(
      response => {
        this.setState({ scripts: response.data });
      },
      err => console.log(err)
    );
  }
  render() {
    var scripts = this.state.scripts;

    var textWidgets = scripts.map((script, index) => (
      <TextWidget
        key={index}
        listId={index}
        side={index % 2 === 0 ? "left" : "right"}
        date={script.date}
        image={script.image}
        likes={script.likes}
        title={script.title}
        withAudio={script.withAudio}
        description={script.description}
        words={script.words}
        text={script.text}
        author={script.author}
        audioAuthor={script.audioAuthor}
      />
    ));
    var publicationPage = (
      <div>
        <PageIntro
          withTitle={true}
          text={publicationText}
          title="Publication"
          secondaryTitle={secondaryTitle}
        />
        <CatchPhrase link="contribuer" catchPhrase={<span>Contribuer</span>} />
        <div id="text-list">
          <header>
            <h1>
              Toutes les contributions <span>👇</span>
            </h1>
          </header>
          {scripts ? textWidgets : {}}
        </div>
      </div>
    );

    return (
      <RouterWrapper scripts={scripts} publicationPage={publicationPage} />
    );
  }
}

export default PublicationPage;
