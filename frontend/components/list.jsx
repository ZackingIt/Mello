import { connect as connectOriginal } from 'react-redux';

import React from 'react';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider,
         DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './card';
import Masonry from 'react-masonry-component';
import { moveCard } from '../actions/card_actions';

var myState = {starting: {}, ending: {}};

const cardSource = {
  beginDrag(props) {

    myState = merge(myState, {starting: props});
    return {
      card_id: props.id,
      cardIndex: props.cardIndex,
      listIndex: props.listId,
    };
  },
};

const listSource = {
  beginDrag(props) {
    return {
      list_id: props.listId,
      listTarget: props.listObj.ord
    };
  },
};

const style = {
  border: 'none',
  padding: '0px',
  marginBottom: '.5rem',
  backgroundColor: 'none',
  cursor: 'pointer',
  opacity: 1.0,
};

const ItemTypes = {
  CARD: 'card',
  LIST: 'list',
};

const listTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    return { moved: true };
  },

  hover(props, monitor, component) {
    const listStartingIndex = monitor.getItem().listTarget;
    const listHoverIndex = props.listTarget;

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

  },
};


class List extends React.Component{
  constructor(props){
    super(props);
    this.state = { cardBody: "", listId: props.listId,
                   ord: values(props.listObj.cardIds).length };
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleCreateCardBodyChange = this.handleCreateCardBodyChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleCreateCard(e) {
    e.preventDefault();
    this.props.createCard(this.state.listId, this.state.ord,
                          this.state.cardBody);
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

  handleEnter(e){
    if (e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      this.props.createCard(this.state.listId, this.state.ord,
                            this.state.cardBody);
    }
  }

  render(){
    if (!this.props.listObj) {
      return <div key={ Math.random()*100 }></div>;
    }

    const opacity = 1;
    const listTitle = this.props.listObj.title;
    const { isDragging, connectDragSource,
            connectDropTarget, hovering } = this.props;
    const allCards = this.props.cards;
    const cardsBodyArray = this.props.listObj.cardIds.map( (cardId, idx) => {
      let currentCard = allCards[cardId];
        return (
            <div key={ idx }>
              <Card
                hovering={ hovering }
                id={ cardId}
                handleCardEditSubmit={ this.props.handleCardEditSubmit }
                listId={ this.state.listId }
                cardIndex={ this.props.listObj.cardIds.indexOf(cardId) }
                body={ currentCard.body }/>
            </div>
        );
      }
    );

    //async code
    // let cardsBodyArray = [];
    // for (let key in this.props.cards) {
    //   if ( this.props.cards[key].list_id == this.props.listId ){
    //     let newObj = this.props.cards[key];
    //     newObj.id = key;
    //     cardsBodyArray.push(newObj);
    //   }
    // }
    //
    // function compare(a,b) {
    //   return (parseInt(a.ord) - parseInt(b.ord));
    // }
    //
    // cardsBodyArray.sort(compare);
    // let sortedWrappedCardArray = [];
    // sortedWrappedCardArray = cardsBodyArray.map( ( currentCard ) => {
    //   debugger
    //   return (<Card key={Math.random()*100} id={parseInt(currentCard.id)} listId={parseInt(this.state.listId)} cardIndex={currentCard.ord} body={currentCard.body}/>);
    // });

    var bodyLength = 70;

    let listElement = (
      <section className="list-element">
        <div className="list-title-element">
          { listTitle }
        </div>
        <div className="card-array-element">
          { /* { sortedWrappedCardArray } */ }
          { cardsBodyArray }
        </div>
        <form className="add-card-button-container"
          onKeyPress={ this.handleEnter }
          onSubmit={ this.handleCreateCard }>
          <textarea style={ {'height': bodyLength + 'px'} }
            onChange={ this.handleCreateCardBodyChange }
            className="add-card-input-element"
            value={ this.state.cardBody }/>
          <button
            type="submit"
            className="add-card-button-element">
            Add
          </button>
        </form>
      </section>);

      return (
        connectDragSource(connectDropTarget(
          <div style={ Object.assign({ opacity }, style) }>
            { listElement }
          </div>
        ))
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
  return {};
};

export default connectOriginal(null, mapDispatchToProps)(
  DragSource(ItemTypes.CARD, cardSource, connectSource)(
  DropTarget(ItemTypes.LIST, listTarget, connectTarget)(List))
);
