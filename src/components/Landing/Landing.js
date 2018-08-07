import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop'
import "./Landing.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { getListings, getCurrentUser, clearListings } from '../../ducks/reducer';
import veggiestand from '../../assets/Veggie-Stand.mp4'
import hotpot from "../../assets/hotpot.mp4"
import freshveggie from "../../assets/fresh-veggies.jpeg";
import mexicana from "../../assets/mexicana.png";
import miso from "../../assets/miso.jpg";
import pho from "../../assets/pho.jpg";

class Landing extends Component {
  state = {
    input: "",
    pictures: [freshveggie, mexicana, miso, pho],
    words : ['Desire.', 'Explore.', 'Discover.', 'Nourish.']
  }

  typeWriter(){
    return(
      <TypistLoop interval={1000}>
      <Typist startDelay={4000}>Desire.<Typist.Backspace count={7} delay={1500}/></Typist>
      <Typist>Explore.<Typist.Backspace count={8} delay={1500}/></Typist>
      <Typist>Discover.<Typist.Backspace count={9} delay={1500}/></Typist>
      <Typist>Nourish.<Typist.Backspace count={8} delay={1500}/></Typist>
    </TypistLoop>
    )
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  handleListing() {
    const { getListings } = this.props;
    if (this.props.listings !== getListings(this.state.input)) {
      this.props.clearListings()
    }
    getListings(this.state.input)
  }

  handleCarousel() {
    return (
      <Carousel 
      className="carousel-container" 
      autoplay={true}
      autoPlayInterval={4000}
      wrapAround={true}
      >
        {this.state.pictures.map((img, i) => {
          return <img className="carousel-image" src={img} key={i} />
        })}
    </Carousel> 
    ) 
  }

  render() {
    return (
      <div className="Landing">
        <Nav header='Welcome' />
        <div className="video-container">
          <div className="video-overlay">
            <div className="search-container">
              <input className="input-bar" type="text" value={this.state.input}
                onChange={(e) => this.handleChange(e)} placeholder="Enter City, State..." required />
              <Link to='/listing' style={{ textDecoration: 'none' }}>
                <button type='submit' className="submit-btn"
                  onClick={() => this.handleListing()}>Submit</button>
              </Link>
            </div>
            <div className="description-container">
              {this.typeWriter()}
            </div>
          </div>
          <video autoPlay muted loop>
            <source src={hotpot} type="video/mp4" />.
          </video>
        </div>
        <div className="bottom-container">
          <div className="about-container">
            <h1 className="about-title">Plant based Dining</h1>
            <p className="about-description">
              Search around your city to find vegan and vegetarian friendly meals as well as resources.
            This includes restaurants, grocery stores, farmers market, and more! </p>
          </div>
          <div className="carousel-container">
            {this.handleCarousel()}
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