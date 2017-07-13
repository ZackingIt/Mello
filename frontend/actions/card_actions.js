import * as APIUtil from '../util/session_api_util';

import { values } from 'lodash';

export const RECEIVE_CARD = "RECEIVE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const CREATE_DROPZONE = "CREATE_DROPZONE";


export const receiveCard = (response) => {
  return {
    type: RECEIVE_CARD,
    response: response,
  };
};

export const updateCard = (response) => {
  if (values(response).length === 0){
    return {
      type: "IGNORE",
      response: {},
    };
  }
  // need to deal with empty case
  return {
    type: UPDATE_CARD,
    response: response,
  };
};

export const createDropZone = (dropParams) => {
  return {
    type: CREATE_DROPZONE,
    response: dropParams,
  };
};

export const receiveCardEdit = (response) => {
  return {
    type: EDIT_CARD,
    response: response,
  };
};

export const createCard = (cardParams) => {
  return (dispatch) => {
    APIUtil.createCard(cardParams).then( response =>{
      dispatch(receiveCard(response));
    });
  };
};


export const moveCard = (cardParams) => {
  return (dispatch) => {
    APIUtil.moveCard(cardParams).then( response =>{
      dispatch(updateCard(response));
    });
  };
};

export const generateDropZone = (dropParams) => {
  
  return (dispatch) => {
    dispatch(createDropZone(dropParams));
  };
};

export const editCardText = ( cardParams ) => {

  return (dispatch) => {
    APIUtil.editCard(cardParams).then( response => {
      dispatch(receiveCardEdit(response));
    });
  };
};
