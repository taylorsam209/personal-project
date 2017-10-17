import React, { Component } from 'react';
import './Profile.css';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import axios from 'axios';


class Profile extends Component {

  componentDidMount() {
    axios.get(`/api/getfavlisting/${this.props.user.id}`)
    .then(response => {
      console.log(response.data)
    })
  }

  render() {
    const {id, user_name, email, img} = this.props.user;
    return (
      <div className="Profile">
          <Nav header ="Profile"/>
          <h1>{user_name}</h1>
          <img src={img} alt="profile"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile);
