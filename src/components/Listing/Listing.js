import React, { Component } from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addCurrentRestaurant, addFavRestaurant, clearRestaurant, getReviews, clearReviews } from '../../ducks/reducer';

class Listing extends Component {

  handleGetRestaurant(e){
    if (this.props.currentRestaurant.id !== e.id) {
      this.props.clearRestaurant(),
      this.props.clearReviews()
    }
    this.props.addCurrentRestaurant(e.id),
    this.props.getReviews(e.id)
    }
  

  handleBusinessAddress(e) {
    if (e.location.display_address[2]) {
      return e.location.display_address[0] + ' ' + e.location.display_address[1] + ' ' + e.location.display_address[2];
    }
    else return e.location.display_address[0] + ' ' + e.location.display_address[1];
  }

  handleListing(){
    return this.props.listings.map((e, i, arr) => {
      return (
        
        <div key={i} className="listings-container">
         <Link 
         className="photo-container"
         onClick={() => this.handleGetRestaurant(e)}
              style={{ textDecoration: "none" }}
               to={`/restaurant/${e.id}`}>
          <img  className='listing-photo' src={e.image_url} alt="none available" />
          </Link>
          <div className="listing-description-container">
            <Link 
            onClick={() => this.handleGetRestaurant(e)}
            style={{ textDecoration: "none" }} to={`/restaurant/${e.id}`}>
              <h2 className='restaurant-title' >{e.name}</h2>
            </Link>
            <h4>{this.handleBusinessAddress.bind(this)(e)} </h4>
            <h4>Price range: {e.price} </h4>
            <h4> Yelp rating: {e.rating} </h4>
          </div>
          <div className="add-listing-button" onClick={() => { this.props.addFavRestaurant(this.props.user.id, e.id) }}>Save</div>
        </div>
      )
    })
  }

  render() {
    console.log(this.props.listings)
    
    return (
      <div className="Listing">
        <Nav header="- Results -" />
        {this.props.listings.length ?
        <div className="right-content-container">
          {this.handleListing()}
        </div> : <h1> Gathering results... </h1> }    
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    listings: state.listings,
    user: state.user,
    currentRestaurant: state.currentRestaurant
  }
}

const actions = {
  addCurrentRestaurant, addFavRestaurant, clearRestaurant, getReviews, clearReviews
};

export default connect(mapStateToProps, actions)(Listing);
