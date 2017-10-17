import React, { Component } from 'react';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';



class Restaurant extends Component {
  render() {
    console.log(this.props.currentRestaurant)
    const { name, image_url, price, rating, url } = this.props.currentRestaurant;
    return (
      <div className="Restaurant">
        <Nav header="Restaurant" />
        <h1>{name}</h1>
        <div className="listing-container">
          <div className="listing-photo-container">
            <img key src={image_url} alt="restaurant" />
          </div>
          <div className="listing-description-container">
            Price: {price}
            Yelp Rating: {rating}
            <a target="_blank" href={url}>Check out their Yelp Page!</a>
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
