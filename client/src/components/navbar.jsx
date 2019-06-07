import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="navbar">
        <h1>
          <a href="dashboard.html">
            <FontAwesomeIcon icon={faCalendarAlt} /> TimeManagement
          </a>
        </h1>
        <ul>
          <li>
            <a href="/profile">Profiili</a>
          </li>
          <li>
            <a href="/register">Rekisteröidy</a>
          </li>
          <li>
            <a href="/login">Kirjaudu</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
