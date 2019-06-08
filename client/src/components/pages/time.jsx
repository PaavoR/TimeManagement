import React, { Component } from "react";
import "../../styles/time.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature, faClock } from "@fortawesome/free-solid-svg-icons";

class Time extends Component {
    render() {
        return (
            <div className="time">
                <h1>Ajanotto / Kirjaus</h1>
                <div className="icons">
                    <a href="/log-time">
                        <div className="icon log">
                            <FontAwesomeIcon icon={faFileSignature} />
                            <h2>Kirjaa aika</h2>
                        </div>
                    </a>
                    <a href="/take-time">
                        <div className="icon timer">
                            <FontAwesomeIcon icon={faClock} />
                            <h2>Aloita ajanotto</h2>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Time;