import * as APIUtil from '../util/session_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";

export const receiveList = (response) => {
  return {
    type: RECEIVE_LIST,
    response: response,
  };
};

// export const requestLists = (dispatch) => {
//   return dispatch()
//
// }

export const createList = (listParams) => {
  // debugger
  return (dispatch) => {
    APIUtil.createList(listParams).then( response =>{
      // debugger
      dispatch(receiveList(response));
    });
  };
};
