import React, { Component } from 'react';
import './Profile.css';
import {Route,Link} from 'react-router-dom';
import Nav from '../Nav/Nav';


class Profile extends Component {
  render() {
    return (
      <div className="Profile">
          <Nav header ="Profile"/>
          <h1> Profile Component</h1>
      </div>
    );
  }
}

export default Profile;
