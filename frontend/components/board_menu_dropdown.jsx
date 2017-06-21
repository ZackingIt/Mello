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
        <div className="board-menu-container">
          {output}
        </div>
      </div>
    );

  }



}


export default BoardMenuDropdown;
