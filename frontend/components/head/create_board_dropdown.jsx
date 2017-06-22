import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CreateBoardDropdown extends React.Component {
  constructor(props) {
   super(props);
   this.state = {modalPresence: false};
   this.handleToggleClick = this.handleToggleClick.bind(this);
 }

 handleToggleClick() {
   this.setState(prevState => ({
     modalPresence: !prevState.modalPresence
   }));
 }

 render() {
   let createBoardModal;
   if ( this.state.modalPresence === true ){
     createBoardModal = (<div> wassup babbbby </div>);
   }
   return (
     <section className="create-board-dropdown-container">
       <button onClick={this.handleToggleClick} className="create-board-dropdown-button" >
         <i className="fa fa-plus"></i>
       </button>
       {createBoardModal}
     </section>
   );
 }
}


export default CreateBoardDropdown;
