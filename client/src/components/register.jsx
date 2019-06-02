import React, { Component } from 'react';
import '../styles/register.css';

class Register extends Component {
    getSuccess(){
        return true;
    }

    render(){
        return(
            <div className="register">
                <h1>Rekisteröidy</h1>
                <form>
                    <input type="text" placeholder="Sähköpostiosoite" className="text" />
                    <input type="text" placeholder="Nimi" className="text" />
                    <input type="password" placeholder="Salasana" className="text" />
                    <input type="password" placeholder="Salasana uudelleen" className="text" />
                    <input type="button" value="Rekisteröidy" className="submit" onClick={() => this.props.onRegister(this.getSuccess())}/>
                </form>
            </div>
        );
    }
}

export default Register;