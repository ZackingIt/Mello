import React from 'react';

class BoardMenuDropdown extends React.Component{

  constructor(props){
    super(props);
    this.state = {modalPresence: false};
    this.toggleBoardDropdown = this.toggleBoardDropdown.bind(this);

  }

  toggleBoardDropdown() {
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
  }

  render () {
    let output = this.props.boardMenu.map((board, idx) => {
      return (
      <div key={idx} className="board-item-wrapper">
        <div key={idx} className="board-menu-item-left-box"/> {board}
      </div>
      );
    });

    let boardMenuModal;
    if ( this.state.modalPresence === true ){
      boardMenuModal = (
                      <div className="expanded-board-menu-container">
                        {output}
                      </div>
                      );
    }

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
        {boardMenuModal}
      </div>
    );
  }
}


export default BoardMenuDropdown;
