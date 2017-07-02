import React from 'react';
import onClickOutside from 'react-onclickoutside';



class BoardMenuDropdown extends React.Component{

  constructor(props){
    super(props);
    this.state = {modalPresence: false};
    this.toggleBoardDropdown = this.toggleBoardDropdown.bind(this);

  }

  handleClickOutside(e) {
    this.setState(prevState => ({
      modalPresence: false
    }));
  }

  toggleBoardDropdown() {
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
  }

  handleEnter(e){
    //e.key and e.shiftkey
    if (e.key === "Enter"){
      this.setState(prevState => ({
        modalPresence: false
      }));
    }
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


export default onClickOutside(BoardMenuDropdown);
