import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import {login, signup} from '../actions/session_actions';


class SessionForm extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(this.props.formType, user);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      const newState = Object.assign({}, this.state);
      newState[field] = e.currentTarget.value;
      this.setState(newState);
    };
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Redirect to='/' />
      );
    }

    const formType = this.props.formType;
    let header, label, link;

    if (formType === 'login') {
      header = "Log in to QuickBoard"
      label = "Log In";
    } else if (formType === 'signup') {
      header = "Sign Up for QuickBoard"
      label = "Sign Up";
    }

    const errors = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);
    const {username, password} = this.state;
    return (

      <section>
        {header}
        <form>
          <input onChange={this.handleChange("username")} value={username}/>
          <input onChange={this.handleChange("password")} value={password}/>
          <button onClick={this.handleSubmit}>{label}</button>
        </form>
        {link}
        <ul>{errors}</ul>
        <div class="fullscreen-bg">
              <source src="video/big_buck_bunny.webm" type="video/webm" />
        </div>
      </section>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return ({
    loggedIn: Boolean(state.session.currentUser),
    errors: state.session.errors,
    formType: ownProps.location.pathname.slice(1)
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: (formType, user) => {
    if (formType === 'login'){
      dispatch(login(user));
    } else if (formType === 'signup') {
      dispatch(signup(user));
    }
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(SessionForm));
