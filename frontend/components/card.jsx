import React from 'react';
import { connect as connectOriginal } from 'react-redux';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { moveCard, renderCardMove } from '../actions/card_actions';
import { generateDropZone } from '../actions/hover_actions';
import CardEditModal from './card_edit_modal';


const style = {
  border: 'none',
  padding: 'none',
  marginBottom: '.5rem',
  backgroundColor: 'none',
  cursor: 'pointer',
  opacity: 1.0,
};

const ItemTypes = {
  CARD: 'card',
  LIST: 'list',
};
var myState = {starting: {}, ending: {}};
var movedCardId;
var startingListId;

const cardSource = {
  beginDrag(props) {

  myState = merge(myState, {starting: props});
  console.log("my card source props");
  console.log(props);
  movedCardId = props.id;
  startingListId = props.listId;
    return {
      card_id: props.id,
      cardIndex: props.cardIndex,
      listIndex: props.listId,
    };
  }
  // endDrag: function (props, monitor, component) {
  //
  //
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //   var dropResult = monitor.getDropResult();
  //
  //   console.log("***my end drag props***");
  //   console.log(dropResult);
  //
  //   // someFluxAction(dropResult)
  // }

};


const cardTarget = {

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }
    // Obtain the dragged item
    const item = monitor.getItem();
    console.log("MY CARD State pre merge BELOW");
    console.log(myState);

    console.log("my card props are below");
    console.log(props);
    let updatedIndex = props.cardIndex + 1;

    let cardDroppedOnId = props.id;
    let endingListId = props.listId;

    console.log("MEGAPROPS");
    console.log(movedCardId);

    myState = merge(myState, {ending: props});
    props.moveCard(myState);


    let fromPile = props.lists[startingListId].cardIds.filter( (cardId) => {
      console.log(cardId);
      return cardId !== movedCardId;
    });

    let toPile = props.lists[endingListId].cardIds;
    toPile.splice(updatedIndex, 0, movedCardId);
    console.log("moved card id");
    console.log(movedCardId);
    console.log("from pile");
    console.log(fromPile);

    console.log("to pile");
    console.log(toPile);

    let cardParams = { cardLoad: {starting: {listId: startingListId}, ending: {listId: endingListId}}, cardIds: { toPile: toPile, fromPile: fromPile } };
    props.renderCardMove(cardParams);
    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  },

  hover(props, monitor, component) {
    const cardStartingIndex = monitor.getItem().cardIndex;
    const listStartingIndex = monitor.getItem().listIndex;

    const cardHoverIndex = props.cardIndex;
    const listHoverIndex = props.listId;

    // props.dropZone({cardHoverIndex: props.id, listHoverIndex: listHoverIndex});
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
    let greyModal =(
      <div className="">

      </div>);
    if (this.props.id === this.props.hovering.cardHoverIndex &&
        this.props.listId === this.props.hovering.listHoverIndex){
      greyModal = (
        <div className="grey-box">

        </div>);
    }

    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    const opacity = 1;
    return connectDragSource(connectDropTarget(
        <div>
          {<CardEditModal id={ this.props.id }
            listId={ this.props.listId }
            cardIndex={ this.props.cardIndex }
            bodyText={bodyText}
            handleCardEditSubmit={this.props.handleCardEditSubmit}
          />}
          {greyModal}
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

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
    lists: state.lists,
    cards: state.cards,
    shared_boards: state.shared_boards,
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    moveCard: (thisState) => {
      return dispatch(moveCard( thisState ));
    },
    renderCardMove: (thisState) => {
      return dispatch(renderCardMove (thisState));
    },
    dropZone: (dropZoneParams) => {
      return dispatch(generateDropZone( dropZoneParams ));
    },
  };
};


export default connectOriginal(mapStateToProps, mapDispatchToProps)(
  DragSource( ItemTypes.CARD, cardSource, connectSource)(
  DropTarget(ItemTypes.CARD, cardTarget, connectTarget)(Card))
);
