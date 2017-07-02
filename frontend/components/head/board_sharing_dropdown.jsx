import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { keys, merge, values, isEmpty } from 'lodash';
import onClickOutside from 'react-onclickoutside';


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

 handleSubmit(boardShareParams) {
   return (e) => {
     e.preventDefault();
     this.props.addUserToBoard(boardShareParams);
   };
 }

 handleChange(field) {
   return (e) => {
     e.preventDefault();
     const newState = Object.assign({}, this.state);
     newState[field] = e.currentTarget.value;
     this.setState(newState);
   };
 }

 handleClickOutside(e) {
   this.setState(prevState => ({
     modalPresence: false
   }));
 }

 render() {
   if (isEmpty(this.props.users)) {
     return null;
   }
   let boardSharingModal;
   let availabilityButton;
   let unshared_users_output = [];
   if (this.props.unshared_users.unshared_user_ids){
      for (let i = 0; i < this.props.unshared_users.unshared_user_ids.length; i++) {
        let boardShareParams = {user_id: null, board_id: this.props.boardId };
        boardShareParams['user_id'] = parseInt(this.props.unshared_users.unshared_user_ids[i]);
        let currentUserName = this.props.unshared_users.unshared_usernames[i]
        unshared_users_output.push(
               <div key={currentUserName} className="board-sharing-user-name">
                 <button onClick={this.handleSubmit(boardShareParams)}>
                   { this.props.unshared_users.unshared_usernames[i] }
                 </button>
               </div>
        );
      }
   }

   let shared_users_output = [];
   if (this.props.shared_users.shared_user_ids){
      for (let i = 0; i < this.props.shared_users.shared_user_ids.length; i++) {
        let boardShareParams = {user_id: null, board_id: this.props.boardId };
        boardShareParams['user_id'] = parseInt(this.props.shared_users.shared_user_ids[i]);
        let currentUnsharedUserName = this.props.unshared_users.unshared_usernames[i]
        shared_users_output.push(
               <div key={currentUnsharedUserName} className="board-sharing-user-name">
                 <button onClick={this.handleSubmit(boardShareParams)}>
                   { this.props.shared_users.shared_usernames[i] }
                 </button>
               </div>
        );
      }
   }


   if ( this.state.modalPresence === true ){
     boardSharingModal = (<section className="create-board-dropdown-menu-container">
                            <div className="create-board-dropdown-menu-header">
                              Add Users to Board
                            </div>

                            <div className="create-board-dropdown-menu-title">
                              Add Users to Board
                            </div>
                            <div>
                              {unshared_users_output}
                            </div>

                            <div className="create-board-dropdown-menu-title">
                              Remove Users from Board
                            </div>

                            <div>
                              {shared_users_output}
                            </div>

                         </section>);
   }
   return (
     <section className="board-sharing-dropdown-container">
       <button onClick={this.handleToggleClick} className="board-sharing-dropdown-container" >
         <i className="fa fa-users"></i>
       </button>
       {boardSharingModal}
     </section>
   );
 }
}


export default onClickOutside(BoardSharingDropdown);
