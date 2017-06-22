import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from '../greeting';
import UserMenu from './user_menu';
import CreateBoardDropdown from './create_board_dropdown';
import { createBoard, requestBoard } from '../../actions/board_index_actions.js';
import { connect } from 'react-redux';

class Header extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div className="header-container">
        <div className="header-nav-bar">
          <BoardMenuDropdown boardMenu={this.props.boardMenu}/>
          <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"/>
          <CreateBoardDropdown createBoard={this.props.createBoard} requestBoard={this.props.requestBoard}/>
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
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {

  return {
    createBoard: (title) => {
      console.log(`my title is ${title}`);
      return dispatch(createBoard({author_id: 7, title: title, privacy_status: false, listIds: []}));
    },
    requestBoard: () => {
      console.log("requesting board!");
      return dispatch(requestBoard());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
