import React from 'react';
import Header from './head/header';
import {requestBoard} from '../actions/board_actions';
import { connect } from 'react-redux';
import { values } from 'lodash';

class BoardShow extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let locationString = this.props.location.pathname;
    const id = parseInt(locationString.slice(locationString.length-1));
    // debugger;
    // console.log(id);
    this.props.requestBoard(id);
  }

  componentWillReceiveProps(nextProps){
//this props refers to old props;
//newProps

  };



  render(){
    const {board, lists, cards} = this.props;
    // if we haven't fetched the board yet, it won't have all of its information
    // some of these keys may be undefined until after the fetch comes back
    // set reasonable defaults, either here or in the container
    let listTitleArray = [];
    let boardTitle = (board["title"] || "");
    if (Object.values(lists).length > 0){
      listTitleArray = Object.values(lists).map( (list) => {
        return list["title"];
      });
    }

    return (
      <div>
        {boardTitle}
        {listTitleArray}
        Sup Dawg
      </div>
    );
  }
}

//how do i know what my state is initially?
//why doesn't mapstateToProps run on page load? re: debugger?
const mapStateToProps = (state, ownProps) => {
  // remember that state is the GLOBAL state
  // state.boards is the return of the entire boardReducer
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
    }
  };

};


export default connect(mapStateToProps, mapDispatchToProps)(BoardShow);
