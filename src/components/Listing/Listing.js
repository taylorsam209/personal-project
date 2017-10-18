import React, { Component } from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addCurrentRestaurant, addFavRestaurant, clearRestaurant } from '../../ducks/reducer';


class Listing extends Component {

  componentDidMount() {
    this.props.clearRestaurant(); // Resets currentRestaurant on redux state
  }
  
  render() {

    console.log(this.props.listings)
    return (
      <div className="Listing">
        <Nav header="Results" />
        <div className="content-container">
          <div className='left-content-container'>
          </div>
          <div className="right-content-container">
            {this.props.listings.map((e, i, arr) => {
              return (
                <div key={i} className="listing-container">
                  <img className="listing-photo" src={e.image_url} alt="restaurant" />
                  <div className="listing-description-container">
                    <Link to={`/restaurant/${e.id}`}><h3 onClick={() => { this.props.addCurrentRestaurant(e.id) }}>{e.name}</h3> </Link>
                    <h4>{e.location.display_address[0] + ' ' + e.location.display_address[1]} </h4>
                    <p>Price: {e.price}
                    Yelp Rating: {e.rating}
                    </p>
                    <div>
                      <button className="add-listing-btn" onClick={() => { this.props.addFavRestaurant(this.props.user.id, e.id) }}>Save Restaurant</button>
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </div>
      </div>
    );}}

function mapStateToProps(state) {
  console.log(state)
  return {
    listings: state.listings,
    user: state.user
  }
}

export default connect(mapStateToProps, { addCurrentRestaurant, addFavRestaurant, clearRestaurant })(Listing);
