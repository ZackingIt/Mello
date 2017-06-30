import React from 'react';
import { connect as connectOriginal } from 'react-redux';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class CardEditModal extends React.Component{
  constructor(props){
    super(props);
    this.toggleBoardDropdown = this.toggleBoardDropdown.bind(this);
    this.handleModalEdit = this.handleModalEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.state = {modalPresence: false, body: props.bodyText};

  }

  toggleBoardDropdown() {
    // console.log(" FIRING FROM LOCAL STATE -- clickthru works ");
    // console.log("my state is now");
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
    // console.log(this.state.modalPresence);
  }

  handleModalEdit(e){
    e.preventDefault();
    this.setState( { body: e.currentTarget.value } );
  }

  onEditSubmit(e){
    e.preventDefault();
    this.props.handleCardEditSubmit(this.props.id, this.state.body, this.props.listId, this.props.cardIndex);
  }

  render(){
    var cardEditModal;
    var bodyLength = (this.state.body.length) * 0.5 + 30;
    // console.log(bodyLength);
    if ( this.state.modalPresence === false ){
      // console.log("false!");
      cardEditModal = (
        <div onClick={ this.toggleBoardDropdown } className="card-item-element" >
          {this.props.bodyText}
        </div>
      );
    } else {
      // console.log("true!");
      cardEditModal = (
        <form onSubmit={ this.onEditSubmit } className="card-item-element-true-modal" >
          <textarea style={{height: bodyLength + 'px'}} className="card-item-element-input" onChange={ this.handleModalEdit } value={this.state.body} />
          <button type="submit" className="add-list-button-element">Save</button>
        </form>
      );
    }
    return(
      <div>
        {cardEditModal}
      </div>
    );
  }
}

export default CardEditModal;
