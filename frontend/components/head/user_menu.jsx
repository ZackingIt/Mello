import React from 'react';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';

class UserMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    this.state = {modalPresence: false};

  }
  handleLogout() {
    this.props.logout().then(
      () => this.props.history.push("/login")
    );
  }

  toggleUserDropdown(){
    //// console.log("woof woof");
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
  }

  render(){
    let user = this.props.user;
    let userDropdown;
    if ( this.state.modalPresence === true ){
      userDropdown = (
        <div>
          <div className="expanded-user-menu-container">
            <div className="user-menu-container-spacer">
              <button className="user-profile-logout-button" onClick={this.handleLogout}>Logout</button>
            </div>
          </div>
      </div>
      );
    }
    if (user) {
      return (
        <div className="outerEnclosingDiv">
          <button onClick={this.toggleUserDropdown} className="user-profile-photo">
            {`${user.username.slice(0,1).toUpperCase()}`}
          </button>

          {userDropdown}

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
