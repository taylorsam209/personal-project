import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";

class Nav extends Component {

    render() {
        let { header } = this.props;
        return (
            <div className="header-parent">
                <div className="header-container">
                    <div className="header-child-left">
                        <span className="header-helo">Helo</span>
                    </div>
                    <div className="header-child-mid">
                        <span className="header-word">{header}</span>
                    </div>
                    <div className="header-child-right">
                        <Link to="/">
                            <div className="search-btn"> <h3>Search</h3></div>
                        </Link>
                        <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
                    </div>
                </div>

            </div>
        )
    }
}

export default Nav;