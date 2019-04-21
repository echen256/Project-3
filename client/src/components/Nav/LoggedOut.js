import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

class LoggedOut extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark bg-primary"
        style={{ position: 'fixed', zIndex: 100, width: '100%' }}
      >
        <Link className="navbar-brand" to="/">
          NYT ARTICLES AND BOOKS Searcher
        </Link>
        <Link to="/login">
              <button type="button" className="btn btn-info">
                Login
              </button>
            </Link>
      </nav>
    );
  }
}

export default LoggedOut;
