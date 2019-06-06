import React, { Component } from 'react';
import '../styles/form.css';

class Login extends Component {
    render(){
        return(
            <div className="login">
                <h1>Kirjaudu</h1>
                <form>
                    <input type="text" className="text" placeholder="Sähköpostiosoite" />
                    <input type="password" className="text" placeholder="Salasana" />
                    <input type="submit" className="submit" value="Kirjaudu" />
                </form>
                <a href="/register">Tarvitsetko tunnuksen? Rekisteröidy</a>
            </div>
        );
    }
}

export default Login;