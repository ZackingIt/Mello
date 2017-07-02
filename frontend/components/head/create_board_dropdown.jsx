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
     e.preventDefault();
     this.props.createBoard(this.state.title);
     this.handleToggleClick();
     this.setState({title: ""});
 }

 // handleEnter(e){
 //   //e.key and e.shiftkey
 //   if (e.key === "enter"){
 //     this.setState(prevState => ({
 //       modalPresence: false
 //     }));
 //   }
 //   //keyhandler on the input field AND textarea
 //   //clickhandler on the button
 //
 // }

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
                          <form className="create-board-dropdown-form" onSubmit={this.handleSubmit}>
                            <input className="create-board-dropdown-menu-input" onChange={this.handleChange("title")} value={this.state.title}/>
                            <button className="create-board-dropdown-menu-button"> Create </button>
                          </form>
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
