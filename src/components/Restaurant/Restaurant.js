import React, { Component } from 'react';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';



class Restaurant extends Component {
  render() {
    const { currentRestaurant } = this.props;
    return (
      <div className="Restaurant">
        <Nav header="Restaurant" />
        <h1>{currentRestaurant.name}</h1>
        <div className="listing-container">
          <div className="listing-photo-container">
            <img key src={currentRestaurant.image_url} alt="restaurant" />
          </div>
          <div className="listing-description-container">
            Price: {currentRestaurant.price}
            Yelp Rating: {currentRestaurant.rating}
            <a target="_blank" href={currentRestaurant.url}>Check out their Yelp Page!</a>
          </div>
          <button className="add-listing-btn">Save Restaurant</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRestaurant: state.currentRestaurant
  }
}

export default connect(mapStateToProps)(Restaurant);
