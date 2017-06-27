
import React from 'react';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './card';

const listSource = {
  beginDrag(props) {
    return {
      list_id: props.listId,
      listTarget: props.listObj.order
    };
  },
};

const ItemTypes = {
  CARD: 'card',
  LIST: 'list',
};



class List extends React.Component{
  constructor(props){
    super(props);

    this.state = {cardBody: "", listId: props.listId, order: values(props.listObj.cardIds).length};
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleCreateCardBodyChange = this.handleCreateCardBodyChange.bind(this);
    this.moveCard = this.moveCard.bind(this);

  }

  handleCreateCard(e) {
    e.preventDefault();
    this.props.createCard(this.state.listId, this.state.order, this.state.cardBody);
    this.setState({
      cardBody: ""
    });
  }

  handleCreateCardBodyChange(e){
    e.preventDefault();
    this.setState({
      cardBody: e.currentTarget.value,
    });
  }

  moveCard(cardStartingIndex, cardHoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[cardStartingIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [cardStartingIndex, 1],
          [cardHoverIndex, 0, dragCard],
        ],
      },
    }));
  }

  //arguments of bind are evaluated when bind is invoked(at moment of binding, not onclick)
  //therefore putting params in bind when the params are async is dangerous -- binding will not sync with params
  //our method here works because render is re-called, so bind is re-bound at every keystroke.

  render(){
    if (!this.props.listObj) {
      // TODO: render loading state here
      return <div>Loading...</div>;
    }
    // console.log("my listId is...");
    // console.log(this.state.listId);
    // console.log("my LIST PROPSSSSSSSSS")
    // console.log(this.props);
    const listTitle = this.props.listObj.title;
    const allCards = this.props.cards;
    const cardsBodyArray = this.props.listObj.cardIds.map( (cardId) => {
      const currentCard = allCards[cardId];
      // return ( <div key={cardId} className="card-item-element"> {currentCard.body} </div> );
      return (<Card moveCard={this.moveCard} key={cardId} id={cardId} listId={this.state.listId} cardIndex={this.props.listObj.cardIds.indexOf(cardId)} body={currentCard.body}/>);
    });
    let listElement = (
      <section className="list-element">
        <div className="list-title-element">
          {listTitle}
        </div>
        <div className="card-array-element">
          {cardsBodyArray}
        </div>
        <div className="add-card-button-container">
          <input onChange={this.handleCreateCardBodyChange} className="add-card-input-element" value={this.state.cardBody}/>
          <button onClick={this.handleCreateCard} className="add-card-button-element">Add</button>
        </div>
      </section>);
    return (
            <div> {listElement} </div>
          );
  }
}

const listTarget = {

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);


    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  },

  hover(props, monitor, component) {
    const listStartingIndex = monitor.getItem().listTarget;
    const listHoverIndex = props.listTarget;

    console.log("my listTarget Starting Index below");
    console.log(listStartingIndex);

    console.log("my listHover Index below (maybe)");
    console.log(listHoverIndex);

    if (listStartingIndex === listHoverIndex) {
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
    if (listStartingIndex < listHoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (listStartingIndex > listHoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    // props.moveCard(listStartingIndex, listEndingIndex, listStartingIndex, listHoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().listTarget = listHoverIndex;
  },
};

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
// export default List;
export default DragSource( ItemTypes.LIST, listSource, connectSource)(
  DropTarget(ItemTypes.LIST, listTarget, connectTarget)(List)
);
