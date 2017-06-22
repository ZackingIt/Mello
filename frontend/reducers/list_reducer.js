import { RECEIVE_BOARD } from '../actions/board_index_actions';
import { merge } from 'lodash';

const listReducer = (state = {}, action) => {
  Object.freeze(state);
  let output;
  // debugger
  // action.response.lists
  switch (action.type){
    case RECEIVE_BOARD:
    if (action.response.lists === undefined) {
      console.log("it is indeed undefined");
      output = {};
    } else {
      output = action.response.lists;
    }
      return merge({}, state, output);
      // return merge({}, state, output); //could merge return something weird?
    default:
      return state;
  }
};

export default listReducer;
