import React from 'react';
import { connect as connectOriginal } from 'react-redux';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { moveCard, generateDropZone } from '../actions/card_actions';
import CardEditModal from './card_edit_modal';


const style = {
  border: 'none',
  padding: 'none',
  marginBottom: '.5rem',
  backgroundColor: 'none',
  cursor: 'move',
};

const ItemTypes = {
  CARD: 'card',
  LIST: 'list',
};


const cardSource = {
  beginDrag(props) {
    // console.log("my starting state");
    myState = merge(myState, {starting: props});
    // console.log(myState);
    return {
      card_id: props.id,
      cardIndex: props.cardIndex,
      listIndex: props.listId,
    };
  },
};

const renderGreyDropZone = (listHoverIndex, cardHoverIndex) => {


};

var myState = {starting: {}, ending: {}};

const cardTarget = {

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    console.log("my props");
    console.log(props);
    // console.log("my ending state");
    myState = merge(myState, {ending: props});
    // console.log(myState);
    props.moveCard(myState);
    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  },

  hover(props, monitor, component) {
    // debugger

    const cardStartingIndex = monitor.getItem().cardIndex;
    const listStartingIndex = monitor.getItem().listIndex;

    const cardHoverIndex = props.cardIndex;
    const listHoverIndex = props.listId;

    console.log(`card: ` + cardHoverIndex + ` lists:` + listHoverIndex);
    // props.dropZone({cardHoverIndex: cardHoverIndex, listHoverIndex: listHoverIndex});
    if (cardStartingIndex === cardHoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (cardStartingIndex < cardHoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (cardStartingIndex > cardHoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(listStartingIndex, listHoverIndex, cardStartingIndex, cardHoverIndex);


    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // monitor.getItem().cardIndex = cardHoverIndex;
  },
};

class Card extends React.Component{
  constructor(props){
    super(props);
    this.state = {modalPresence: false, title: "", greyCard: false};
  }

  handleToggleClick() {
    this.setState(prevState => ({
      modalPresence: !prevState.modalPresence
    }));
  }



  render(){

    if (!this.props.body) {
      return <div></div>;
    }
    let bodyText = this.props.body;

    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
        <div>
          {<CardEditModal id={ this.props.id } listId={ this.props.listId } cardIndex={ this.props.cardIndex } bodyText={bodyText} handleCardEditSubmit={this.props.handleCardEditSubmit  } />}
        </div>

      )
    );
  }
}

function connectSource(connect, monitor){
  return{
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function connectTarget(connect){
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveCard: (thisState) => {
      return dispatch(moveCard( thisState ));
    },

    // dropZone: (dropZoneParams) => {
    //   return dispatch(generateDropZone( dropZoneParams ));
    // },
  };
};


export default connectOriginal(null, mapDispatchToProps)(
  DragSource( ItemTypes.CARD, cardSource, connectSource)(
  DropTarget(ItemTypes.CARD, cardTarget, connectTarget)(Card))
);
