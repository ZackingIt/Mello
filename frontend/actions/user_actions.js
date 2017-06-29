import * as APIUtil from '../util/session_api_util';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUsers = (response) => {
  return {
    type: RECEIVE_USERS,
    response: response
  };
};

export const requestUsers = () => {
  return (dispatch) => {
    return APIUtil.fetchUsers()
      .then(data => {
        return dispatch(receiveUsers(data));
      }
    );
  };
};
