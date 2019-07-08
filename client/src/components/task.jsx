import React, { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3>Aloitusaika: {this.props.from}</h3>
        <h3>Lopetusaika: {this.props.to}</h3>
        <p>Kuvaus: </p> <br />
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Task;
