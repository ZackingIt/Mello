import { RECEIVE_USERS } from '../actions/user_actions';
import { RECEIVE_BOARD } from '../actions/board_actions';

import { merge } from 'lodash';


const UserReducer = (state = {}, action) => {
  let newState;
  console.log("My state before things chnage from the User Reducer");
  console.log(state);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD:
      newState = merge({}, state, action.response.user_sharing);
      console.log("Receive board from the user reducer is firing and the new state is");
      console.log(newState);
      return newState
    case RECEIVE_USERS:
      return merge({}, state, action.response); //could merge return something weird?    default:
    default:
      return state;
  }
};

export default UserReducer;
