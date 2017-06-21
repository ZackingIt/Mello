import { RECEIVE_BOARD_INDEX } from '../actions/board_index_actions';
import { merge } from 'lodash';

const listReducer = (state = {}, action) => {
  Object.freeze(state);
  //debugger
  switch (action.type){
    case RECEIVE_BOARD_INDEX:
      return action.lists; //could merge return something weird?
    default:
      return state;
  }
};

export default listReducer;
