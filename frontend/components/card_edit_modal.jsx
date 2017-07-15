import React from 'react';
import { connect as connectOriginal } from 'react-redux';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class CardEditModal extends React.Component{
  constructor(props){
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalEdit = this.handleModalEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.state = {modalPresence: false, body: props.bodyText};
    this.handleEnter = this.handleEnter.bind(this);

  }

  toggleModal() {
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
  }

  handleModalEdit(e){
    e.preventDefault();
    this.setState( { body: e.currentTarget.value } );
  }

  handleEnter(e){
    if (e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      this.props.handleCardEditSubmit(this.props.id, this.state.body, this.props.listId, this.props.cardIndex);
    }
  }

  onEditSubmit(e){
    e.preventDefault();
    this.props.handleCardEditSubmit(this.props.id, this.state.body, this.props.listId, this.props.cardIndex);
  }

  render(){
    var cardEditModal;
    var bodyLength = (this.state.body.length) * 0.7 + 65;
    if ( this.state.modalPresence === false ){
      cardEditModal = (
        <div className="card-item-element-parent-grab">
          <div onClick={ this.toggleModal } className="card-item-element" >
            {this.props.bodyText}
          </div>
        </div>
      );
    } else {
      cardEditModal = (
        <form onSubmit={ this.onEditSubmit } onKeyPress={ this.handleEnter } className="card-item-element-true-modal" >
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
