import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CARD = "RECEIVE_CARD";

export const receiveCard = (response) => {
  return {
    type: RECEIVE_CARD,
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
