import * as APIUtil from '../util/session_api_util';

import { values } from 'lodash';

export const RECEIVE_CARD = "RECEIVE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const EDIT_CARD = "EDIT_CARD";

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
  return {
    type: UPDATE_CARD,
    response: response,
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


export const moveCard = (APIParams, cardParams) => {


  return (dispatch) => {
    dispatch(updateCard(cardParams));
    APIUtil.moveCard(APIParams).then( response => {
      dispatch(updateCard(response));
    });
  };
};

export const renderCardMove = (cardParams) => {
  // dispatch(updateCard(earlyResponse))
  // need cardParams for cardIds{fromPile: array ofIds} -- we don't rely on the
  // card params input whatsoever
  //desired format is same as the response format under my response zy
  //which is a hash containing fromPile, toPile keys, pointing to an array of card ids
  //

  return (dispatch) => {
    dispatch(updateCard(cardParams));
  };
};


export const editCardText = ( cardParams ) => {

  return (dispatch) => {
    APIUtil.editCard(cardParams).then( response => {
      dispatch(receiveCardEdit(response));
    });
  };
};
