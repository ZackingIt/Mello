
import React from 'react';
import { values, merge } from 'lodash';

import PropTypes from 'prop-types';
import { DragSource, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './card'


class List extends React.Component{
  constructor(props){
    super(props);

    this.state = {cardBody: "", listId: props.listId, order: values(props.listObj.cardIds).length};
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleCreateCardBodyChange = this.handleCreateCardBodyChange.bind(this);
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

  //arguments of bind are evaluated when bind is invoked(at moment of binding, not onclick)
  //therefore putting params in bind when the params are async is dangerous -- binding will not sync with params
  //our method here works because render is re-called, so bind is re-bound at every keystroke.

  render(){
    if (!this.props.listObj) {
      // TODO: render loading state here
      return <div>Loading...</div>;
    }
    const listTitle = this.props.listObj.title;
    const allCards = this.props.cards;
    const cardsBodyArray = this.props.listObj.cardIds.map( (cardId) => {
      const currentCard = allCards[cardId];
      // return ( <div key={cardId} className="card-item-element"> {currentCard.body} </div> );
      return (<Card key={cardId} body={currentCard.body}/>);
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
    return(
      <div> {listElement} </div>

    );


  }

}

export default List;
