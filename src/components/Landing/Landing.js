import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import "./Landing.css";
import { connect } from 'react-redux';
import { getListings, getCurrentUser, clearListings } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import hotpot from '../../assets/hotpot.mp4';
import vegan2 from "../../assets/vegan2.jpg";
import freshveggie from "../../assets/fresh-veggies.jpeg";
import mexicana from "../../assets/mexicana.png";
import miso from "../../assets/miso.jpg";
import pho from "../../assets/pho.jpg";

let auto;
const timer = 4000;

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      input: "",
      pictures: [vegan2, freshveggie, mexicana, miso, pho],
      counter: 1,
      direction: "forward"
    }

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  componentDidMount() {
    // this.props.clearListings() // resets Listing on redux state
    this.props.getCurrentUser();
    auto = setInterval(_ => { this.goForward() }, timer)
  }

  resetInterval() {
    clearInterval(auto);
    auto = setInterval(_ => { this.goForward() }, timer);
  }

  goBack() {
    this.resetInterval();
    let { counter, direction,pictures } = this.state;
    if (counter === 0) counter = pictures.length - 1;
    else counter--;
    this.setState({ counter, direction: 'back' })
  }

  goForward() {
    if (!this.state.pictures) {
      return
    }
    this.resetInterval();
    let { counter, direction, pictures } = this.state;
    if (counter >= pictures.length - 1) counter = 0;
    else counter++;
    this.setState({ counter, direction: 'forward' })
  }

  imgStyle(img, index) {
    const { counter, direction, pictures } = this.state;
    const backgroundImage = `url(${img})`;

    const left = (
      index === counter - 1 || counter === 0 && index === pictures.length - 1 ? '-700px'
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
    const { getListings } = this.props;
    return (
      <div className="Landing">
        <Nav header='Welcome' />
        <div className="video-container">
          <div className="video-overlay">
            <div className="search-container">
              <input className="input-bar" type="text" value={this.state.input} onChange={(e) => { this.setState({ input: e.target.value }) }} placeholder="Find Vegan & Vegetarian near..." />
              <Link to='/listing' className="submit-btn" onClick={() => { if (this.props.listings !== getListings(this.state.input)) { this.props.clearListings() } getListings(this.state.input) }}>Submit</Link>
            </div>
            <div className="description-container">
              <h1>Desire. Explore. Discover. Nourish.</h1>
            </div>
          </div>
          <video autoPlay loop>
            <source src={hotpot} type="video/mp4" />.
             </video>
        </div>
        <div className="bottom-container">
        <div className="about-container">
          <h1 className="about-title">Plant based Dining</h1>
          <p className="about-description"> I like vegan products, I made this website for others who like vegan products. Yay, lets find vegan products. Yoosh! </p>
        </div>
        <div className="photo-container">
          <div className="landing-carousel-container">
            {this.state.pictures ? this.state.pictures.map((img, i) => {
              return <div className="image" key={i} style={this.imgStyle(img, i)}></div>
            }) : <div className="spinner"></div>}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state) return {};
  return {
    listings: state.listings,
  }
}

export default connect(mapStateToProps, { getListings, getCurrentUser, clearListings })(Landing);
