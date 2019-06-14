import React, { Component } from "react";
import "../../styles/log-time.scss";
import "../../services/TaskService";
import TaskService from "../../services/TaskService";

class LogTime extends Component {
  constructor(props) {
    super(props);
    this.TaskService = new TaskService();
  }

  render() {
    return (
      <div className="container log-time">
        <h1>Kirjaa aika</h1>
        <form>
          <input type="date" placeholder="Aloituspäivä" className="small" />
          <input type="date" placeholder="Lopetuspäivä" className="small" />
          <input type="date" placeholder="Aloitusaika" className="small" />
          <input type="date" placeholder="Lopetusaika" className="small" />
          <input type="text" placeholder="Kesto" />
          <select>
            <option>Työaika</option>
            <option>Vapaa-aika</option>
            <option>Harrastus</option>
          </select>
          <textarea type="text" placeholder="Kuvaus" />
          <input type="submit" value="Tallenna" className="submit" />
        </form>
      </div>
    );
  }
}

export default LogTime;
