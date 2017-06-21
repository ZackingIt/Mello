import React from 'react';
import BoardMenuDropdown from './board_menu_dropdown';
import Greeting from './greeting';
import UserMenu from './user_menu';

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  toggleModal() {

    let zack = $("div.board-menu-container").toggleClass("expanded-board-menu-container");
    console.log(zack);
  }



  render(){

    return(
      <div className="header-container">
        <div className="header-nav-bar">

          <button onClick={this.toggleModal} className="board-menu-button">
            <div className="board-menu-button-icon">
              <i className="fa fa-trello"></i>
            </div>
          <div className="board-menu-button-text">
            Boards
          </div>

        </button>
          <BoardMenuDropdown boardMenu={this.props.boardMenu}/>



          <div className="user-menu-container">
          <UserMenu />
            <div className="new-board-dropdown-container">
            </div>
          </div>
        </div>



      </div>
    );

  }


}

export default Header;
