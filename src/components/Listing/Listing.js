import React, { Component } from 'react';
import './Listing.css';
import {Route,Link} from 'react-router-dom';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux'; 


class Listing extends Component {
  render() {

    console.log(this.props.listings)
    return (
      <div className="Listing">
          <Nav header ="Listing"/>
          <h1> Listing Component</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return{
        listings: state.listings
    }
}

export default connect(mapStateToProps)(Listing);
