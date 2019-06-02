import React, { Component } from 'react';
import '../styles/main.css';
import "typeface-open-sans";

import Notification from './notification';
import Register from './register';

class Main extends Component {
    handleNotification(success){
        console.log(success);
    }

    render(){
        return(
            <div>
                <Notification />
                <Register onRegister={this.handleNotification} />
            </div>
        );
    }
}

export default Main;