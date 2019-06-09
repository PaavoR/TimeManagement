import React, { Component } from "react";
import "../../styles/form.scss";

import Notification from "../notification";
import AuthService from "../../services/AuthService";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      notification: {
        text: "",
        show: "false"
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AuthService = new AuthService();
    this.hideNotification = this.hideNotification.bind(this);
  }

  getSuccess() {
    return true;
  }

  hideNotification() {
    this.setState({
      ...this.state,
      notification: {
        ...this.state.notification,
        show: "false",
        text: ""
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const registered = await this.AuthService.register(this.state.formData);
      if (registered) {
        console.log("Onnistui");
        this.props.onRegister("time");
      }
    } catch (error) {
      console.log("tultiin tänne");
      console.log(error);
      let message = "Virhe: ";
      if (error.errors) {
        error.errors.map(err => (message += err.msg));
      }
      this.setState({
        ...this.state,
        notification: {
          ...this.state.notification,
          show: "true",
          text: message
        }
      });
      setTimeout(this.hideNotification, 4000);
    }
  }
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, [name]: value }
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
            value={this.state.formData.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Nimi"
            className="text"
            name="name"
            value={this.state.formData.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            placeholder="Salasana"
            className="text"
            name="password"
            value={this.state.formData.password}
            onChange={this.handleChange}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Salasana uudelleen"
            className="text"
            name="password2"
            value={this.state.formData.password2}
            onChange={this.handleChange}
            required
            minLength="6"
          />
          <input type="submit" value="Submit" className="submit" />
        </form>
        <a href="/login">Onko sinulla jo tunnus? Kirjaudu sisään</a>

        <Notification
          showNotification={this.state.notification.show}
          text={this.state.notification.text}
          type="fail"
        />
      </div>
    );
  }
}

export default Register;
