import { connect as connectOriginal } from 'react-redux';

import React from 'react';
import { values, merge } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './card';
import Masonry from 'react-masonry-component';
import { moveCard } from '../actions/card_actions';

var myState = {starting: {}, ending: {}};

const cardSource = {
  beginDrag(props) {

    myState = merge(myState, {starting: props});
    console.log("starting LIST state");
    console.log(myState);

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
  cursor: 'move',
};

const ItemTypes = {
  CARD: 'card',
  LIST: 'list',
};

const listTarget = {
  drop(props, monitor, component) {
    console.log("LIST DROP TARGET ACTIVIATED");
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    // console.log(props)
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
    console.log("LIST INDEX PROPS");
    console.log(props);


    // // console.log("my listTarget Starting Index below");
    // // console.log(listStartingIndex);
    //
    // // console.log("my listHover Index below (maybe)");
    // // console.log(listHoverIndex);

    // if (listStartingIndex === listHoverIndex) {
    //   return;
    // }
    //
    // // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    //
    // // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //
    // // Determine mouse position
    // const clientOffset = monitor.getClientOffset();
    //
    // // Get pixels to the top
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    //
    // // Only perform the move when the mouse has crossed half of the items height
    // // When dragging downwards, only move when the cursor is below 50%
    // // When dragging upwards, only move when the cursor is above 50%
    //
    // // Dragging downwards
    // if (listStartingIndex < listHoverIndex && hoverClientY < hoverMiddleY) {
    //   return;
    // }
    //
    // // Dragging upwards
    // if (listStartingIndex > listHoverIndex && hoverClientY > hoverMiddleY) {
    //   return;
    // }

  },
};


class List extends React.Component{
  constructor(props){
    super(props);
    // console.log("my constructor props below")
    // console.log(props)
    this.state = {cardBody: "", listId: props.listId, ord: values(props.listObj.cardIds).length};
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleCreateCardBodyChange = this.handleCreateCardBodyChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleCreateCard(e) {
    e.preventDefault();
    this.props.createCard(this.state.listId, this.state.ord, this.state.cardBody);
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
      this.props.createCard(this.state.listId, this.state.ord, this.state.cardBody);
    }
  }


  //arguments of bind are evaluated when bind is invoked(at moment of binding, not onclick)
  //therefore putting params in bind when the params are async is dangerous -- binding will not sync with params
  //our method here works because render is re-called, so bind is re-bound at every keystroke.

  render(){
    if (!this.props.listObj) {
      return <div key={Math.random()*100}></div>;
    }

    const opacity = isDragging ? 0 : 1;

    const listTitle = this.props.listObj.title;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    const allCards = this.props.cards;
    // console.log("higher ord props of specific list");
    // console.log(this.props);
    const cardsBodyArray = this.props.listObj.cardIds.map( (cardId) => {
      const currentCard = allCards[cardId];
      // return ( <div key={cardId} className="card-item-element"> {currentCard.body} </div> );
      return (
        // connectDragSource(connectDropTarget(
          <div>
            <Card
              key={Math.random()*100}
              id={cardId}
              handleCardEditSubmit={this.props.handleCardEditSubmit}
              listId={this.state.listId}
              cardIndex={this.props.listObj.cardIds.indexOf(cardId)}
              body={currentCard.body}/>
          </div>
        // ))
      );
    });
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
    // // console.log("my card body array before sorting");
    // // console.log(cardsBodyArray);
    // cardsBodyArray.sort(compare);
    // // console.log("my card body array after sorting");
    // // console.log(cardsBodyArray);
    // let sortedWrappedCardArray = [];
    // sortedWrappedCardArray = cardsBodyArray.map( ( currentCard ) => {
    //   debugger
    //   // // console.log("my listObj card indices are below")
    //   // // console.log(this.props.listObj.cardIds.indexOf(parseInt(currentCard.id)))
    //   return (<Card key={Math.random()*100} id={parseInt(currentCard.id)} listId={parseInt(this.state.listId)} cardIndex={currentCard.ord} body={currentCard.body}/>);
    // });

    var bodyLength = 70;

    let listElement = (
      <section className="list-element">
        <div className="list-title-element">
          {listTitle}
        </div>
        <div className="card-array-element">
          {/* { sortedWrappedCardArray } */}
          {cardsBodyArray}
        </div>
        <form className="add-card-button-container" onKeyPress={ this.handleEnter } onSubmit={this.handleCreateCard}>
          <textarea style={{'height': bodyLength + 'px'}} onChange={this.handleCreateCardBodyChange} className="add-card-input-element" value={this.state.cardBody}/>
          <button type="submit" className="add-card-button-element">Add</button>
        </form>
      </section>);

      return (
        connectDragSource(connectDropTarget(
          <div style={Object.assign({ opacity }, style)}>
            {listElement}
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


// export default (
//   DragSource( ItemTypes.CARD, cardSource, connectSource)(
//     DropTarget(ItemTypes.LIST, listTarget, connectTarget)(List))
// );

const mapDispatchToProps = (dispatch) => {
  return {};
};



export default connectOriginal(null, mapDispatchToProps)(
  DragSource( ItemTypes.CARD, cardSource, connectSource)(
  DropTarget(ItemTypes.LIST, listTarget, connectTarget)(List))
);
