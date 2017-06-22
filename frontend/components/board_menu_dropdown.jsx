import React from 'react';

class BoardMenuDropdown extends React.Component{

  constructor(props){
    super(props);
  }

  render () {
    let output = this.props.boardMenu.map((board) => {
      return (
        <div className="board-menu-item"> {board} </div>
      );
    });
    return (
      <div>
        <button onClick={this.toggleBoardDropdown} className="board-menu-button">
          <div className="board-menu-button-icon">
            <i className="fa fa-trello"></i>
          </div>
          <div className="board-menu-button-text">
            Boards
          </div>
        </button>

        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"/>


        <div className="board-menu-container">
          {output}
        </div>
      </div>
    );
  }
}


export default BoardMenuDropdown;
