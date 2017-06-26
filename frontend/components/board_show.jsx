import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';

import Header from './head/header';
import List from './list';

import { requestBoard } from '../actions/board_actions';
import { createList } from '../actions/list_actions';
import { createCard } from '../actions/card_actions';


class BoardShow extends React.Component{
  constructor(props){
    super(props);
    this.state = { listTitle: ""};
    this.handleCreateListTitleChange = this.handleCreateListTitleChange.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
  }

  handleCreateListTitleChange(e){
    e.preventDefault();
    this.setState( { listTitle: e.currentTarget.value } );
  }

  handleCreateList(e) {
    e.preventDefault();
    const boardId = parseInt(this.props.match.params.id);
    this.props.createList(boardId, this.props.board.listIds.length, this.state.listTitle);
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
    let boardTitle="";
    if (Object.keys(lists).length === 0) {
        //Most restrictive check for mapped state to props.  If (lists) doesn't work here.
    } else {
      boardTitle = this.props.board.title;
      for (let key in lists) {
        let listObj = lists[key];

        outputListArray.push(<List key={key} createCard={this.props.createCard} listId={parseInt(key)} listObj={listObj} cards={cards}/>);
      }
    }
    return (
      <section className="board-show-wrapper">
        <div className="board-show-title">
          {boardTitle}
        </div>
        <div className="board-show-container">
          {outputListArray}
            <div className="add-list-button-container">
              <input onChange={this.handleCreateListTitleChange} className="add-list-input-element" value={this.state.listTitle}/>
              <button onClick={this.handleCreateList} className="add-list-button-element">Add List</button>

            </div>
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
  // debugger

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
    createList: (board_id, order, title) => {
      return dispatch(createList({ board_id: board_id, order: order, title: title} ));
    },
    createCard: (list_id, order, body) => {
      return dispatch(createCard({ list_id: list_id, order: order, body: body, due_date: null, completed: false } ));
      //where is card: card: being set?
    },
    moveCardThunk: ( list_id, starting_card_index, ending_card_index ) => {
      return dispatch(moveCardThunk( { list_id: list_id, starting_card_index: starting_card_index, ending_card_index: ending_card_index } ));

    }
  };

};


export default connect(mapStateToProps, mapDispatchToProps)(BoardShow);
