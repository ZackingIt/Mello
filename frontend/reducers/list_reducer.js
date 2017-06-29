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
      parentList = state[newCard.list_id]; //accessing only the single corresponding list of the new card.
      newState = merge({}, state, {[newCard.list_id]: parentList}); //duping the new state
      newState[newCard.list_id].cardIds.push(action.response.card.id); //this allows our later JSX component to update new cards on re-render
      return newState;
    case UPDATE_CARD:
      newState = merge({}, state); //duping the new state

      // for (let key in newState){
      //   newState[key].cardIds.remove(parseInt(action.response.starting.id));
      //   if (parseInt(key) == parseInt(action.response.ending.listId)) {
      //     newState[key].cardIds.forEach((cardId) => {
      //       if (cardId == parseInt(action.response.ending.id)){
      //         newState[key].cardIds.splice(newState[key].cardIds.indexOf(cardId)+1, 0, parseInt(action.response.starting.id));
      //       }
      //     });
      //     newState[key].cardIds.push(action.response.id);
      //   }
      // }
      newState[action.response.cardLoad.starting.listId].cardIds = action.response.cardIds.fromPile;
      newState[action.response.cardLoad.ending.listId].cardIds = action.response.cardIds.toPile;

      return newState;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default listReducer;
