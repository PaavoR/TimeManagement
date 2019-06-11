import React, { Component } from "react";
import "../../styles/profile.scss";
import ProfileInformation from "../profileInformation";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <h1>Profiili</h1>
        <ProfileInformation />
      </div>
    );
  }
}

export default Profile;
