import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';


class Greeting extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const user = this.props.user;
    // How do I actually route myself from my greeting page to my board page in the best way?
    if (user) {
      return (
        // <section className="landingContainer">
        //   <div className="landing">
        <div>
            <Redirect to="/home" />
            {`Welcome: ${user.username}`}
            <button onClick={this.handleLogout}>Logout</button>
        </div>
        // </section>
      );
    } else {
      return (
          <div className="landing-header">
            <img className="landing-icon" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg" />
            <div className="landing-header-spacer"></div>

            <div className="landing-header-section">
                <div className="landing-header-left">
                  <Link className="landing-sign-up-bar" to='/signup'>Sign Up</Link>
                  <Link className="landing-login-bar" to='/login'>Log In</Link>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
