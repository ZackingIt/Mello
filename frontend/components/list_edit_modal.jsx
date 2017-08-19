import React from 'react';
import { connect as connectOriginal } from 'react-redux';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget }
from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ListEditModal extends React.Component{
  constructor(props){
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalEdit = this.handleModalEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.state = {modalPresence: false, title: props.title};
    this.handleEnter = this.handleEnter.bind(this);
  }

  toggleModal(e) {
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
  }

  handleModalEdit(e){
    e.preventDefault();
    this.setState( { title: e.currentTarget.value } );
  }

  handleEnter(e){

    if (e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      this.props.handleListEditSubmit(this.props.listId, this.state.title);
    }
  }

  onEditSubmit(e){
    e.preventDefault();
    this.props.handleListEditSubmit(this.props.listId, this.state.title);
  }

  render(){
    var listEditModal;
    var bodyLength = 30;
    if ( this.state.modalPresence === false ){
      listEditModal = (
        <div className="list-title-element">
          <div onClick={ this.toggleModal }>
            { this.props.title }
          </div>
        </div>
      );
    } else {
      listEditModal = (
        <form onSubmit={ this.onEditSubmit }
              onKeyPress={ this.handleEnter }
              className="list-title-element-true-modal" >
          <textarea style={{height: bodyLength + 'px'}}
                    className="list-item-element-input"
                    onChange={ this.handleModalEdit }
                    value={this.state.title} />
        </form>

      );
    }
    return(
      <div>
        {listEditModal}
      </div>
    );
  }
}

export default ListEditModal;
