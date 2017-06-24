
import React from 'react';
import { values, merge } from 'lodash';

class List extends React.Component{
  constructor(props){
    super(props);
    // this.state = {cardParams: { listId: props.listId, order: null, body: "", due_date: null, completed: false } };
    this.state = {cardBody: "", listId: props.listId, order: values(this.props.listObj).length};
    this.handleCreateCard = this.handleCreateCard.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleCreateCard(e) {
    e.preventDefault();
    this.props.createCard(this.state.listId, this.state.order, this.state.cardBody);
  }

  handleBodyChange(e){
    e.preventDefault();
    // const newCardParams = merge({}, this.state.cardParams, {body: e.currentTarget.value});
    this.setState({
      cardBody: e.currentTarget.value,
    });
  }



  //arguments of bind are evaluated when bind is invoked(at moment of binding, not onclick)
  //therefore putting params in bind when the params are async is dangerous -- binding will not sync with params
  //our method here works because render is re-called, so bind is re-bound at every keystroke.


  render(){
    // //console.log("my specific list obj below");
    console.log(this.props.listObj);
    let listTitle = this.props.listObj.title;
    let cardsBodyArray = this.props.listObj.cardIds.map( (cardId) => {
      const currentCard = this.props.cards[cardId];
      //console.log(currentCard)
      return ( <div className="card-item-element"> {currentCard.body} </div> );
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
          <input onChange={this.handleBodyChange} className="add-card-input-element" value={this.state.cardBody}/>
          <button onClick={this.handleCreateCard} className="add-card-button-element">Add Card</button>
        </div>
      </section>);
    // //console.log(cards);
    return(
      <div> {listElement} </div>

    );


  }

}

export default List;
