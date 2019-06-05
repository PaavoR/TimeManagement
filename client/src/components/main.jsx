import React, { Component } from 'react';
import '../styles/main.css';
import "typeface-open-sans";

import Notification from './notification';
import Register from './register';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            registerSuccessful: false,
            showNotification: false
        }
    }

    handleRegister(data, message){
        console.log(data, message);
        this.setState({ registerSuccessful: true });
        this.setState({ showNotification: true });
        setTimeout(function(){
            this.setState({ showNotification: false });
        }.bind(this),3000);
    }

    render(){
        return(
            <div>
                <Notification showNotification={this.state.showNotification}/>
                <Register onRegister={this.handleRegister.bind(this)} />
            </div>
        );
    }
}

export default Main;