import { RECEIVE_BOARD } from '../actions/board_actions';
import { RECEIVE_CARD } from '../actions/card_actions';
import { RECEIVE_LIST } from '../actions/list_actions';


import { merge } from 'lodash';

const listReducer = (state = {}, action) => {
  Object.freeze(state);
  let output;

  switch (action.type){
    case RECEIVE_BOARD:
    if (action.response.lists === undefined) {
      output = {};
    } else {
      output = action.response.lists;
    }
      return output;
      // we need to merge in the new lists with the old
    case RECEIVE_LIST:
    if (action.response.list === undefined) {
      output = {};
    } else {

      output = action.response.list;
    }
      return merge({}, state, output);

    case RECEIVE_CARD:
      return {};
      //SHOULDNT THIS BREAK???
      //why doesn't my list reducer need to know anything??  still works..


    default:
      return state;
  }
};

export default listReducer;
