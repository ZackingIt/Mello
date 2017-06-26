import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import {login, signup, clearErrors} from '../actions/session_actions';


class SessionForm extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.processForm = this.props.processForm.bind(this);
    this.formType = this.props.formType
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(this.props.formType, user);
  }

  handleDemo(e) {
      let that = this;
      e.preventDefault();
    //   let prom = new Promise(function (resolve, reject) {

    //  });
      this.setState(
        { username: 'demo@mello.com', password: 'password' },
        () => {
          const user = Object.assign({}, this.state);
          setTimeout(function () {
            that.props.processForm('login', user); }, 1000);
        });
    }

    handleDemo(e) {
        let that = this;
        e.preventDefault();

        this.setState(
          { username: 'demo@mello.com', password: 'password' },
          () => {
            const user = Object.assign({}, this.state);
            that.props.processForm('login', user);
          });
      }

  //
  // handleDemo(e) {
  //   e.preventDefault();
  //   const user = Object.assign({}, this.state);
  //   this.setState(
  //     { username: 'demo@mello.com', password: 'password' },
  //     () => this.props.processForm(this.props.formType, user)
  //   );
  // }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      const newState = Object.assign({}, this.state);
      newState[field] = e.currentTarget.value;
      this.setState(newState);
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.props.clearErrors();
    }
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Redirect to='/home' />
      );
    }


    const formType = this.props.formType;
    let header, label, link;

    if (formType === 'login') {
      header = "Log in to Mello";
      label = "Log In";
    } else if (formType === 'signup') {
      header = "Sign Up for Mello";
      label = "Sign Up";
    }
    // debugger

    const errors = this.props.errors.map((error, idx) => <li key={idx}>{error}</li>);

    let errorsWrapped;
    if (errors.length > 0 ){
      errorsWrapped = (<div className="error-box"> {errors} </div>);
    } else {
      errorsWrapped = "";
    }

    const {username, password} = this.state;
    return (
      <div className="landing-body-container">
        <div className="landing-body-alignment-container">
        <div className="landing-body-title">
          Welcome to Mello!
        </div>
        <div className="landing-body-header">
          {header}
        </div>

          <form className="landing-body-form">
            <div className="landing-body-form-username">
              <div className="landing-body-form-username-text">
                Email
              </div>


              <div className="landing-body-form-box-username">
                <input className="landing-body-form-box-username" onChange={this.handleChange("username")} value={this.state.username} />
              </div>
            </div>

            <div className="landing-body-form-password">
              <div className="landing-body-form-password-text">
                Password
              </div>

              <input className="landing-body-form-box-password" onChange={this.handleChange("password")} value={this.state.password}/>
              <ul >{errorsWrapped}</ul>
            </div>
          <div className="landing-body-button">
            <button className="landing-body-button" onClick={this.handleSubmit}>{label}</button>
          </div>
          <div className="landing-body-button-spacer">
          </div>
          <div className="landing-body-button">
            <button className="landing-body-button" onClick={this.handleDemo}>Demo</button>
          </div>


          </form>


        </div>
      </div>
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
  },
  clearErrors: () => {
    dispatch(clearErrors());
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(SessionForm));
