import React, { Component } from "react";
import Select from "react-dropdown-select";
import Notification from "../notification";
import TaskService from "../../services/TaskService";

class TakeTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTypes: {},
      formData: {
        from: new Date(Date.now()),
        taskType: "",
        active: true,
        description: ""
      },
      notification: {
        text: "",
        show: "false",
        type: "fail"
      }
    };
    this.TaskService = new TaskService();
    this.onChangeTaskType = this.onChangeTaskType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }
  async componentDidMount() {
    try {
      const types = await this.TaskService.getTaskTypes();
      console.log("types: ", types);
      this.setState({ ...this.state, taskTypes: types.data });
    } catch (err) {
      console.log(err);
    }
  }
  onChangeTaskType(value) {
    console.log(value);
    let ids = value.map(a => a._id);
    this.setState({
      ...this.state,
      formData: { ...this.state.formData, taskType: ids[0] }
    });
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

  async handleSubmit(e) {
    e.preventDefault();
    try {
      let newTask = this.state.formData;
      console.log(newTask);
      const task = await this.TaskService.addNewTask(newTask);
      if (task.status == 200) {
        this.setState({
          ...this.state,
          notification: {
            ...this.state.notification,
            show: "true",
            text: "Onnistui!",
            type: "success"
          }
        });
        this.clearForm();
        setTimeout(this.hideNotification, 4000);
      }
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
          text: message,
          type: "fail"
        }
      });
      setTimeout(this.hideNotification, 4000);
    }
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

  clearForm() {
    document.getElementById("form").reset();
  }

  render() {
    return (
      <div className="container take-time">
        <h1>Aloita ajanotto</h1>
        <form onSubmit={this.handleSubmit} id="form">
          <Select
            name="taskType"
            options={this.state.taskTypes}
            labelField="name"
            valueField="_id"
            onChange={value => this.onChangeTaskType(value)}
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
          type={this.state.notification.type}
        />
      </div>
    );
  }
}

export default TakeTime;
