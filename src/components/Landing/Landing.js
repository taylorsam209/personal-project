import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import "./Landing.css";
import { connect } from 'react-redux';
import { getListings, getCurrentUser, clearListings } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import hotpot from '../../assets/hotpot.mp4';

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      input: ""
    }
  }

  componentDidMount() {
    // this.props.clearListings() // resets Listing on redux state
    this.props.getCurrentUser()
  }

  render() {
    const { getListings } = this.props;
    return (
      <div className="Landing">
          <Nav header='Welcome'/>
        <div className="video-container">
          <div className="video-overlay">
            <div className="search-container">
              <input className="input-bar" type="text" value={this.state.input} onChange={(e) => { this.setState({ input: e.target.value }) }} placeholder="Find Vegan & Vegetarian near..." />
              <Link to='/listing' className="submit-btn" onClick={() => {if(this.props.listings !== getListings(this.state.input)){this.props.clearListings()} getListings(this.state.input) }}>Submit</Link>
            </div>
            <div className="description-container">
              <h3> The Green Fork was created to allow you to locate vegeterian and vegan friendly resources within the community.
              We took the hardwork out of your hands and let you focus on having a variety of choices. Give it a try, begin your search!
                </h3>
            </div>
          </div>
          <video autoPlay loop>
            <source src={hotpot} type="video/mp4" />.
             </video>

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

export default connect(mapStateToProps, { getListings, getCurrentUser, clearListings })(Landing);
