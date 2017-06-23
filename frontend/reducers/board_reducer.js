import { RECEIVE_BOARD_INDEX, REMOVE_BOARD, RECEIVE_BOARD } from '../actions/board_actions';
import { merge } from 'lodash';

const boardReducer = (state = {}, action) => {
  Object.freeze(state);
  //state here should be the partial state of boards: stuff
  //we are only returning the partial state back to the root reducer;

  switch (action.type){
    case RECEIVE_BOARD_INDEX:
      return action.boards; //could merge return something weird?
    case RECEIVE_BOARD:
      return merge({}, state, {[action.response.board.id]: action.response.board});
    case REMOVE_BOARD:
      let newState = merge({}, state);
      delete newState[action.boardId]; //check for boardId
      return newState;
    default:
      return state;
  }
};

export default boardReducer;
