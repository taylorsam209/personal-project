import React, { Component } from 'react';
import './Profile.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { addCurrentRestaurant, clearRestaurant, getReviews, clearReviews } from "../../ducks/reducer";


class Profile extends Component {
  constructor() {
    super();

    this.state = {
      favListing: []
    }

    this.deleteFavRestaurant.bind(this);
    this.insertAddress.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/getfavlisting/${this.props.user.id}`)
      .then(response => {
        this.setState({
          favListing: response.data
        })
      });
  }

  deleteFavRestaurant(id, restaurant) {
    axios.delete(`/api/deletefavrestaurant/?userId=${id}&restaurantId=${restaurant}`)
      .then(response => {
        this.setState({
          favListing: response.data
        })
      })
  }

  insertAddress(e) {
    if (e.location.display_address[2]) {
      return e.location.display_address[0] + ' ' + e.location.display_address[1] + ' ' + e.location.display_address[2];
    }
    else return e.location.display_address[0] + ' ' + e.location.display_address[1];
  }

  handleGetRestaurant(e) {
    if (this.props.currentRestaurant.id !== e.id) {
      this.props.clearRestaurant(),
        this.props.clearReviews()
    }
    this.props.addCurrentRestaurant(e.id),
      this.props.getReviews(e.id)
  }


  render() {
    console.log("This is Profile Component", this.state.favListing)
    const { id, user_name, img } = this.props.user;
    return (
      <div className="Profile">
        <Nav header="Profile" />
        <div className="profile-parent-container">
          <div className='left-profile-container'>
            <h1 style={{marginTop:"0", paddingTop:"80px"}}> Hello! </h1>
            <div className="profile-pic-container">
              <img className="profile-pic" src={img} alt="profile" />
            </div>
            <h1>{user_name}</h1>
          </div>
          <div className="right-favorite-container">
            <div className="favorite-title">Favorite Listings</div>
            <div className="favorite-content">
              {this.state.favListing.map((e, i, arr) => {
                return (
                  <div key={i} className="listing-container">
                    <Link className="profile-listing-photo-container" to={`/restaurant/${e.id}`}>
                      <img className="profile-listing-photo" src={e.image_url} alt="restaurant"
                        onClick={() => this.handleGetRestaurant(e)}/>
                    </Link>
                    <div className="listing-description-container">
                      <Link style={{ textDecoration: "none" }} to={`/restaurant/${e.id}`}>
                        <h3 className="restaurant-title"
                          onClick={() => this.handleGetRestaurant(e)}>{e.name}</h3>
                      </Link>
                      <h4>{this.insertAddress(e)} </h4>
                      <h4>Price range: {e.price} </h4>
                      <h4> Yelp rating: {e.rating} </h4>
                    </div>
                    <div className="delete-listing-btn" onClick={() => { this.deleteFavRestaurant(id, e.id) }} >Delete</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    currentRestaurant: state.currentRestaurant
  }
}

export default connect(mapStateToProps, { addCurrentRestaurant, clearRestaurant, getReviews, clearReviews })(Profile);
