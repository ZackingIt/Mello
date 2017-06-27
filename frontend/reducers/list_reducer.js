import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD, UPDATE_CARD } from '../actions/card_actions';
import { RECEIVE_LIST } from '../actions/list_actions';


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
      // console.log("LIST REDUCER: my previous state prior to card update")
      // console.log(newState);
      for (let key in newState){
        newState[key].cardIds.remove(action.response.id);
        if (key == action.response.list_id) {
          newState[key].cardIds.push(action.response.id);
        }
      }
      // console.log("LIST REDUCER: my post state after update")
      // console.log(newState);

      return newState;

    default:
      return state;
  }
};

export default listReducer;
