import React, { Component } from "react";
import "../styles/main.scss";
import "typeface-open-sans";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { getFromStorage, removeFromStorage } from "../functions/storage";

import Register from "./pages/register";
import Login from "./pages/login";
import Time from "./pages/time";
import LogTime from "./pages/log-time";
import Results from "./pages/results";
import Profile from "./pages/profile";
import TakeTime from "./pages/take-time";

import NotFound from "./notFound";
import Navbar from "./navbar";
import UserService from "../services/UserService";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTarget: "",
      loggedIn: false
    };
    this.UserService = new UserService();
  }

  async componentDidMount() {
    try {
      const userData = await this.UserService.getUserData();
      console.log(userData._id);
      if (userData) {
        this.setState({ loggedIn: true });
      }
    } catch (err) {
      this.setState({ loggedIn: false });
    }
  }

  handleRegister(target) {
    this.setRedirect(target);
    this.setState({ loggedIn: true });
  }

  handleLogin(target) {
    this.setRedirect(target);
    this.setState({ loggedIn: true });
  }

  handleError(target) {
    removeFromStorage("token");
    this.setState({ loggedIn: false });
    this.setRedirect(target);
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
              <Route path="/time" component={Time} />
              <Route path="/log-time" component={LogTime} />
              <Route path="/results" component={Results} />
              <Route path="/take-time" component={TakeTime} />
              <Route
                path="/profile"
                component={() => (
                  <Profile onError={this.handleError.bind(this)} />
                )}
              />
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
