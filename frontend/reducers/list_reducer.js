import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD } from '../actions/card_actions';
import { RECEIVE_LIST } from '../actions/list_actions';


import { merge } from 'lodash';

const listReducer = (state = {}, action) => {
  Object.freeze(state);
  let output;

  switch (action.type){
    case RECEIVE_BOARD:
      output = action.response.lists;
      return output;
      // we need to merge in the new lists with the old
    case RECEIVE_LIST:
      output = action.response.list;

      return merge({}, state, {[output.id]: output});

    case RECEIVE_CARD:
      const newCard = action.response.card;
      const parentList = state[newCard.list_id]; //accessing only the single corresponding list of the new card.
      const newState = merge({}, state, {[newCard.list_id]: parentList}); //duping the new state
      newState[newCard.list_id].cardIds.push(action.response.card.id); //this allows our later JSX component to update new cards on re-render
      return newState;
    default:
      return state;
  }
};

export default listReducer;
