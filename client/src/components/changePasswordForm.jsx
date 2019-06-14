import React, { Component } from "react";
import Notification from "./notification";
import UserService from "../services/UserService";
import "../styles/form.scss";
class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        old_password: "",
        old_password2: "",
        new_password: ""
      },
      notification: {
        text: "",
        show: "false",
        type: "fail"
      }
    };
    this.UserService = new UserService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
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
      const result = await this.UserService.changePassword(this.state.formData);
      console.log(result.status);
      if (result.status == 200) {
        let message = "Salasanan vaihto onnistui!";
        this.setState({
          notification: {
            show: "true",
            text: message,
            type: "success"
          }
        });
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
      }
      setTimeout(this.hideNotification, 4000);
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
          text: message,
          type: "fail"
        }
      });
      setTimeout(this.hideNotification, 4000);
    }
  }
  render() {
    return (
      <div className="changepasswordForm">
        <h1>Vaihda Salasana</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="password"
            className="text"
            placeholder="Vanha Salasana"
            name="old_password"
            value={this.state.formData.old_password}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            className="text"
            placeholder="Vanha salasana uudelleen"
            name="old_password2"
            value={this.state.formData.old_password2}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            className="text"
            placeholder="Salasana"
            name="new_password"
            value={this.state.formData.new_password}
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="Submit" className="submit" />
        </form>
        <Notification
          showNotification={this.state.notification.show}
          text={this.state.notification.text}
          type={this.state.type}
        />
      </div>
    );
  }
}

export default ChangePasswordForm;
