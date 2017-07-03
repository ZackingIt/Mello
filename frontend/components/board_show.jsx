import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';

import Header from './head/header';
import List from './list';

import { requestBoard } from '../actions/board_actions';
import { createList } from '../actions/list_actions';
import { createCard, receiveCardEdit, editCardText } from '../actions/card_actions';
import onClickOutside from 'react-onclickoutside';
import Masonry from 'react-masonry-component';



class BoardShow extends React.Component{
  constructor(props){
    super(props);
    this.state = { listTitle: ""};
    this.handleCreateListTitleChange = this.handleCreateListTitleChange.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleCreateListTitleChange(e){
    e.preventDefault();
    this.setState( { listTitle: e.currentTarget.value } );
  }

  handleCreateList(e) {
    e.preventDefault();
    const boardId = parseInt(this.props.match.params.id);
    this.props.createList(boardId, this.props.board.listIds.length, this.state.listTitle);
    this.setState( { listTitle: "" } );
  }

  handleEnter(e){
    console.log(e);
    if (e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      const boardId = parseInt(this.props.match.params.id);
      this.props.createList(boardId, this.props.board.listIds.length, this.state.listTitle);
      this.setState( { listTitle: "" } );
    }
  }

  componentDidMount(){
    let boardId = parseInt(this.props.match.params.id);
    this.props.requestBoard(boardId);
  }

  componentWillReceiveProps(nextProps){
    const nextPropsId = nextProps.match.params.id;
    if (this.props.match.params.id !== nextPropsId) {
      this.props.requestBoard(parseInt(nextPropsId));
    }
  }

  render() {
    const {board, lists, cards} = this.props;
    let outputListArray = [];
    let addCardElement = (
                <form value="Add a List" onSubmit={this.handleCreateList} className="add-list-button-container">
                  <div className="add-list-title">
                    Add a List
                  </div>
                  <textarea onKeyPress={ this.handleEnter } onChange={this.handleCreateListTitleChange} className="add-list-input-element" value={this.state.listTitle} />
                  <button type="submit" className="add-list-button-element">Save</button>

                </form>)
    let boardTitle = "";
    if ((Object.keys(lists).length > 0) && board && (parseInt(this.props.match.params.id) === parseInt(board.id) )) {
      boardTitle = (this.props.board.title || "");
      for (let key in lists) {
        let listObj = lists[key];
        outputListArray.push(
          <List key={Math.random()*1000}
          handleCardEditSubmit={this.props.handleCardEditSubmit}
          createCard={this.props.createCard}
          listId={parseInt(key)}
          listObj={listObj}
          cards={cards}/>);
      }
    }
    outputListArray.push(addCardElement);

  var masonryOptions = {
    transitionDuration: 0,
    gutter: 3,
    fitWidth: true,
    horizontalOrder: true,
    stagger: 300,

  };

    return (
      <section className="board-show-wrapper">
        <div className="board-show-title">
          {boardTitle}
        </div>
        <div className="board-show-container">
          <Masonry
            className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
          {outputListArray}

          </Masonry>
        </div>
      </section>

    );
  }
}



//how do i know what my state is initially?
//why doesn't mapstateToProps run on page load? re: debugger?

const mapStateToProps = (state, ownProps) => {
  // remember that state is the GLOBAL state
  // state.boards is the return of the entire boardReducer

  let ownLists = {};
  for (let key in state.lists){
    if (key === ownProps.match.params.id){
      ownLists[key] = state.lists[key];
    }
  }

  return {
    board: state.boards[ownProps.match.params.id],
    lists: state.lists, // select the lists for this board - write a SELECTOR
    cards: state.cards, // select the cards for these lists
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    requestBoard: (id) => {
      return dispatch(requestBoard(id));
    },
    createList: (board_id, ord, title) => {
      return dispatch(createList({ board_id: board_id, ord: ord, title: title} ));
    },
    handleCardEditSubmit: (card_id, body, list_id, order) => {
      // console.log("HANDLE CARD EDIT SUBMIT IS FIRING FROM FOUR LAYERS DOWN");
      return dispatch( editCardText( {id: card_id, body: body, list_id: list_id, order: order }) );

    },
    createCard: (list_id, ord, body) => {
      return dispatch(createCard({ list_id: list_id, ord: ord, body: body, due_date: null, completed: false } ));
    },

  };

};


export default connect(mapStateToProps, mapDispatchToProps)(BoardShow);
