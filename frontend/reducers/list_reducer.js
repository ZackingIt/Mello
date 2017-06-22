import { RECEIVE_BOARD } from '../actions/board_index_actions';
import { merge } from 'lodash';

const listReducer = (state = {}, action) => {
  Object.freeze(state);
  let output;

  switch (action.type){
    case RECEIVE_BOARD:
    if (action.response.lists === undefined) {
      output = {};
    } else {
      output = action.response.lists;
    }
      return merge({}, state, output);
    default:
      return state;
  }
};

export default listReducer;
