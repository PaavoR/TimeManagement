import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { getFromStorage, removeFromStorage } from "../functions/storage";

import "../styles/navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getNavbar(loggedIn) {
    if (loggedIn) {
      return (
        <ul className="loggedin">
          <li>
            <a href="/time">Ajanotto / Kirjaus</a>
          </li>
          <li>
            <a href="/results">Tulokset</a>
          </li>
          <li>
            <a href="/profile">Profiili</a>
          </li>
          <li>
            <a onClick={() => removeFromStorage("token")} href="/login">
              Kirjaudu ulos
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="loggedoff">
          <li>
            <a href="/register">Rekisteröidy</a>
          </li>
          <li>
            <a href="/login">Kirjaudu</a>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="navbar">
        <nav>
          <h1>
            <a href={this.props.loggedIn ? "/time" : "/login"}>
              <FontAwesomeIcon icon={faCalendarAlt} /> TimeManagement
            </a>
          </h1>
          {this.getNavbar(this.props.loggedIn)}
        </nav>
      </div>
    );
  }
}

export default Navbar;
