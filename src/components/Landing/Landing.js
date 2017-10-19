import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import "./Landing.css"
import { connect } from 'react-redux';
import { getListings, getCurrentUser, clearListings } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      input: ""
    }
  }

  componentDidMount () {
    this.props.clearListings() // resets Listing on redux state
    this.props.getCurrentUser()
  }

  render() {
    const { getListings } = this.props;
    return (
      <div className="Landing">
        <Nav header='Welcome' />
        <div className="background-img-container">
          <div className="input-bar-title"><h2>Find Vegan & Vegetarian near...</h2></div>
          <input className="input-bar" type="text" value={this.state.input} onChange={(e) => { this.setState({ input: e.target.value }) }}  placeholder="Enter city" />
          <Link to='/listing'>
          <button onClick={() => { getListings(this.state.input) }}>Submit</button>
          </Link>
          <div className="description-container">
            <h3>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </h3>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state) return {};
  return {
    listings: state.listings
  }
}

export default connect(mapStateToProps, { getListings, getCurrentUser, clearListings})(Landing);
