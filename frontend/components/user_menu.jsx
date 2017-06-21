import React from 'react';
import { logout } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';

class UserMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.logout().then(
      () => this.props.history.push("/login")
    );
  }

  

  render(){
    let user = this.props.user;
    if (user) {
      return (
        <div >
            {`Welcome: ${user.username}`}
            <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (<div> </div>);
    }

  }

}

const mapStateToProps = (state) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserMenu));
