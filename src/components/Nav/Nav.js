import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import { getCurrentUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import logo from "../../assets/greenfork.jpg";
import vegan from "../../assets/vegan.png";

class Nav extends Component {

    handleLogin() {
        if (!this.props.user) {
            return <a className="no-underline" href={process.env.REACT_APP_LOGIN}><div className="btn">Login</div></a>
        } else
            return (
                <div className="login-container">
                    <Link className="no-underline" to="/profile"><div className="btn">Profile</div></Link>
                    <a className="no-underline" href={'http://localhost:3010/auth/logout'}><div className="btn">Logout</div></a>
                </div>
            )
    }

    render() {
        let { header } = this.props;

        return (
            <div>
                <img className="logo" src={logo} alt="fork" />
                <div className="header-parent">
                    <div className="header-container">
                        <div className="header-child-left">
                            <Link to="/" className="header-logo" >The Green Fork</Link>
                        </div>
                        <div className="header-child-mid">
                            <span className="header-word">{header}</span>
                        </div>
                        <div className="header-child-right">
                            {this.handleLogin.bind(this)()}
                        </div>
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