import React from "react";
import "../styles/navigationBar.scss";

// THE COMPONENTS OF THE NAVIGATION BAR

// Then we need the Header component that carries the landing image of the landing page, and information about the navigation bar
function Header(props) {
  return (
    <header id="header">
      <h1>
        <a href={process.env.REACT_APP_URL} title="Retour à l'accueil">
          Site
        </a>
      </h1>
      <Nav navInfo={props.nav} />
    </header>
  );
}

// And finally we need the navigation bar
function Nav(props) {
  const list = props.navInfo.map(elem => (
    <li key={elem[0]}>
      <a href={elem[0]}>{elem[1]}</a>
    </li>
  ));

  return (
    <nav>
      <ul>{list}</ul>
    </nav>
  );
}

export default Header;
