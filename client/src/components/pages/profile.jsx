import React, { Component } from "react";
import "../../styles/profile.scss";
import UserService from "../../services/UserService";
import { Redirect } from "react-router-dom";
import ChangePasswordForm from "../changePasswordForm";

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
        <div className="header">
          <h1>Profiili</h1>
        </div>
        <div className="infobox">
          <p>Nimi: {this.state.name}</p>
          <p>Sähköposti: {this.state.email}</p>
        </div>
        <div className="changePassword">
          <ChangePasswordForm />
        </div>
      </div>
    );
  }
}

export default Profile;
