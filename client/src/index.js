import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Navigation from "./components/js/navigationBar";
import BottomFooter from "./components/js/bottomFooter";

const nav = [
  ["/", "Accueil"],
  ["/publication", "Publications"],
  ["/contribuer", "Contribuer"]
];

ReactDOM.render(<Navigation nav={nav} />, document.getElementById("nav-bar"));
ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<BottomFooter />, document.getElementById("bottom"));

// Let's see what's happening above : We render the navigation bar and the footer at the top and the bottom of our page
// We render an app in between. The whole idea is to not render over and over again the header and the footer
// The re rendering happens in between with the app handling the routes.
