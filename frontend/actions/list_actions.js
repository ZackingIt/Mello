import * as APIUtil from '../util/session_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";

export const receiveList = (response) => {
  return {
    type: RECEIVE_LIST,
    response: response,
  };
};

export const createList = (listParams) => {
  return (dispatch) => {
    APIUtil.createList(listParams).then( response =>{
      dispatch(receiveList(response));
    });
  };
};
