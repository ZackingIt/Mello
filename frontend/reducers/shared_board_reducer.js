import { ADD_USER_TO_BOARD } from '../actions/board_share_actions';
import { merge } from 'lodash';


const BoardShareReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case ADD_USER_TO_BOARD:
      return merge({}, state, action.response); //could merge return something weird?    default:
    default:
      return state;
  }
};

export default BoardShareReducer;
