import * as APIUtil from '../util/session_api_util';
export const RECEIVE_BOARD_INDEX = "RECEIVE_BOARD_INDEX";
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';

import { hashHistory } from 'react-router';


export const receiveBoards = (data) => {
  // debugger
  return {
    type: RECEIVE_BOARD_INDEX,
    boards: data.boards,
    lists: data.lists,
    cards: data.cards
  };
};

export const removeBoard = (boardId) => {
  return {
    type: REMOVE_BOARD,
    boardId
  };
};

export const receiveBoard = (response) => {
  console.log("receiveBoard action is firing!");
  console.log(response);
  return {
    type: RECEIVE_BOARD,
    response: response,
  };
};

export const requestBoard = () => {
  return (dispatch) => {
    return APIUtil.boardIndex()
      .then(data => {
        return dispatch(receiveBoards(data));
      }
    );
  };
};

export const createBoard = (board) => (dispatch) => {
  debugger
  return APIUtil.createBoard(board).then(
    (response) => {
      dispatch(receiveBoard(response));
      // hashHistory.push(`/boards/${board.id}`); do this in component layer instead!  use history not hashhistory
    }
  );
};

export const updateBoard = (updatedBoard) => (dispatch) => {
  return APIUtil.updateBoard(updatedBoard).then(
    (board) => dispatch(receiveBoard(board))
  );
};

export const deleteBoard = (boardId) => (dispatch) => {
  return APIUtil.deleteBoard(boardId).then(
    () => dispatch(removeBoard(boardId))
  );
};
