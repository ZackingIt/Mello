import { RECEIVE_BOARD } from '../actions/board_actions';
import { merge } from 'lodash';

const listReducer = (state = {}, action) => {
  Object.freeze(state);
  let output;

  switch (action.type){
    case RECEIVE_BOARD:
    if (action.response.lists === undefined) {
      output = {};
    } else {
      // debugger
      output = action.response.lists;
    }
      // debugger
      return output;
      // return merge({}, state, output);
      // we need to merge in the new lists with the old
    default:
      return state;
  }
};

export default listReducer;
