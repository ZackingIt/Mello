import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from './greeting';
import UserMenu from './user_menu';
import CreateBoardDropdown from './create_board_dropdown';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {boardDropDown: false, createBoardDropdown: false};
    this.toggleBoardDropdown = this.toggleBoardDropdown.bind(this);
    this.toggleCreateBoardDropdown = this.toggleCreateBoardDropdown.bind(this);
  }

  toggleBoardDropdown() {
    $("div.board-menu-container").toggleClass("expanded-board-menu-container");
  }

  toggleCreateBoardDropdown(){
    $("div.board-menu-container").toggleClass("expanded-board-menu-container");
  }

  render(){

    return(
      <div className="header-container">
        <div className="header-nav-bar">

          <button onClick={this.toggleBoardDropdown} className="board-menu-button">
            <div className="board-menu-button-icon">
              <i className="fa fa-trello"></i>
            </div>
            <div className="board-menu-button-text">
              Boards
            </div>
          </button>

          <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"/>

          <BoardMenuDropdown boardMenu={this.props.boardMenu}/>
          <CreateBoardDropdown/>
          <UserMenu />
        </div>
      </div>
    );

  }


}

export default Header;
