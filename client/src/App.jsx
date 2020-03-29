// This file will actually handle the whole website, helping rendering the right pages depending on the requested routes
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";

// Pages
import LandingPage from "./pages/js/landing";
import ContributionPage from "./pages/js/contribuer";
import NotFoundPage from "./pages/js/404";
import PublicationPage from "./pages/js/publication";
import AdminPage from "./pages/js/adminPage";
// App and routes the app has to behave differently depending on the value of isUnderage (the popup has to show when
// it's true)

// Constante pour la navigation
const nav = [
  ["/publication", "Publication"],
  ["/contribuer", "Contribuer"],
  ["/mission", "Notre Mission"]
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUnderage: true
    };
    var url = `${process.env.REACT_APP_URL}:${process.env.PORT ||
      "5000"}/api/age`;
    axios.get(url).then(response => {
      this.setState({ isUnderage: response.data.isUnderage });
      console.log(this.state);
    });
  }

  render() {
    var LandingWithProps = (
      <LandingPage
        nav={nav}
        callToAction="Le dernier audio"
        isUnderage={this.state.isUnderage}
      />
    );
    //

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => LandingWithProps} />
          <Route path="/publication" component={PublicationPage} />
          <Route path="/contribuer" component={ContributionPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
