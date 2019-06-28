import React, { Component } from "react";
import Select from "react-dropdown-select";

import "../../styles/log-time.scss";

import Notification from "../notification";

import TaskService from "../../services/TaskService";

class LogTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTypes: {},
      formData: {
        taskType: "",
        fromDate: "",
        active: false,
        toDate: undefined,
        description: ""
      },
      notification: {
        text: "",
        show: "false"
      }
    };
    this.TaskService = new TaskService();
    this.onChangeTaskType = this.onChangeTaskType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      const types = await this.TaskService.getTaskTypes();
      this.setState({ ...this.state, taskTypes: types });
    } catch (err) {
      console.log(err);
    }
  }

  onChangeTaskType(value) {
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, taskType: value }
    });
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    let value = 0;
    if (target.type === "checkbox") {
      value = target.checked;
      if (value) {
        console.log("tultiin");
        this.setState({
          ...this.state,
          formData: { ...this.state.formData, toDate: "" }
        });
      }
    } else {
      value = target.value;
    }
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
      let newTask = this.state.formData;
      newTask.taskType = newTask.taskType._id;
      newTask.from = newTask.fromDate;
      newTask.to = newTask.toDate;
      if (newTask.active) {
        newTask.to = undefined;
      }
      console.log(newTask);
      const task = await this.TaskService.addNewTask(newTask);
    } catch (error) {
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
      <div className="container log-time">
        <h1>Kirjaa aika</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fromDate">Alkuaika: </label> <br />
          <input
            type="datetime-local"
            id="fromDate"
            required
            name="fromDate"
            value={this.state.formData.fromDate}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="checkbox"
            name="active"
            checked={this.state.formData.active}
            onChange={this.handleChange}
            id="checkbox"
          />
          <label htmlFor="checkbox">Aktiivinen </label>
          <br />
          <label htmlFor="toDate">Loppuaika: </label> <br />
          <input
            type="datetime-local"
            id="toDate"
            name="toDate"
            disabled={this.state.formData.active}
            required={!this.state.formData.active}
            onChange={this.handleChange}
          />{" "}
          <br />
          <Select
            name="taskType"
            options={this.state.taskTypes}
            labelField="name"
            valueField="_id"
            onChange={value => this.onChangeTaskType(value[0])}
          />
          <textarea
            type="text"
            placeholder="Kuvaus"
            name="description"
            onChange={this.handleChange}
          />
          <input type="submit" value="Tallenna" className="submit" />
        </form>
        <Notification
          showNotification={this.state.notification.show}
          text={this.state.notification.text}
          type="fail"
        />
      </div>
    );
  }
}

export default LogTime;
