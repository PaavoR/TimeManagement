import React, { Component } from "react";
import "../../styles/form.scss";
import axios from "axios";
import Notification from "../notification";
import AuthService from "../../services/AuthService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AuthService = new AuthService();
  }

  getSuccess() {
    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  }
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="register">
        <h1>Rekisteröidy</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Sähköpostiosoite"
            name="email"
            className="text"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Nimi"
            className="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            placeholder="Salasana"
            className="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Salasana uudelleen"
            className="text"
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
            required
            minLength="6"
          />
          <input type="submit" value="Submit" className="submit" />
        </form>
        <a href="/login">Onko sinulla jo tunnus? Kirjaudu sisään</a>

        <Notification />
      </div>
    );
  }
}

export default Register;
