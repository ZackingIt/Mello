import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from '../greeting';
import UserMenu from './user_menu';
import BoardSharingDropdown from './board_sharing_dropdown';
import CreateBoardDropdown from './create_board_dropdown';
import { createBoard, requestBoards } from '../../actions/board_actions';
import { requestUsers } from '../../actions/user_actions';
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
    console.log("MY HEADER PROPS")
    console.log(this.props)
    const {boards, lists, cards} = this.props;
    var boardLinkArray = [];
    var menuPropsArray = [];
    if (Object.keys(this.props.boards).length !== 0){
        for (let key in boards){
          menuPropsArray.push(
            <Link className="board-menu-item" key={Math.random()*1000} to={`/board/${key}`}>
              {boards[key].title.slice(0,20)}
            </Link>
          );
          boardLinkArray.push(
              <Link key={key} className="board-index-link" to={`/board/${key}`}>
                {boards[key].title}
              </Link>
          );
        }
      }


    console.log("my props/location");
    console.log(parseInt(this.props.location.pathname.slice(this.props.location.pathname.length-1)));
    return(
      <div className="header-container">
        <div className="header-nav-bar">
          <BoardMenuDropdown boardMenu={menuPropsArray}/>
          <Link to={'/'}>
            <img className="trello-image-link" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"/>
          </Link>
          <CreateBoardDropdown createBoard={this.props.createBoard} requestBoards={this.props.requestBoards}/>
          <BoardSharingDropdown
            boardId={ parseInt(this.props.location.pathname.slice(this.props.location.pathname.length-1))}
            requestUsers={this.props.requestUsers} />
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
      //console.log(`my title is ${title}`);
      return dispatch(createBoard({title: title, privacy_status: false, listIds: []}));
    },
    requestBoards: () => {
      //console.log("requesting board!");
      return dispatch(requestBoards());
    },
    requestUsers: () => {
      return dispatch(requestUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
