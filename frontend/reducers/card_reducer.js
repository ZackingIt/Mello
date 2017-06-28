import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD, UPDATE_CARD, EDIT_CARD } from '../actions/card_actions';

import { merge } from 'lodash';

const cardReducer = (state = {}, action) => {
  Object.freeze(state);

  let output;
  let newCard;
  let newState;
  switch (action.type){
    case RECEIVE_BOARD:
    if (action.response.cards === undefined) {
      output = {};
    } else {
      output = action.response.cards;
    }
      return output;
    case RECEIVE_CARD:
      newCard = action.response.card;
      newState = merge({}, state, {[newCard.id]: newCard});
      return newState;
    case UPDATE_CARD:
      console.log("my prior state");
      console.log(state);
      newCard = action.response.cardLoad;
      newState = merge({}, state, {[newCard.id]: newCard});
      console.log("my new state");
      console.log(newState);
      return newState;
    case EDIT_CARD:
      console.log("my EDIT CARD STATE");
      console.log(action.response);
      newCard = action.response;
      newState = merge({}, state, {[newCard.id]: newCard});
      return newState;
    case "IGNORE":
      return state;
    default:
      return state;
  }
};

export default cardReducer;
