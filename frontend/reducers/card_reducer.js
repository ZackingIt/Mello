import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD } from '../actions/card_actions';

import { merge } from 'lodash';

const cardReducer = (state = {}, action) => {
  Object.freeze(state);
  //debugger
  let output;
  switch (action.type){
    case RECEIVE_BOARD:
    if (action.response.cards === undefined) {
      output = {};
    } else {
      output = action.response.cards;
    }
      return output;
    case RECEIVE_CARD:
    //console.log("receive card action response BELOW.  Use for structuring your state output");
    //console.log(action.response);
    if (action.response.card === undefined) {
      output = {};
    } else {
      output = action.response.card;
    }
    return output;
    default:
      return state;
  }
};

export default cardReducer;
