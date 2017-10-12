import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import "./Landing.css"
import {connect} from 'react-redux';
import {getListings} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

class Landing extends Component {
constructor() {
  super()
  
  this.state ={
    input:""
  }






}



  render() { 
console.log(this.state.input)
    return (
      <div className="Landing">
        <Nav header=  'Green Fork' />
        <div className="background-img-container">
          <h2 className="input-bar-title">Find Vegan & Vegetarian near...</h2>
          <input type="text" value={this.state.input}  onChange={(e)=> {this.setState({input:e.target.value})}    }className ="input-bar" placeholder="Enter city"/>
          <Link to='/listing'>
          <button onClick={()=> {this.props.getListings(this.state.input)}}>Submit</button>
          </Link>
          <div className="description-container">
            <h3>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </h3>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if(!state) return {};
  return {
    listings:state.listings
  }
}

export default connect(mapStateToProps,{getListings})(Landing);
