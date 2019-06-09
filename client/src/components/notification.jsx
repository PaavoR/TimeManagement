import React, { Component } from "react";
import "../styles/notification.scss";

class Notification extends Component {
  render() {
    return (
      <div
        className={
          "notification " + this.props.showNotification + " " + this.props.type
        }
      >
        {this.props.text}
      </div>
    );
  }
}

export default Notification;
