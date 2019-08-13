import React, { Component } from "react";
import TaskService from "../services/TaskService";
import { dateFormat } from "../functions/dateFormat";
import Notification from "./notification";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: this.props.from,
      to: this.props.to || undefined,
      id: this.props.id,
      description: this.props.description,
      taskTypes: [],
      show: true,
      edit: false,
      editButtonLabel: "Muokkaa",
      taskType: this.props.taskType,
      notification: {
        text: "",
        show: "false",
        type: "fail"
      }
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.onChangeTaskType = this.onChangeTaskType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.TaskService = new TaskService();
    this.hideNotification = this.hideNotification.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(e) {
    e.preventDefault();
    try {
      this.TaskService.deleteTask(this.state.id);
      this.setState({ show: false });
      this.setState({
        ...this.state,
        notification: {
          ...this.state.notification,
          show: "true",
          text: "Poisto onnistui!",
          type: "success"
        }
      });
    } catch (error) {
      console.log(error);
      this.setState({
        ...this.state,
        notification: {
          ...this.state.notification,
          show: "true",
          text: "Poisto epäonnistui!",
          type: "fail"
        }
      });
    }
  }

  showEdit(e) {
    e.preventDefault();
    if (!this.state.edit) {
      this.setState({ edit: true });
      this.setState({ editButtonLabel: "Älä muokkaa, virhe" });
    } else {
      this.setState({ edit: false });
      this.setState({ editButtonLabel: "Muokkaa" });
    }
  }

  handleFromChange(date) {
    this.setState({
      from: date
    });
  }
  handleToChange(date) {
    this.setState({
      to: date
    });
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
      taskType: ids[0]
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

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    try {
      let body = {
        to: this.state.to,
        from: this.state.from,
        description: this.state.description,
        taskType: this.state.taskType
      };
      if (this.state.to) {
        body.active = "false";
      }
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
        {this.state.show && (
          <div>
            <h3>Aloitusaika: {dateFormat(this.state.from)}</h3>

            <h3>Lopetusaika: {dateFormat(this.state.to) || ""}</h3>

            <span>Kuvaus: </span>
            <p>{this.state.description}</p>
            <button onClick={this.showEdit}>
              {this.state.editButtonLabel}
            </button>
            <button onClick={this.deleteTask}>Poista</button>
            {this.state.edit && (
              <form onSubmit={this.handleSubmit} id="form">
                <p>Aloitus: </p>
                <DatePicker
                  selected={new Date(this.state.from)}
                  onChange={this.handleFromChange}
                  dateFormat="dd.MM.yyyy, hh:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                />
                <p>Lopetus: </p>
                <DatePicker
                  selected={this.state.to ? new Date(this.state.to) : ""}
                  onChange={this.handleToChange}
                  dateFormat="dd.MM.yyyy, hh:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                />
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
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <input type="submit" value="Tallenna" className="submit" />
              </form>
            )}
            <Notification
              showNotification={this.state.notification.show}
              text={this.state.notification.text}
              type={this.state.notification.type}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Task;
