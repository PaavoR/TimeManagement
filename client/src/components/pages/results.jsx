import React, { Component } from "react";
import "../../styles/results.scss";
import TaskService from "../../services/TaskService";
import Task from "../task";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ResultTab from "../resultTab";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
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
    let today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    let weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    let monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0, 0, 0, 0);
    let results = this.state.results;
    return (
      <div className="container">
        <h1>Tulokset</h1>
        <Tabs>
          <TabList>
            <Tab>Avoimet tehtävät</Tab>
            <Tab>Suljetut tehtävät</Tab>
          </TabList>

          <TabPanel>
            <h2>Avoimet tehtävät</h2>
            {this.state.results
              .filter(res => res.active == true)
              .map((value, index) => {
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
          </TabPanel>
          <TabPanel>
            <Tabs>
              <TabList>
                <Tab>Tänään</Tab>
                <Tab>Viikko</Tab>
                <Tab>Kuukausi</Tab>
                <Tab>Koko historia</Tab>
              </TabList>
              <TabPanel>
                <ResultTab from={today} />
              </TabPanel>
              <TabPanel>
                <ResultTab from={weekAgo} />
              </TabPanel>
              <TabPanel>
                <ResultTab from={monthAgo} />
              </TabPanel>
              <TabPanel>
                <p>Koko historia tänne</p>
                <ResultTab from={0} />
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Results;
