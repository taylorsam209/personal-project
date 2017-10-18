import React, { Component } from 'react';
import './Profile.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {addCurrentRestaurant, clearRestaurant} from "../../ducks/reducer";


class Profile extends Component {
  constructor() {
    super();

    this.state = {
      favListing: []
    }
  }

  deleteFavRestaurant() {
    axios.get(`/api/deletefavrestaurant/?userId=${this.props.user.id}&restaurantId=`)
  }

  componentDidMount() {
    axios.get(`/api/getfavlisting/${this.props.user.id}`)
      .then(response => {
        this.setState({
          favListing: response.data
        })
      });
      this.props.clearRestaurant();
  }

  render() {
    console.log("This is Profile Component", this.state.favListing)
    const { id, user_name, email, img } = this.props.user;
    return (
      <div className="Profile">
        <Nav header="Profile" />
        <h1>{user_name}</h1>
        <img src={img} alt="profile" />
        <div className="content-container">
          <div className='left-content-container'>
          </div>
          <div className="right-content-container">
            {this.state.favListing.map((e, i, arr) => {
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
                      <button className="add-listing-btn">Delete Restaurant</button>
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {addCurrentRestaurant, clearRestaurant})(Profile);
