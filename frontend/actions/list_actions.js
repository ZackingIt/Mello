import * as APIUtil from '../util/session_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";
export const EDIT_LIST = "EDIT_LIST";

export const receiveList = (response) => {
  return {
    type: RECEIVE_LIST,
    response: response,
  };
};

export const receiveListEdit = (response) => {
  return {
    type: EDIT_LIST,
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


export const editListText = ( listParams ) => {

  return (dispatch) => {
    APIUtil.editList(listParams).then( response => {
      dispatch(receiveListEdit(response));
    });
  };
};
