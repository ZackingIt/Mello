import { RECEIVE_BOARD } from '../actions/board_index_actions';
import { merge } from 'lodash';

const cardReducer = (state = {}, action) => {
  Object.freeze(state);
  //debugger
  switch (action.type){
    case RECEIVE_BOARD:
    let output;
    if (action.response.cards === undefined) {
      console.log("cards it is indeed undefined");
      output = {};
    } else {
      output = action.response.cards;
    }
      return merge({}, state, output);
    default:
      return state;
  }
};

export default cardReducer;
