import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CreateBoardDropdown extends React.Component {
  constructor(props) {
   super(props);
   this.state = {modalPresence: false, title: ""};
   this.handleToggleClick = this.handleToggleClick.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleToggleClick() {
   this.setState(prevState => ({
     modalPresence: !prevState.modalPresence
   }));
 }

 handleSubmit(e){
   //console.log("handle submit in create board firing");
     e.preventDefault();
     this.props.createBoard(this.state.title);
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
   let createBoardModal;
   if ( this.state.modalPresence === true ){
     createBoardModal = (<div className="create-board-dropdown-menu-container">
                          <div className="create-board-dropdown-menu-header">
                            Create Board
                          </div>
                          <div className="create-board-dropdown-menu-title">
                            Title
                          </div>
                            <input className="create-board-dropdown-menu-input" onChange={this.handleChange("title")} value={this.state.title}/>
                            <button className="create-board-dropdown-menu-button" onClick={this.handleSubmit}> Create </button>
                         </div>);
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
