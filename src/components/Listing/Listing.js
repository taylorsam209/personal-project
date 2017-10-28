import React, { Component } from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addCurrentRestaurant, addFavRestaurant, clearRestaurant } from '../../ducks/reducer';

class Listing extends Component {

  render() {
    console.log(this.props.listings)
    return (
      <div className="Listing">
        <Nav header="- Results -" />
        {/* <div className="content-container"> */}
        {/* <div className='left-content-container'>
          </div> */}
        <div className="right-content-container">
          {this.props.listings.map((e, i, arr) => {
            return (
              <div key={i} className="listing-container">
                <img className="listing-photo" src={e.image_url} alt="none available" />
                <div className="listing-description-container">
                  <Link style={{ textDecoration: "none" }} to={`/restaurant/${e.id}`}>
                    <h2 className='restaurant-title' onClick={() => {
                      if (this.props.currentRestaurant.id !== e.id) {
                        this.props.clearRestaurant()
                      }
                      this.props.addCurrentRestaurant(e.id)
                    }}>{e.name}</h2>
                  </Link>
                  <h4>{e.location.display_address[0] + ' ' + e.location.display_address[1]} </h4>
                  <h4>Price range: {e.price} </h4>
                  <h4> Yelp rating: {e.rating} </h4>
                </div>
                <div className="add-listing-button" onClick={() => { this.props.addFavRestaurant(this.props.user.id, e.id) }}>Save</div>
              </div>
            )
          })}

        </div>
        {/* </div> */}
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

export default connect(mapStateToProps, { addCurrentRestaurant, addFavRestaurant, clearRestaurant })(Listing);
