import React, { Component } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addFavRestaurant } from '../../ducks/reducer';
import 'font-awesome/css/font-awesome.min.css';
import Map from "../Map/Map"

class Restaurant extends Component {

  handleReviews() {
    const { reviews } = this.props.reviews;
    if (reviews) {
      return reviews.map((e, i, arr) => {
        console.log(e);
        return (
          <p key={i}>{e.text}</p>
        )
      })
    } else return <p>No reviews</p>
  }

  render() {
    const { id, name, price, rating, url, image_url, display_phone, review_count } = this.props.currentRestaurant;
    const { reviews } = this.props.reviews
    const {currentRestaurant} = this.props;
    return (
      <div className="Restaurant">
        <Nav header='Details' />
        {reviews && currentRestaurant ? <div>
        <h1 className="title">{name}</h1>
        <Card className='restaurant-container'>
          <CardMedia overlay={<CardTitle title={'Rating: ' + rating} subtitle={'Review Count: ' + review_count} />}>
            <img className="card-image" src={image_url || 'https://pixy.org/images/placeholder.png'} alt='' />
          </CardMedia>
          <div className='restaurant-description-container'>
            <p>Price range: {price || 'N/A'}</p>
            <p>Phone: {display_phone || 'N/A'}</p>
            <div className="reviews">
              <h4>Review Excerpts:</h4>
              {this.handleReviews.bind(this)()}
            </div>
            <a target="_blank" href={url} style={{ textDecoration: "none" }}>
              <div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>Yelp Page</div>
            </a>
            <div className="add-restaurant-btn" onClick={() => { this.props.addFavRestaurant(this.props.user.id, id) }}>Save</div>
          </div>
        </Card>
        <Map />
        </div>: null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentRestaurant: state.currentRestaurant,
    user: state.user,
    reviews: state.reviews
  }
}

export default connect(mapStateToProps, { addFavRestaurant })(Restaurant);