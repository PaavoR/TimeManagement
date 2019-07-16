import React, { Component } from "react";
import TaskService from "../services/TaskService";
import Task from "./task";
import { dateFormat } from "../functions/dateFormat";

function formatDate(date) {
  return date.toString();
}

class ResultTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.TaskService = new TaskService();
  }

  async componentDidMount() {
    const params = { from: this.props.from };
    const tasks = await this.TaskService.getUserTasks(params);
    const closedTasks = tasks.filter(res => res.active == false);
    this.setState({ tasks: closedTasks });
  }

  render() {
    return (
      <div>
        <p>{dateFormat(this.props.from)} jälkeen olleet:</p>
        {this.state.tasks.map((value, index) => {
          return (
            <Task
              key={value._id}
              id={value._id}
              from={value.from}
              to={value.to}
              description={value.description}
            />
          );
        })}
      </div>
    );
  }
}

export default ResultTab;
