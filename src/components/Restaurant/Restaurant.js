import React, { Component } from 'react';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addFavRestaurant } from '../../ducks/reducer';
import 'font-awesome/css/font-awesome.min.css';
import Carousel from "../Carousel/Carousel";
import Map from "../Map/Map"

class Restaurant extends Component {
 
  render() {
    const { id, name, price, rating, url, display_phone, review_count} = this.props.currentRestaurant;
    console.log("whole", this.props.currentRestaurant);

    return (
      <div className="Restaurant">
        <Nav header='Details' />
          <h1>{name}</h1>
        <Carousel />
        <div className="restaurant-description-container">
          <h1>Price range: {price}</h1>
          <h1>Review Count: {review_count}</h1>
          <h1>Rating: {rating}</h1>
          <h1>Phone: {display_phone}</h1>
          <a target="_blank" href={url} style={{ textDecoration: "none" }}><div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>
            Yelp Page!</div></a>
          <div className="add-restaurant-btn" onClick={() => { this.props.addFavRestaurant(this.props.user.id, id) }}>Save</div>
        </div>
        <Map />
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

export default connect(mapStateToProps, { addFavRestaurant })(Restaurant);
