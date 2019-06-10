import React, { Component } from "react";
import "../../styles/form.scss";
import { setToStorage } from "../../functions/storage";
import AuthService from "../../services/AuthService";
import Notification from "../notification";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: ""
      },
      notification: {
        text: "",
        show: "false"
      }
    };
    this.AuthService = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      const loggedIn = await this.AuthService.login(this.state.formData);
      if (loggedIn) {
        console.log("Onnistui");
        this.props.onLogin("time");
      } else {
        let message = "Virhe: Odottamaton virhe!";
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

  render() {
    return (
      <div className="login">
        <h1>Kirjaudu</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="text"
            placeholder="Sähköpostiosoite"
            name="email"
            value={this.state.formData.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            className="text"
            placeholder="Salasana"
            name="password"
            value={this.state.formData.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" className="submit" />
        </form>
        <a href="/register">Tarvitsetko tunnuksen? Rekisteröidy</a>
        <Notification
          showNotification={this.state.notification.show}
          text={this.state.notification.text}
          type="fail"
        />
      </div>
    );
  }
}

export default Login;
