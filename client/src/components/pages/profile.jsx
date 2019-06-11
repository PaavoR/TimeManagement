import React, { Component } from "react";
import "../../styles/profile.scss";
import UserService from "../../services/UserService";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
    this.UserService = new UserService();
  }
  async componentDidMount() {
    try {
      const data = await this.UserService.getUserData();
      const { name, email } = data;
      this.setState({ name: name, email: email });
    } catch (error) {
      console.log(error);
      this.props.onError("login");
    }
  }

  render() {
    return (
      <div className="profile">
        <h1>Profiili</h1>
        <p>Nimi: {this.state.name}</p>
        <p>Sähköposti: {this.state.email}</p>
      </div>
    );
  }
}

export default Profile;
