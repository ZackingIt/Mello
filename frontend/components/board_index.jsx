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
    console.log("My props for board index");
    console.log(this.props);
    const {boards, lists, cards} = this.props;
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

      return(
        <div>
          <div className="board-index-section">
            <div className="board-index-header">
              <i className="fa fa-user-o"></i>
              <text className="board-index-header-text"> Personal Boards </text>
            </div>
            <div className="board-index-container">
              {boardLinkArray}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {

  return {
    boards: state.boards,
    lists: state.lists,
    cards: state.cards,
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
