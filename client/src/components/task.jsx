import React, { Component } from "react";
import TaskService from "../services/TaskService";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: undefined,
      id: this.props.id,
      show: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.TaskService = new TaskService();
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
      this.state.show = false;
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <h3>Aloitusaika: {this.props.from}</h3>
        {this.props.to && <h3>Lopetusaika: {this.props.to}</h3>}
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
      </div>
    );
  }
}

export default Task;
