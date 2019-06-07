import React, { Component } from "react";
import "../../styles/form.css";
import axios from "axios";
import Notification from "../notification";

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
  }

  getSuccess() {
    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const { name, email, password, password2 } = this.state;
    if (password !== password2) {
      //TODO alert tähän
      alert("Salasanat eivät täsmää");
    } else {
      try {
        const newUser = {
          name,
          email,
          password
        };
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post("/api/user/register", body, config);
        this.props.onRegister(res.data, "login");
      } catch (err) {
        console.error(err.response.data);
      }
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
