import React, { Component } from "react";
import "../../styles/form.scss";
import { setToStorage } from  "../../functions/storage";

class Login extends Component {
  handleClick() {
    this.props.onLogin("time");
    setToStorage("loggedIn", "true");
  }

  render() {
    return (
      <div className="login">
        <h1>Kirjaudu</h1>
        <form>
          <input type="text" className="text" placeholder="Sähköpostiosoite" />
          <input type="password" className="text" placeholder="Salasana" />
          <input type="button" className="submit" value="Kirjaudu" onClick={this.handleClick.bind(this)}/>
        </form>
        <a href="/register">Tarvitsetko tunnuksen? Rekisteröidy</a>
      </div>
    );
  }
}

export default Login;
