import React, { Component } from 'react';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import {addFavRestaurant} from '../../ducks/reducer';



class Restaurant extends Component {
  render() {
    console.log(this.props.currentRestaurant)
    const {id, name, image_url, price, rating, url } = this.props.currentRestaurant;
    return (
      <div className="Restaurant">
        <Nav header="Business" />
        <h1>{name}</h1>
        <div className="restaurant-container">
          <div className="listing-photo-container">
            <img key src={image_url} alt="restaurant" />
          </div>
          <div className="listing-description-container">
            Price: {price}
            Yelp Rating: {rating}
            <a target="_blank" href={url}>Check out their Yelp Page!</a>
          </div>
          <button className="add-listing-btn" onClick={()=> {this.props.addFavRestaurant(this.props.user.id, id)}}>Save Restaurant</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRestaurant: state.currentRestaurant,
    user: state.user
  }
}

export default connect(mapStateToProps, {addFavRestaurant})(Restaurant);
