import * as APIUtil from '../util/session_api_util';
export const ADD_USER_TO_BOARD = 'ADD_USER_TO_BOARD';


export const boardShare = (response) => {
  return {
    type: ADD_USER_TO_BOARD,
    response: response
  };
};

export const addUserToBoard = (boardShareParams) => {
  return (dispatch) => {
    APIUtil.addUserToBoard(boardShareParams).then( response =>{
      dispatch(boardShare(response));
    });
  };
};
