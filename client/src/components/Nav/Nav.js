import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { Link } from 'react-router-dom';
import './nav.css';

class Nav extends Component {

  render() {
    console.log(this.props.loggedin);
    return <div>{this.props.loggedin ? <LoggedIn /> : <LoggedOut />}</div>;
  }
}

export default Nav;
