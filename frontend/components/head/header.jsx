import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from '../greeting';
import UserMenu from './user_menu';
import BoardSharingDropdown from './board_sharing_dropdown';
import CreateBoardDropdown from './create_board_dropdown';
import { createBoard, requestBoards } from '../../actions/board_actions';
import { requestUsers } from '../../actions/user_actions';
import { addUserToBoard } from '../../actions/board_share_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestBoards();
    // this.props.requestUsers();
  }

  render(){
    const {boards, lists, cards} = this.props;
    var boardLinkArray = [];
    var menuPropsArray = [];

    if (Object.keys(this.props.boards).length !== 0){
        for (let key in boards){
          let titleString = boards[key].title;
          let outputString;
          if  (titleString.length > 20){
            outputString = titleString.slice(0,20)+"...";
          } else {
            outputString = titleString;
          }
          menuPropsArray.push(
            <Link className="board-menu-item" key={Math.random()*1000} to={`/board/${key}`}>
            {outputString}
            </Link>
          );
          boardLinkArray.push(
              <Link key={key} className="board-index-link" to={`/board/${key}`}>
                {boards[key].title}
              </Link>
          );
        }
      }
    let boardSharingDropdown;
    if (this.props.location.pathname === "/home"){
      boardSharingDropdown = null;
    } else {
      boardSharingDropdown =  <BoardSharingDropdown
                  boardId={ parseInt(this.props.location.pathname.slice(this.props.location.pathname.length-1))}
                  users={this.props.users}
                  addUserToBoard={this.props.addUserToBoard}
                  shared_users={ this.props.shared_users }
                  unshared_users={ this.props.unshared_users } />;
    }

    return(
      <div className="header-container">
        <div className="header-nav-bar">
          <BoardMenuDropdown boardMenu={menuPropsArray}/>
          <Link to={'/'}>
            <img className="trello-image-link" src="https://www.clker.com/cliparts/1/3/R/K/0/D/black-white-rocket-md.png"/>
            <div className="trello-header-title"> Mello </div>
          </Link>
          <CreateBoardDropdown createBoard={this.props.createBoard} requestBoards={this.props.requestBoards}/>
          {boardSharingDropdown}
          <UserMenu />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
    lists: state.lists,
    cards: state.cards,
    users: state.users,
    shared_boards: state.shared_boards,
    shared_users: state.users.shared_users,
    unshared_users: state.users.unshared_users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBoard: (title) => {
      return dispatch(createBoard({title: title, privacy_status: false, listIds: []}));
    },
    requestBoards: () => {
      return dispatch(requestBoards());
    },
    requestUsers: () => {
      return dispatch(requestUsers());
    },
    addUserToBoard: (boardShareParams) => {
      return dispatch(addUserToBoard(boardShareParams));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
