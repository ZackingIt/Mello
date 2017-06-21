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

        <div>
            {`Welcome: ${user.username}`}
            <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (

          <div className="landing-header">
            <img className="landing-icon" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg" />
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
