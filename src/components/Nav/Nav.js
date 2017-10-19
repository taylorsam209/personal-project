import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import { getCurrentUser } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Nav extends Component {

    handleLogin() {
        if (!this.props.user) {
            return <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
        } else
            return (
                <div className="login-container">
                    <Link to="/profile" ><button>Profile</button></Link>
                    <a href={'http://localhost:3010/auth/logout'}><button>Logout</button></a>
                </div>
            )
    }

    render() {
        let { header } = this.props;

        return (
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
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }

}

export default connect(mapStateToProps, { getCurrentUser })(Nav);