import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';

class Greeting extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout().then(
      () => this.props.history.push("/login")
    );
  }

  render() {
    const user = this.props.user;
    if (user) {
      return (
        <div >
        </div>
      );
    } else {
      return (

          <div className="landing-header">
            <img className="landing-icon" src="https://www.clker.com/cliparts/1/3/R/K/0/D/black-white-rocket-md.png" />
            <div className="trello-header-title-landing"> Mello </div>
            <div className="landing-header-spacer"></div>
                <div className="landing-header-left">
                  <Link className="landing-login-bar" to='/login'>Log In</Link>
                  <Link className="landing-sign-up-bar" to='/signup'>Sign Up</Link>
                </div>
          </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Greeting));
