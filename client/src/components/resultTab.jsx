import React, { Component } from "react";
import TaskService from "../services/TaskService";
import Task from "./task";

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

  async componentDidMount() {}

  render() {
    return (
      <div>
        <h1>{formatDate(this.props.from)}</h1>
      </div>
    );
  }
}

export default ResultTab;
