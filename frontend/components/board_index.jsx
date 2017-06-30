import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestBoards,  } from '../actions/board_actions';
import { values, keys } from 'lodash';
import Header from './head/header';

class BoardIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestBoards();
  }

  render(){
    // console.log("My props for board index");
    // console.log(this.props);
    const {boards, lists, cards, shared_boards} = this.props;
    // console.log(shared_boards);
    if (Object.keys(boards).length === 0){
      return null;
    } else {
      var boardLinkArray = [];
      var boardShareLinkArray = [];
    for (let key in boards){
        boardLinkArray.push(
            <Link key={key} className="board-index-link" to={`/board/${key}`}>
              {boards[key].title}
            </Link>
        );
      }
    for (let key in shared_boards){
        boardShareLinkArray.push(
            <Link key={key} className="board-index-link" to={`/board/${key}`}>
              {shared_boards[key].title}
            </Link>
        );
      }

      return(
        <div>
          <div className="board-index-section">
            <div className="board-index-header">
              <i className="fa fa-user-o"></i>
              <text className="board-index-header-text"> Personal and Recent Boards </text>
            </div>
            <div className="board-index-container">
              {boardLinkArray}
            </div>
            <div className="board-index-header">
              <i className="fa fa-users"></i>
              <text className="board-index-header-text"> Shared Boards </text>
            </div>

            <div className="board-index-container-shared-boards">
              {boardShareLinkArray}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  // console.log("my state in board index");
  // console.log(state);
  return {
    boards: state.boards,
    lists: state.lists,
    cards: state.cards,
    shared_boards: state.shared_boards,  //problematic
  };

};

const mapDispatchToProps = dispatch => {
  return {
    requestBoards: () => {
      return dispatch(requestBoards());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
