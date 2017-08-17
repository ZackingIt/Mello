import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD, UPDATE_CARD } from '../actions/card_actions';
import { RECEIVE_LIST } from '../actions/list_actions';
import { LOGOUT } from '../actions/session_actions';


import { merge } from 'lodash';

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


const listReducer = (state = {}, action) => {
  Object.freeze(state);
  let output;
  let newCard;
  let parentList;
  let newState;
  let newParent;
  switch (action.type){
    case RECEIVE_BOARD:
      output = action.response.lists;
      return output;
      // we need to merge in the new lists with the old
    case RECEIVE_LIST:
      output = action.response.list;

      return merge({}, state, {[output.id]: output});

    case RECEIVE_CARD:
      newCard = action.response.card;
      parentList = state[newCard.list_id];
      newState = merge({}, state, {[newCard.list_id]: parentList});
      newState[newCard.list_id].cardIds.push(action.response.card.id);
      return newState;
    case UPDATE_CARD:
      newState = merge({}, state);
      let res = action.response;
      newState[res.cardLoad.starting.listId].cardIds = res.cardIds.fromPile;
      newState[res.cardLoad.ending.listId].cardIds = res.cardIds.toPile;
      return newState;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default listReducer;
