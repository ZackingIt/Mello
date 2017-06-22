import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from './greeting';
import UserMenu from './user_menu';
import CreateBoardDropdown from './create_board_dropdown';

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

          <CreateBoardDropdown/>
          <UserMenu />
        </div>
      </div>
    );

  }


}

export default Header;
