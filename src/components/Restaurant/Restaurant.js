import React, { Component } from 'react';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addFavRestaurant } from '../../ducks/reducer';
import 'font-awesome/css/font-awesome.min.css';


let auto;
const timer = 4000;

class Restaurant extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      direction: "forward"
    }
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  componentDidMount() {
    auto = setInterval(_ => { this.goForward() }, timer)
  }

  resetInterval() {
    clearInterval(auto);
    auto = setInterval(_ => { this.goForward() }, timer);
  }

  goBack() {
    this.resetInterval();
    let { counter, direction } = this.state;
    let { photos } = this.props.currentRestaurant;
    if (counter === 0) counter = photos.length - 1;
    else counter--;
    this.setState({ counter, direction: 'back' })
  }

  goForward() {
    if (!this.props.currentRestaurant.photos) {
      return
    }
    this.resetInterval();
    let { counter, direction } = this.state;
    let { photos } = this.props.currentRestaurant;
    if (counter >= photos.length - 1) counter = 0;
    else counter++;
    this.setState({ counter, direction: 'forward' })
  }

  imgStyle(img, index) {
    const { counter, direction } = this.state;
    const { photos } = this.props.currentRestaurant;
    const backgroundImage = `url(${img})`;

    const left = (
      index === counter - 1 || counter === 0 && index === photos.length - 1 ? '-700px'
        : index === counter ? '0px'
          : '700px'
    )

    const zIndex = (
      left === '700px' && direction === 'forward' ? 1
        : left === '-700px' && direction === 'back' ? 1
          : 2
    )
    return { backgroundImage, left, zIndex };
  };

  render() {
      console.log(this.props.currentRestaurant)
    
    const { id, name, price, rating, url, display_phone, photos, review_count } = this.props.currentRestaurant;
    // const { display_address } = this.props.currentRestaurant.location;
    return (
      <div className="Restaurant">
        <Nav header={name} />
          <div className="photo-container">
            <div className="carousel-btn" onClick={this.goBack}>{"<"}</div>

            <div className="carousel-container">
              {photos ? photos.map((img, i) => {
                return <div className="image" key={i} style={this.imgStyle(img, i)}></div>
              }) : <div className="spinner"></div>}
            </div>
            <div className="carousel-btn" onClick={this.goForward}>{">"}</div>
          </div>
          <div className="restaurant-description-container">
            <h1>Price range: {price}</h1>
            <h1>Yelp rating based on {review_count} reviews: {rating}</h1>
            <h1>Phone: {display_phone}</h1>
            <a target="_blank" href={url} style={{textDecoration: "none"}}><div className='yelp-btn'><i className="fa fa-yelp" aria-hidden="true"></i>
Check out their Yelp Page!</div></a>
          <div className="add-restaurant-btn" onClick={() => { this.props.addFavRestaurant(this.props.user.id, id) }}>Save Restaurant</div>
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

export default connect(mapStateToProps, { addFavRestaurant })(Restaurant);
