import React, { Component } from "react";
import ProfileService from "../services/ProfileService";

class ProfileInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
    this.ProfileService = new ProfileService();
  }
  async componentDidMount() {
    const data = await this.ProfileService.getUserData();
    const { name, email } = data;
    this.setState({ name: name, email: email });
  }

  render() {
    return (
      <div className="profileInfo">
        <p>Nimi: {this.state.name}</p>
        <p>Sähköposti: {this.state.email}</p>
      </div>
    );
  }
}

export default ProfileInformation;
