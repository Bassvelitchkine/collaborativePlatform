import React from "react";
import PageIntro from "../../components/js/pageIntro.jsx";
import ButtonBar from "../../components/js/buttonBar";
import SubmissionFormApp from "../../components/js/submissionFormApp";
import { TutoEcrire, TutoEnregistrer } from "../../components/js/tutos";

var text = (
  <p>
    {"Ici on t'explique pas à pas "}
    <strong>{"comment"}</strong>
    {" contribuer et "}
    <strong>{"pourquoi"}</strong>
    {" est-ce qu'on vous demande à vous, la communauté, de contribuer."}
    {
      " C'est vrai que nous pourrions très bien décider de créer nous mêmes le contenu, avec une poignées de personnes compétentes. Mais, selon nous, c'est incompatible avec le but que nous poursuivons : vous offrir du contenu varié qui vous convient à vous ! Si nous étions les seuls à produire le contenu, nous prendrions le risque de tomber dans les travers que nous reprochons aux autres. Par ailleurs, nous serions limités dans le rythme des publications - avec ce modèle, ce n'est pas le cas !"
    }
    <br />
    <br />
    {"Aller ! On passe aux "}
    <strong>{"tutos "}</strong>
    {"! Et si tu sais déjà tout, tu peux nous envoyer tes chefs-d'oeuvres "}
    <span>👇</span>
  </p>
);

const secondaryTitle1 = <span>Qu'est-ce qu'il se passe ici ? 👾</span>;

class ContributionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutoAffiche: null
    };
  }

  handleClick(requestedTuto) {
    this.setState({ tutoAffiche: requestedTuto });
  }

  computeContent(request) {
    if (request === null) {
      return null;
    } else {
      if (request === "ecrire") {
        return <TutoEcrire />;
      } else {
        return <TutoEnregistrer />;
      }
    }
  }

  render() {
    var content = this.computeContent(this.state.tutoAffiche);
    return (
      <div>
        <PageIntro
          withTitle={true}
          title="Contribuer"
          text={text}
          secondaryTitle={secondaryTitle1}
        />
        <ButtonBar handleClick={e => this.handleClick(e)} />
        {content}
        <SubmissionFormApp audio={false} />
      </div>
    );
  }
}

export default ContributionPage;
