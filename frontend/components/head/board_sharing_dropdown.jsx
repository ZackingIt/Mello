import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class BoardSharingDropdown extends React.Component {
  constructor(props) {
   super(props);
   this.state = {modalPresence: false, title: "", availableUsers: []};
   this.handleToggleClick = this.handleToggleClick.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

 }

 handleToggleClick() {
   this.setState(prevState => ({
     modalPresence: !prevState.modalPresence
   }));
 }

 handleSubmit(e){
     e.preventDefault();
     this.props.createBoard(this.state.title);
     this.handleToggleClick();
     this.setState({title: ""});
 }

 handleChange(field) {
   return (e) => {
     e.preventDefault();
     const newState = Object.assign({}, this.state);
     newState[field] = e.currentTarget.value;
     this.setState(newState);
   };
 }

 componentDidMount(){
   this.props.requestUsers();
 }

 render() {
   let createBoardModal;
   let availabilityButton;
   console.log("BOARD SHARING PROPS BEOLOOOOOOO");
   console.log(this.props);
   if ( this.state.modalPresence === true ){
     createBoardModal = (<div className="create-board-dropdown-menu-container">
                          <div className="create-board-dropdown-menu-header">
                            Add Users to Board
                          </div>
                          <div className="create-board-dropdown-menu-title">
                            Available Users
                          </div>

                         </div>);
   }
   return (
     <section className="board-sharing-dropdown-container">
       <button onClick={this.handleToggleClick} className="board-sharing-dropdown-container" >
         <i className="fa fa-users"></i>
       </button>
       {createBoardModal}
     </section>
   );
 }
}

export default BoardSharingDropdown;
