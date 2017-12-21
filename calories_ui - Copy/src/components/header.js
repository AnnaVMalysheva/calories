import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return [<li className="nav-item">
        <Link className="nav-link" to={{ pathname: '/signout' }}>Sign Out</Link>
      </li>,
        <li className="nav-item" key={2}>
            { this.props.isAdmin && <Link className="nav-link" to={{pathname: '/signup'}}>Sign Up</Link>}
        </li>
      ]
    } else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to={{ pathname: '/signin' }}>Sign In</Link>
        </li>,
      ];
    }
  }

  render() {
    const {userData} = this.props;
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth {userData != null ? userData.userName : ""}</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userData: state.auth.userData,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateToProps)(Header);
