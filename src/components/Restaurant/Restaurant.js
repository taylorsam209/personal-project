import React, { Component } from 'react';
import './Restaurant.css';
import {Route,Link} from 'react-router-dom';
import Nav from '../Nav/Nav';


class Restaurant extends Component {
  render() {
    return (
      <div className="Restaurant">
          <Nav header ="Restaurant"/>
          <h1> Restaurant Component</h1>
      </div>
    );
  }
}

export default Restaurant;
