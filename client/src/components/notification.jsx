import React, { Component } from 'react';
import '../styles/notification.css';

class Notification extends Component {
    render(){
        return(
            <div className={"notification success " + this.props.showNotification}>Rekisteröiminen onnistui</div>
        );
    }
}

export default Notification;