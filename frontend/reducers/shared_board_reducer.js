import { ADD_USER_TO_BOARD } from '../actions/board_share_actions';
import { RECEIVE_BOARD_INDEX } from '../actions/board_actions';
import { merge } from 'lodash';


const sharedBoardReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case ADD_USER_TO_BOARD:
      return state;
    case RECEIVE_BOARD_INDEX:
      return merge({}, state, action.shared_boards);
    default:
      return state;
  }
};

export default sharedBoardReducer;
