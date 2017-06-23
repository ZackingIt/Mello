import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestBoard,  } from '../actions/board_index_actions';
import { values, keys } from 'lodash';
import Header from './head/header';

class BoardIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.requestBoard();
  }

  render(){
    const {boards, lists, cards} = this.props;
    if (Object.keys(boards).length === 0){
      return null;
    } else {
      var boardLinkArray = [];
      var menuPropsArray = [];
        for (let key in boards){
          menuPropsArray.push(
            <Link to={`/boards/${key}`}>
              {boards[key].title}
            </Link>
          );
          boardLinkArray.push(
              <Link key={key} className="board-index-link" to={`/boards/${key}`}>
                {boards[key].title}
              </Link>
          );
        }


      }

      return(
        <div>
          <Header boardMenu={menuPropsArray}/>
          <div className="board-index-header">
            <i className="fa fa-user-o"></i>

            <text className="board-index-header-text"> Personal Boards </text>
          </div>
          <div className="board-index-container">
            {boardLinkArray}
          </div>
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
