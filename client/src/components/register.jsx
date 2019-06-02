import React, { Component } from 'react';
import '../styles/register.css';

class Register extends Component {
    render(){
        return(
            <div className="register">
                <h1>Rekisteröidy</h1>
                <form>
                    <input type="text" placeholder="Sähköpostiosoite" />
                    <input type="text" placeholder="Nimi" />
                    <input type="password" placeholder="Salasana" />
                    <input type="password" placeholder="Salasana uudelleen" />
                    <input type="submit" value="Rekisteröidy" />
                </form>
            </div>
        );
    }
}

export default Register;