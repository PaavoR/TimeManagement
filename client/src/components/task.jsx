import React, { Component } from "react";
import TaskService from "../services/TaskService";
import { dateFormat } from "../functions/dateFormat";
import Notification from "./notification";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: undefined,
      id: this.props.id,
      show: true,
      notification: {
        text: "",
        show: "false",
        type: "fail"
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.TaskService = new TaskService();
    this.hideNotification = this.hideNotification.bind(this);
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

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const id = target.id;
    this.setState({ ...this.state, to: value, id: id });
  }
  async handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { to: this.state.to, active: "false" };
      const task = await this.TaskService.editTask(body, this.state.id);
      this.setState({ ...this.state, show: false });
    } catch (error) {
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
      <div>
        <h3>Aloitusaika: {dateFormat(this.props.from)}</h3>
        {(this.state.to || this.props.to) && (
          <h3>Lopetusaika: {dateFormat(this.state.to || this.props.to)}</h3>
        )}
        <p>Kuvaus: </p>
        <p>{this.props.description}</p>
        {!this.props.to && this.state.show && (
          <div>
            <p>Lisää lopetusajankohta:</p>
            <form onSubmit={this.handleSubmit}>
              <input
                type="datetime-local"
                id={this.props.id}
                name="to"
                required={true}
                onChange={this.handleChange}
              />
              <input type="submit" value="Tallenna" className="submit" />
            </form>
          </div>
        )}
        <Notification
          showNotification={this.state.notification.show}
          text={this.state.notification.text}
          type={this.state.notification.type}
        />
      </div>
    );
  }
}

export default Task;
