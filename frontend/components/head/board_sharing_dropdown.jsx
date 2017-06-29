import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { keys, merge, values } from 'lodash';


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

 // handleSubmit(e){
 //     e.preventDefault();
 //     this.props.createBoard(this.state.title);
 //     this.handleToggleClick();
 //     this.setState({title: ""});
 // }

 handleSubmit(boardShareParams) {
   return (e) => {
     e.preventDefault();
     console.log("My submitted ID IS");
     console.log(boardShareParams);
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

 render() {

   let boardSharingModal;
   let availabilityButton;
   console.log("BOARD SHARING PROPS BEOLOOOOOOO");
   console.log(this.props);
   let unshared_users_output = [];
   if (this.props.unshared_users){
      for (let i = 0; i < this.props.unshared_users.unshared_user_ids.length; i++) {
        let boardShareParams = {user_id: null, board_id: this.props.boardId };
        boardShareParams['user_id'] = parseInt(this.props.unshared_users.unshared_user_ids[i]);
        unshared_users_output.push(
               <div className="board-sharing-user-name">
                 <button onClick={this.handleSubmit(boardShareParams)}>
                   { this.props.unshared_users.unshared_usernames[i] }
                 </button>
               </div>
        );
      }
   }

   let shared_users_output = [];
   if (this.props.shared_users){
      for (let i = 0; i < this.props.shared_users.shared_user_ids.length; i++) {
        let boardShareParams = {user_id: null, board_id: this.props.boardId };
        boardShareParams['user_id'] = parseInt(this.props.shared_users.shared_user_ids[i]);
        shared_users_output.push(
               <div className="board-sharing-user-name">
                 <button onClick={this.handleSubmit(boardShareParams)}>
                   { this.props.shared_users.shared_usernames[i] }
                 </button>
               </div>
        );
      }
   }


  //  let userIdList = keys(this.props.users.users);
  //  let output = [];
  //  let boardShareParams = {user_id: null, board_id: this.props.boardId };
  //  userIdList.forEach( (id) => {
  //    boardShareParams['user_id'] = parseInt(id);
  //    output.push(
  //      <div className="board-sharing-user-name">
  //        <button onClick={this.handleSubmit(boardShareParams)}>
  //          { this.props.shared_users.users[id].username }
  //        </button>
  //      </div>
  //    );
  //  });

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


export default BoardSharingDropdown;
