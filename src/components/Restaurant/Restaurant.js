import React, { Component } from 'react';
import './Restaurant.css';
import Nav from '../Nav/Nav';
import { connect } from 'react-redux';
import { addFavRestaurant } from '../../ducks/reducer';
import 'font-awesome/css/font-awesome.min.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose"


let auto;
const timer = 4000;

class Restaurant extends Component {
  constructor() {
    super()
    this.state = {
      isMarkerShown: false,
      counter: 1,
      direction: "forward"
    }
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    // this.delayedShowMarkerb= this.delayedShowMarker.bind(this);
    // this.handleMarkerClick= this.handleMarkerClick.bind(this);
  }

   componentDidMount() {
     auto = setInterval(_ => { this.goForward() }, timer)
     this.delayedShowMarker()
  }

   delayedShowMarker = () => {
     setTimeout(() => {
       this.setState({ isMarkerShown: true })
    }, 3000)
  }

   handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
     this.delayedShowMarker()
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
    const { id, name, price, rating, url, display_phone, photos, review_count, coordinates } = this.props.currentRestaurant;
    console.log("coordinates",this.props.currentRestaurant.coordinates);
    console.log("whole",this.props.currentRestaurant);

    const MapWithAMakredInfoWindow = compose(
      withStateHandlers(() => ({
        isOpen: false,
      }), {
          onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
          })
        }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -38.50245621, lng: 176.0944492 }}
      >
        <Marker
          position={{ lat: -38.50245621, lng: 176.0944492 }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
            <p>{name}</p>
          </InfoWindow>}
        </Marker>
      </GoogleMap>
      );

    return (
      <div className="Restaurant">
        <Nav header={name} />
         <div className="photo-container">
          <div className="carousel-btn" onClick={this.goBack}>{"<"}</div>

            <div className="carousel-container">
            {photos ? photos.map((img, i) => {
              return <div className="image" key={i} style={this.imgStyle(img, i)}></div>
            }) : <div><i className="fa fa-cog fa-spin fa-3x fa-fw"></i></div>}
          </div> 
          <div className="carousel-btn" onClick={this.goForward}>{">"}</div>
        </div> 
        <div className="restaurant-description-container">
          <h1>Price range: {price}</h1>
          <h1>Yelp rating based on {review_count} reviews: {rating}</h1>
          <h1>Phone: {display_phone}</h1>
          <a target="_blank" href={url} style={{ textDecoration: "none" }}><div className='yelp-btn'><i className="fa fa-yelp fa-fw" aria-hidden="true"></i>
            Yelp Page!</div></a>
          <div className="add-restaurant-btn" onClick={() => { this.props.addFavRestaurant(this.props.user.id, id) }}>Save</div>
        </div>
         <MapWithAMakredInfoWindow
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /> 
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
