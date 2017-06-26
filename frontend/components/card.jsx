import React from 'react';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const ItemTypes = {
  CARD: 'card',
};


const cardSource = {
  beginDrag(props) {
    console.log("Dragging 2!!!");
    console.log(props.id);
    console.log( "mah bindddd "+ props.index);
    return {
      card_id: props.id,
      cardIndex: props.cardIndex,
      listIndex: props.listId,

    };
  },
};

const cardTarget = {

  hover(props, monitor, component) {
    // debugger
    console.log("Dragging 4!!!");

    const cardStartingIndex = monitor.getItem().cardIndex;
    const listStartingIndex = monitor.getItem().listIndex;

    const cardHoverIndex = props.cardIndex;
    const listHoverIndex = props.listIndex;

    console.log("My cardHoverIndex below");
    console.log(cardHoverIndex);

    console.log("My cardStartingIndex below");
    console.log(cardStartingIndex);

    console.log("my listStartingIndex below");
    console.log(listStartingIndex);

    console.log("my list hover index below (maybe)");
    console.log(listHoverIndex);

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
    props.moveCard(listStartingIndex, listEndingIndex, cardStartingIndex, cardHoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().cardIndex = cardHoverIndex;
  },
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))



export default class Card extends React.Component{
  constructor(props){
    super(props)
    this.moveCard = this.moveCard.bind(this)
  }

  static propTypes = {
    // connectDragSource: PropTypes.func.isRequired,
    // connectDropTarget: PropTypes.func.isRequired,
    // index: PropTypes.number.isRequired,
    // isDragging: PropTypes.bool.isRequired,
    // id: PropTypes.any.isRequired,
    // text: PropTypes.string.isRequired,
    // moveCard: PropTypes.func.isRequired,
  };

  moveCard(startingListId, listHoverIndex, cardStartingIndex, cardHoverIndex) {

    // const { cards } = this.state;
    // const dragCard = cards[cardStartingIndex];
    // this.setState(update(this.state, {
    //   cards: {
    //     $splice: [
    //       [cardStartingIndex, 1],
    //       [cardHoverIndex, 0, dragCard],
    //     ],
    //   },
    // }));


  }

  render(){

    console.log("MY CARD PROPSSSSSSS")
    console.log(this.props)
    if (!this.props.body) {
      return <div>Loading...</div>;
    }
    let bodyText = this.props.body;

    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    const opacity = isDragging ? 0 : 1;
      return connectDragSource(connectDropTarget(
        <div className="card-item-element" style={{ ...style, opacity }}>
          {bodyText}
        </div>,
      ));
  }

}

// export default Card;
