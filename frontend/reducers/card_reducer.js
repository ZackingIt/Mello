import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD, UPDATE_CARD, EDIT_CARD, CREATE_DROPZONE }
from '../actions/card_actions';
import { LOGOUT } from '../actions/session_actions';

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

      //erroneous code
      // newCard = action.response.cardLoad;
      // newState = merge({}, state, {[newCard.id]: newCard});
      // return newState;

      // new try
      newCard = action.response.cardLoad;
      console.log("NEW CARD ID");

      if (newCard.id){
        console.log("UPDATE CARD STATE");
        console.log(action.response);
        console.log(newCard.id);
        console.log("NEW CARD is possibly Starting");
        console.log(newCard);
        console.log("my current state");
        console.log(state);
        newState = merge({}, state, {[newCard.id]: { id: parseInt(newCard.id),
                         list_id: parseInt(newCard.list_id),
                         ord: parseInt(newCard.ord),
                         body: newCard.body
                        }});
        console.log("new state");
        console.log(newState);
        return newState;
      } else {
        return state;
      }
      // potential code
      // console.log("my action response");
      // console.log(action.response);
      // return action.response.cardLoad;
    case EDIT_CARD:
      if (action.response){
        newCard = action.response;
        newState = merge({}, state, {[newCard.id]: newCard});
        return newState;
      } else {
        return state;
      }
    case LOGOUT:
        return {};
    case "IGNORE":
      return state;
    default:
      return state;
  }
};

export default cardReducer;
