import React, { Component } from "react";
import "../styles/main.scss";
import "typeface-open-sans";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { getFromStorage } from "../functions/storage";

import Register from "./pages/register";
import Login from "./pages/login";
import Time from "./pages/time";
import Results from "./pages/results";
import Profile from "./pages/profile";

import NotFound from "./notFound";
import Navbar from "./navbar";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTarget: "",
      loggedIn: false
    };
  }

  componentDidMount() {
    const loggedIn = getFromStorage("loggedIn");
    if(loggedIn) {
      this.setState({ loggedIn: loggedIn });
    }
  }

  handleRegister(data, target) {
    this.setRedirect(target);
  }

  handleLogin(target) {
    this.setRedirect(target);
    this.setState({ loggedIn: true });
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
          <Router>
            <Switch>
              <Route 
                path="/time" 
                component={Time}
              />
              <Route
                path="/results"
                component={Results}
              />
              <Route
                path="/profile"
                component={Profile}
              />
              <Route component={NotFound} />
            </Switch>
            { this.doRedirect() }
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar loggedIn={this.state.loggedIn} />
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
            { this.doRedirect() }
          </Router>
        </div>
      );
    }
  }
}

export default Main;
