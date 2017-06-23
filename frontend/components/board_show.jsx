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
    this.props.requestBoard(id);
  }

  componentWillReceiveProps(nextProps){
    //this props refers to old props;
    //newProps

    //BECAUSE my rquestBoard isn't working my i'm not able to update my props
    //this is causing everything elseto fail.
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
      let locationString = (nextProps.location.pathname || "");
      const id = parseInt(locationString.slice(locationString.length-1));
      this.props.requestBoard(id);
      console.log("REQUESTED NEW BOARD, ID of " + id);
    }
  }



  render(){
    const {board, lists, cards} = this.props;
    // console.log("PROPS");
    // console.log(this.props);
    // if we haven't fetched the board yet, it won't have all of its information
    // some of these keys may be undefined until after the fetch comes back
    // set reasonable defaults, either here or in the container


    // let listTitleArray = [];
    //driving me crazy:  can't even check board["title"] being undefined
    if (board){
      var boardTitle = board["title"];
    }

    if (Object.values(lists).length > 0){
      var listTitleArray = Object.values(lists).map( (list) => {
        return list["title"];
      });
    }

    if (Object.values(cards).length > 0){
      var cardBodyArray = Object.values(cards).map( (card) => {
        return card["body"];
      });
    }


    return (
      <div>
        Sup Dawg
        {boardTitle}
        {listTitleArray}
        {cardBodyArray}
      </div>
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
    }
  };

};


export default connect(mapStateToProps, mapDispatchToProps)(BoardShow);
