import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestBoardIndex,  } from '../actions/board_index_actions';


class BoardIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestBoardIndex();
  }

  render(){
    if (this.props.boardIndex.data.boards !== undefined){
      var currentBoardArray = this.props.boardIndex.data.boards.map( (board) => {
        return board.title;
      });
    }

      return(
        <div>
          {currentBoardArray}
        </div>
      );
    }
}

const mapStateToProps = ({boardIndexReducer}) => {
  // console.log("below is your mapped state to board index");
  // console.log(boardIndex);
  return {
    boardIndex: boardIndexReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestBoardIndex: () => {
      return dispatch(requestBoardIndex());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
