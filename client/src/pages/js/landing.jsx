import React from "react";
import "../styles/landing.scss";
import police from "../images/policeOfficer.png";
import FormContainer from "../../components/js/formContainer";
import Modal from "../../components/js/popup";
import CatchPhrase from "../../components/js/catchPhrase";

// Il faut garder en tête que cette page n'a pas été codée en mode
// React mais plutôt recopiée pour être le plus similaire possible à ce qu'elle était avant... Bref, on fait du React
// Sans réellement utiliser le bon paradigme.

// THE WRAPPER OF THE WHOLE LANDING PAGE

// First we need to create the app component that will wrap all our components on the landing page
function Wrapper(props) {
  return (
    <div>
      <Modal image={police} isUnderage={props.isUnderage} />
      <IntroSection callToAction={props.callToAction} />
      <CallToAction
        callToAction={props.callToAction}
        catchPhrase={<span>Emmenez-moi au pays des merveilles 🌌</span>}
        link="publication"
      />
      <Explainations
        id={"one"}
        side={"right"}
        title={"Pourquoi ?"}
        text={
          <p>
            {"Parce que Parce que Parce que "}
            <strong>{"Parce que "}</strong>
            {"Parce que Parce que "}
            <strong className={"couleur"}>{"Parce que "}</strong>
            {" Parce que Parce que Parce que Parce que Parce que  "}
            <strong>{"Parce que "}</strong>
            {" Parce que Parce que Parce que Parce que Parce que  "}
            <strong>{"Parce que"}</strong>
            {
              " Parce que Parce que Parce que Parce que Parce que Parce que Parce que Parce que Parce que  "
            }
            <strong className={"couleur"}>{"Parce que "}</strong>
            {"."}
          </p>
        }
      />
      <Explainations
        id={"two"}
        side={"left"}
        title={"Comment ?"}
        text={
          <p>
            <strong className={"earousal"}>{"Comme ça "}</strong>
            {"Comme ça Comme ça Comme ça Comme ça Comme ça Comme ça "}
            <strong>{"Comme ça Comme ça "}</strong>
            {" Comme ça Comme ça Comme ça "}
            <strong className={"couleur"}>{"Comme ça "}</strong>
            {"Comme ça Comme ça "}
            <strong className={"couleur"}>{"Comme ça "}</strong>
            {". Comme ça Comme ça Comme ça Comme ça Comme ça Comme ça "}
            <strong className={"couleur"}>{"Comme ça "}</strong>
            {" Comme ça Comme ça Comme ça Comme ça Comme ça "}
            <br />
            {"Comme ça Comme ça Comme ça Comme ça "}
          </p>
        }
      />
      <Contact />
    </div>
  );
}

// THE COMPONENTS OF THE INTRO
function IntroSection(props) {
  return (
    <section id="intro" className="main style1 dark fullscreen">
      <div className="content">
        <header>
          <h2>Slogan incroyable</h2>
        </header>
        <p>
          Bienvenue sur <strong className="earousal">Site</strong>, une
          plateforme de <strong>dingue</strong>
        </p>
        <CatchPhrase
          catchPhrase="Emmenez-moi au pays des merveilles"
          link="publication"
        />
      </div>
    </section>
  );
}

// THEN WE WANT TO EXPLAIN WHAT OUR MISSION IS AND WHY WE'RE DOING WHAT WE'RE DOING

// We need the paragraph component that will contain our explainations
function Explainations(props) {
  const title = props.title;
  const text = props.text;
  const explainationId = props.id;
  const side = props.side;
  return (
    <section
      id={explainationId}
      className={"main style2 " + side + " dark fullscreen"}
    >
      <div className={"content box style2"}>
        <header>
          <h2>{title}</h2>
        </header>
        {text}
      </div>
    </section>
  );
}

// HERE IS THE FIRST CALL TO ACTION? WE WANT A COMPONENT THAT ENCOURAGES THE USER TO GO AND CONSUME
function CallToAction({ callToAction, catchPhrase, link }) {
  return (
    <section id="work" className={"main style3 primary"}>
      <div className={"content"}>
        <header>
          <h2>{callToAction}</h2>
        </header>
        <iframe
          src="https://anchor.fm/dissect/embed/episodes/Dissecting-Mogul-with-Brandon-Jenkins-eaol04/a-a1eecf2"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </section>
  );
}

// CONTACT NEWSLETTER

function Contact(props) {
  return (
    <section id={"contact"} className={"main style3 secondary"}>
      <div className={"content"}>
        <header>
          <h2>{"Remplis ce formulaire pour recevoir notre Newsletter"}</h2>
          <p>
            Pas de spam c'est promis !
            <br /> On te dira quand des
            <strong className="couleur"> nouveautés arrivent</strong>
            {" et on te tiendra au courant de nos avancées."}
          </p>
        </header>
        <div className={"box"}>
          <FormContainer />
        </div>
      </div>
    </section>
  );
}

export default Wrapper;
