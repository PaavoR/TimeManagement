import React, { Component } from "react";
import "../../styles/results.scss";
import TaskService from "../../services/TaskService";
import Task from "../task";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: undefined
    };
    this.TaskService = new TaskService();
    this.componentWillMount = this.componentDidMount.bind(this);
  }
  async componentDidMount() {
    try {
      const tasks = await this.TaskService.getUserTasks();
      this.setState({ ...this.state, results: tasks });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Tulokset</h1>
        <Tabs>
          <TabList>
            <Tab>Tänään</Tab>
            <Tab>Tämä viikko</Tab>
            <Tab>Tämä kuukausi</Tab>
            <Tab>Koko historia</Tab>
          </TabList>

          <TabPanel>
            <h2>Tänään content</h2>
          </TabPanel>
          <TabPanel>
            <h2>Viikko content</h2>
          </TabPanel>
          <TabPanel>
            <h2>Kuukausi content</h2>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Results;
