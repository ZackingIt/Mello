import { RECEIVE_USERS } from '../actions/user_actions';
import { RECEIVE_BOARD } from '../actions/board_actions';

const UserReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD:
      return action.response.user_sharing;
    case RECEIVE_USERS:
      return action.response;
    default:
      return state;
  }
};

export default UserReducer;
