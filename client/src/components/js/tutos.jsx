import React from "react";
import Conseil from "./conseil";
import MultiShareSoundcloud from "./multiShareSoundcloud";
import "../styles/tutos.scss";

// On importe toutes les images
const theatre = require("../images/tutos/theater.gif");
const blushing = require("../images/tutos/blushing.gif");
const immersive = require("../images/tutos/immersive.gif");
const math = require("../images/tutos/math.gif");
const darts = require("../images/tutos/darts.gif");
const ecrire = require("../images/tutos/ecrire.gif");
const telephone = require("../images/tutos/telephone.gif");
const wind = require("../images/tutos/wind.gif");
const acting = require("../images/tutos/acting.gif");
const beatbox = require("../images/tutos/beatbox.gif");
const computing = require("../images/tutos/computing.gif");

const contentListEcrire = [
  {
    title: "#1 : Tout est possible !",
    text: <p>Tu peux écrire tout ce que tu veux</p>,
    image: theatre,
    caption: "Oui ! "
  },
  {
    title: "#2 : Ne te censure pas !",
    text: (
      <p>
        Tu n'as jamais écrit ? C'est pas grave ! Personne ne viendra t'embêter,
        même si tu n'as pas la plume de Victor Hugo.
      </p>
    ),
    image: blushing,
    caption: "C'est l'effet du site"
  },
  {
    title: "#3 : Pense à ta cible !",
    text: (
      <p>
        Si tu écris simplement dans le but d'être lu(e), RAS, tu as tous les
        droits.
      </p>
    ),
    image: immersive,
    caption: "Oui"
  },
  {
    title: "#4 : Combien de mots ?",
    text: (
      <p>
        Si tu n'as pas spécialement envie que ton script soit enregistré : no
        limit ! On le publiera ton roman <span>😉</span>
        <br />
        Si tu espères que ton histoire devienne un audio, il vaut sans doute
        mieux te réfreiner un peu pour ne pas décourager la personne qui
        enregistrera (sauf si c'est toi !)
        <br />
        Voici quelques repères : dans les publications reçues à ce jour, 100
        mots équivalent à peu près à 1 minute d'audio. Sachant qu'un audio dure
        idéalement entre 3 et 30 minutes... On te laisse faire les calculs !
      </p>
    ),
    image: math,
    caption: "C'est pas si dur, tu vas voir"
  },
  {
    title: "#5 : L'inspiration",
    text: (
      <p>
        Qui n'a jamais eu peur devant sa page blanche vide ? <span>😱</span>
        <br />
        Heureusement, on est là pour t'aider ! Tu vas voir, ça va bien se
        passer.
        <br />
        Tu peux aussi regarder notre story à la une <em>"Sondages"</em>, tu
        auras des idées de thèmes avec lesquels faire mouche.
      </p>
    ),
    image: darts,
    caption: "En plein dans le bouc !"
  }
];

const instaLinks = [
  {
    link: "https://www.instagram.com/google",
    name: "@google"
  },
  {
    link: "https://www.instagram.com/nike/",
    name: "@nike"
  },
  {
    link: "https://www.instagram.com/fnac/",
    name: "@fnac"
  }
];

const contentListEnregistrer = [
  {
    title: "#1 : Quoi enregistrer",
    text: (
      <p>
        Tout d'abord, tu peux enregistrer n'importe lequel des audios publiés
        sur <strong className="couleur">site</strong> et qui ne l'a pas encore
        été.
        <br />
        Si aucun ne te plait, tu peux tout à fait écrire ton propre script et
        nous envoyer le tout.
        <br />
        Et si aucune de ces solutions ne te convient, tu peux aussi prendre un
        script quelconque sur Instagram ou internet de manière générale, et
        l'adapter en accord avec son auteur.
      </p>
    ),
    image: ecrire,
    caption: "N'attends pas d'être dans cet état-là"
  },
  {
    title: "#2 : Avec quoi enregistrer",
    text: (
      <p>
        Un téléphone de bonne qualité fait parfaitement l'affaire{" "}
        <span>📱</span> ! L'essentiel des audios publiés jusqu'ici ont été
        enregistrés de cette manière.
        <br />
        Mais tu peux également prendre un micro de gaming voire même du matériel
        pro si tu prévois de devenir la prochaine star du
        <strong className="couleur">Site</strong>. <span>🌠</span>
      </p>
    ),
    image: telephone,
    caption: "Oui, un bête téléphone"
  },
  {
    title: "#3 : Avoir un enregistrement de bonne qualité",
    text: (
      <p>
        Il faut que tu limites au maximum les bruits parasites - voilà le mot
        d'ordre ! Heureusement, en étant suffisamment précautioneux c'est assez
        facile. Tu peux par exemple enregistrer sous ta couette, ou dans ta
        voiture. Ce sont des endroits clôts et confinés qui limiteront les
        bruits de l'air et la réverbération.
        <br />
        Essaye également de limiter tes mouvements involontaires, ça limitera à
        nouveau les bruits parasites comme les crissements de tes vêtements.
        <br />
        Et pour finir, ne parle pas trop près de ton micro, sinon les auditeurs
        entendront ton souffle et ta voix se transformera en celle d'un
        guichetier de la poste. <span>💩</span>
      </p>
    ),
    image: wind,
    caption: "Le vent dans les oreilles, c'est rarement sympa"
  },
  {
    title: "#4 : Le jeu d'acteur",
    text: (
      <p>
        Essaye au maximum de te glisser dans la peau de ton personnage. Les
        auditeurs ne veulent pas simplement une lecture mais réellement une
        performance.
        <br />
        C'est souvent la partie la plus difficile, mais en t'entrainant un peu
        et en te réécoutant, ça devrait très bien se passer !
      </p>
    ),
    image: acting,
    caption: "C'est ça qu'on veut !"
  },
  {
    title: "#5 : Bonus pour les futur(e)s ingé son",
    text: (
      <p>
        Si tu t'en sens capable, tu peux tout à fait retravailler ton audio avec
        un logiciel adéquat <span>💻</span>, la cerise sur le gateau !
        <br />
        Audacity (gratuit) est déjà très puissant et vraiment simple
        d'utilisation. Si si ! C'est lui que t'utilisais en éducation musicale
        en 5ème. Il te permettra d'éliminer les bruits parasites résiduels, de
        compresser le son, de l'égaliser, de modifier ta voix, de rajouter de la
        musique (libre de droit) ainsi que des bruitages.
        <br />
        Bref, un nouveau monde s'ouvre à toi. <span>🌎</span>
      </p>
    ),
    image: computing,
    caption: "On t'assure que c'est fun"
  }
];

const soundcloudLinks = [
  {
    link:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/256188353&color=%235a2d5e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    title: "Podcast sympa sur Soundcloud"
  }
];

class TutoEcrire extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var links = instaLinks.map(({ link, name }, index) => (
      <strong key={index} className="couleur">
        <a href={link} alt={`lien vers le compte instagram ${name}`}>
          {name}
        </a>
        {index < 2 ? ", " : "."}
      </strong>
    ));
    return (
      <article className="tuto">
        <h2>Comment écrire ?</h2>
        <p>
          On va simplement te faire un récapitulatif des quelques règles que
          nous avons agrégées grâce aux 50 publications reçues sur Instagram.
        </p>
        {contentListEcrire.map(({ title, text, image, caption }, index) => (
          <Conseil
            key={index}
            title={title}
            text={text}
            image={image}
            caption={caption}
          />
        ))}
        <p id="partages">
          Et si vraiment rien ne te vient, tu peux regarder ce que font les
          autres sur quelques comptes Instagram sympathiques, dont le nôtre{" "}
          <span>😏</span> : <span>{links}</span>
          <br />
          Et si tu as quelques notions d'Anglais, tu peux aller sur{" "}
          <strong className="couleur">
            <a href="https://www.reddit.com/" alt="lien vers Reddit">
              Reddit
            </a>
            .
          </strong>
          C'est de là qu'est partie notre idée d'entreprise !
        </p>
      </article>
    );
  }
}

class TutoEnregistrer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <article className="tuto">
        <h2>Comment enregistrer ?</h2>
        <p>
          On va simplement te faire un récapitulatif des quelques règles que
          nous avons agrégées grâce aux 50 publications reçues sur Instagram.
        </p>
        {contentListEnregistrer.map(
          ({ title, text, image, caption }, index) => (
            <Conseil
              key={index}
              title={title}
              text={text}
              image={image}
              caption={caption}
            />
          )
        )}
        <section id="inspiration">
          <h2>Inspiration</h2>
          <p>
            Pour finir, on te peux que très chaudement te recommander d'aller
            écouter ce que nous avons déjà publié, mais aussi ce que font
            d'autres créateurs de contenu sur Instagram ou{" "}
            <strong className="couleur">
              <a href="https://www.reddit.com/" alt="lien vers Reddit">
                sur Reddit
              </a>
              .
            </strong>
          </p>
          <MultiShareSoundcloud accounts={soundcloudLinks} />
        </section>
      </article>
    );
  }
}

export { TutoEcrire, TutoEnregistrer };
