import React, { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: undefined,
      id: this.props.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const id = target.id;
    this.setState({ ...this.state, to: value, id: id });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <h3>Aloitusaika: {this.props.from}</h3>
        {this.props.to && <h3>Lopetusaika: {this.props.to}</h3>}
        <p>Kuvaus: </p>
        <p>{this.props.description}</p>
        {!this.props.to && (
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
