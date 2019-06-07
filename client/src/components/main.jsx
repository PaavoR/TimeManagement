import React, { Component } from "react";
import "../styles/main.css";
import "typeface-open-sans";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Notification from "./notification";
import Register from "./register";
import Login from "./login";
import Navbar from "./navbar";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerSuccessful: false,
      redirect: false,
      redirectTarget: "",
      showNotification: false
    };
  }

  handleRegister(data, target) {
    this.setRedirect(target);
    this.setState({ registerSuccessful: true });
    this.setState({ showNotification: true });
    setTimeout(
      function() {
        this.setState({ showNotification: false });
      }.bind(this),
      3000
    );
  }

  setRedirect(target) {
    this.setState({ redirect: true, redirectTarget: target });
  }

  renderRedirect() {
    if (this.state.redirect) {
      this.setState({ redirect: false, redirectTarget: "" });
      return <Redirect to={"/" + this.state.redirectTarget} />;
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Notification showNotification={this.state.showNotification} />
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/register"
              component={() => (
                <Register onRegister={this.handleRegister.bind(this)} />
              )}
            />
          </Switch>
          {this.renderRedirect()}
        </Router>
      </div>
    );
  }
}

export default Main;
