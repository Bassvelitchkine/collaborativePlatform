import React from "react";
import instagram from "../../pages/images/instagram.png";
import email from "../../pages/images/email.png";

// IL NOUS FAUT LA SECTION FOOTER ET CREDITS
function SpecialFooter(props) {
  return (
    <footer id={"footer"}>
      <ul className={"icons"}>
        <li key={1}>
          <a
            href={"https://instagram.com/google/"}
            title={"Un ticket pour Instagram je vous prie !"}
          >
            <img
              src={instagram}
              alt={"Le logo d'Instagram"}
              height={"100px"}
              width={"100px"}
            />
          </a>
        </li>
        <li key={2}>
          <a
            href={"mailto:whatever@outlook.com"}
            title={"J'ai plein de choses à vous dire !"}
          >
            <img
              src={email}
              alt={"Un logo de lettre postale"}
              height={"100px"}
              width={"100px"}
            />
          </a>
        </li>
      </ul>
      <ul className={"menu"}>
        <li key={1}>{"Site"}</li>
        <li key={2}>
          {"Design: "}
          <a
            href={"https://html5up.net"}
            title={"A site full a beautiful HTML5 templates"}
          >
            {"HTML5 UP"}
          </a>
        </li>
        <li key={3}>
          {"Crédits Photo : On les oublie pas "}
          <a
            href={"https://www.unsplash.com"}
            title={"Un site plein de photos à couper le souffle"}
          >
            {"Unsplash"}
          </a>
        </li>
        <li key={4}>
          {"Icônes sur "}
          <a
            href={"https://www.flaticon.com"}
            title={"Un site plein d'icônes en tout genre"}
          >
            {"Flaticon"}
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default SpecialFooter;
