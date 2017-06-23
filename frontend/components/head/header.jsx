import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from '../greeting';
import UserMenu from './user_menu';
import CreateBoardDropdown from './create_board_dropdown';
import { createBoard, requestBoards } from '../../actions/board_actions.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestBoards();
  }


  render(){
    const {boards, lists, cards} = this.props;
    var boardLinkArray = [];
    var menuPropsArray = [];
    if (Object.keys(this.props.boards).length !== 0){
        for (let key in boards){
          menuPropsArray.push(
            <Link key={key} to={`/board/${key}`}>
              {boards[key].title}
            </Link>
          );
          boardLinkArray.push(
              <Link key={key} className="board-index-link" to={`/board/${key}`}>
                {boards[key].title}
              </Link>
          );
        }
      }

    return(
      <div className="header-container">
        <div className="header-nav-bar">
          <BoardMenuDropdown boardMenu={menuPropsArray}/>
          <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"/>
          <CreateBoardDropdown createBoard={this.props.createBoard} requestBoards={this.props.requestBoards}/>
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
    requestBoards: () => {
      console.log("requesting board!");
      return dispatch(requestBoards());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
