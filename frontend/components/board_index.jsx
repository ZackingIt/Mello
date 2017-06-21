import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestBoard,  } from '../actions/board_index_actions';
import { values } from 'lodash';
import Header from './header';

class BoardIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestBoard();
    // debugger
  }

  render(){
    const {boards, lists, cards} = this.props;
    if (boards === undefined){
      return null;
    } else {
      var currentBoardArray = values(boards).map( (board) => {
        return board.title;
      });
    }
      return(
        <div>
          <Header boardMenu={currentBoardArray}/>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  // debugger
  return {
    boards: state.boards,
    lists: state.lists,
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestBoard: () => {
      return dispatch(requestBoard());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
