import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';

let auto;
const timer = 4000;

class Carousel extends Component {
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
    // this.resetInterval();
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
    // this.resetInterval();
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
    


    return (
        <div className="photo-container">
          <div className="carousel-btn" onClick={ () => {this.goBack(); this.resetInterval}}>{"<"}</div>

          <div className="carousel-container">
            {photos ? photos.map((img, i) => {
              return <div className="image" key={i} style={this.imgStyle(img, i)}></div>
            }) : <div><i className="fa fa-cog fa-spin fa-3x fa-fw"></i></div>}
          </div>
          <div className="carousel-btn" onClick={() => {this.goForward(); this.resetInterval()}}>{">"}</div>
       </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      currentRestaurant: state.currentRestaurant,
      user: state.user
    }
  }

export default connect(mapStateToProps)(Carousel);
