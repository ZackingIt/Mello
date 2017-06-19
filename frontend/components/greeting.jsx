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
        <section className="landing-container">
          <div className="landing-header">
                      <img className="landing-icon" src="http://media.istockphoto.com/vectors/lightning-icon-red-circle-on-gray-background-vector-id493855699?k=6&m=493855699&s=612x612&w=0&h=8AZ-L-6kVpuVdoFblBH49c_rhs9xpS1GRqMfZI7Jquw=" />
            Welcome to QuickBoard!
            <Link className="landing-sign-up-bar" to='/signup'>Sign Up</Link>
            <Link className="landing-sign-up-bar" to='/login'>Log In</Link>
          </div>

          <div className="">
            This is the body
          </div>
        </section>
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
