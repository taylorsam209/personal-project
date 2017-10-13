import React, { Component } from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addCurrentRestaurant, addFavRestaurant } from '../../ducks/reducer';


class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempListings: this.props.listings
    }
  }

  render() {

    console.log(this.props.listings)
    console.log("thisis listings comp", this.props.userId)
    return (
      <div className="Listing">
        <Nav header="Listing" />
        <h1> Listing Component</h1>
        <div className="content-container">
          <div className='left-content-container'>
          </div>
          <div className="right-content-container">
            {this.props.listings.map((e, arr, i) => {
              return (

                <div className="listing-container">
                  <div className="listing-photo-container">
                    <img key src={e.image_url} alt="restaurant" />
                  </div>
                  <div className="listing-description-container">
                    <Link to={`/restaurant/${e.id}`}><h3 onClick={() => { this.props.addCurrentRestaurant(e.id) }}>{e.name}</h3> </Link>
                    Price: {e.price}
                    Yelp Rating: {e.rating}
                  </div>
                  <button className="add-listing-btn" onClick={() => {this.props.addFavRestaurant(this.props.userId, e.id)}}>Save Restaurant</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    listings: state.listings,
    userId: state.userId
  }
}

export default connect(mapStateToProps, { addCurrentRestaurant, addFavRestaurant })(Listing);
