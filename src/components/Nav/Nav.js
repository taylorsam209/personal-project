import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import { getCurrentUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import logo from '../../assets/globe.svg';

class Nav extends Component {

    handleLogin() {
        if (!this.props.user) {
            return <a style={{ textDecoration: "none" }} href={process.env.REACT_APP_LOGIN}><div className="btn">Login</div></a>
        } else
            return (
                <div className="logged-in-container">
                    <Link style={{ textDecoration: "none" }} to="/profile"><div className="btn">Profile</div></Link>
                    <a style={{ textDecoration: "none" }} href={process.env.REACT_APP_LOGOUT}><div className="btn">Logout</div></a>
                </div>
            )
    }

    render() {
        let { header } = this.props;

        return (
            <div>
                <div className="header-parent">
                    <div className="header-child-left">
                        <Link to="/" className="logo-container" ><img className="logo" src={logo} alt="globe" />Vegan Eats</Link>
                    </div>
                    <div className="header-child-mid">
                        <span className="header-title">{header}</span>
                    </div>
                    <div className="header-child-right">
                        {this.handleLogin.bind(this)()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }

}

export default connect(mapStateToProps, { getCurrentUser })(Nav);