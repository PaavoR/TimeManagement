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
import Time from "./time";
import NotFound from "./notFound";
import Navbar from "./navbar";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTarget: "",
      showNotification: false,
      loggedIn: false
    };
  }

  handleRegister(data, target) {
    this.setRedirect(target);
    this.setState({ showNotification: true });
    setTimeout(
      function() {
        this.setState({ showNotification: false });
      }.bind(this),
      3000
    );
  }

  handleLogin(target) {
    this.setRedirect(target);
    this.setState({ showNotification: true, loggedIn: true });
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

  doRedirect() {
    if (this.state.redirect) {
      this.setState({ redirect: false, redirectTarget: "" });
      return <Redirect to={"/" + this.state.redirectTarget} />;
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <Navbar loggedIn={this.state.loggedIn} />
          <Notification showNotification={this.state.showNotification} />
          <Router>
            <Switch>
              <Route path="/time" component={Time} />
              <Route component={NotFound} />
            </Switch>
            {this.doRedirect()}
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar loggedIn={this.state.loggedIn} />
          <Notification showNotification={this.state.showNotification} />
          <Router>
            <Switch>
              <Route
                path="/login"
                component={() => (
                  <Login onLogin={this.handleLogin.bind(this)} />
                )}
              />
              <Route
                path="/register"
                component={() => (
                  <Register onRegister={this.handleRegister.bind(this)} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
            {this.doRedirect()}
          </Router>
        </div>
      );
    }
  }
}

export default Main;
