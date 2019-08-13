import React, { Component } from "react";
import TaskService from "../services/TaskService";
import Task from "./task";
import { dateFormat } from "../functions/dateFormat";

import { Chart } from "react-google-charts";

function formatDate(date) {
  return date.toString();
}

function durationInMinutes(date1, date2) {
  const diff = Math.abs(new Date(date1) - new Date(date2));
  const minutes = Math.floor(diff / 1000 / 60);
  return minutes;
}

class ResultTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskTypes: []
    };
    this.TaskService = new TaskService();
  }

  async componentDidMount() {
    const params = { from: this.props.from };
    const tasks = await this.TaskService.getUserTasks(params);
    const closedTasks = tasks.filter(res => res.active == false);

    const taskTypes = await this.TaskService.getTaskTypes();
    this.setState({ tasks: closedTasks, taskTypes: taskTypes.data });
  }

  render() {
    let chartData = [];
    let chartData2 = [];
    chartData2.push([
      { type: "string", id: "TaskType" },
      { type: "string", id: "TaskDesc" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" }
    ]);
    chartData.push(["Task", "Hours"]);
    const taskTypes = this.state.taskTypes;
    const tasks = this.state.tasks;
    taskTypes.map(type => chartData.push([type.name, 0]));
    tasks.map(task => {
      const taskType = task.taskType.name;
      const idx = chartData.findIndex(Type => Type[0] == taskType);
      chartData[idx][1] += durationInMinutes(task.from, task.to);
      // chartdata2
      chartData2.push([
        task.taskType.name,
        task.description,
        new Date(task.from),
        new Date(task.to)
      ]);
    });

    return (
      <div>
        {this.state.tasks.length != 0 && (
          <div>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                title: "Tulosten jakauma minuuteissa"
              }}
              rootProps={{ "data-testid": "1" }}
            />
            <Chart
              width={"100%"}
              height={"200px"}
              chartType="Timeline"
              loader={<div>Loading Chart</div>}
              data={chartData2}
              rootProps={{ "data-testid": "3" }}
            />
          </div>
        )}

        <p>{dateFormat(this.props.from)} jälkeen olleet:</p>
        {this.state.tasks.map((value, index) => {
          return (
            <Task
              key={value._id}
              id={value._id}
              from={value.from}
              to={value.to}
              description={value.description}
              taskType={value.taskType._id}
            />
          );
        })}
      </div>
    );
  }
}

export default ResultTab;
