import * as APIUtil from '../util/session_api_util';
export const RECEIVE_INDEX_BOARD = "RECEIVE_INDEX_BOARD";

export const receiveBoardIndex = (status, error, data) => {
  return {
    type: RECEIVE_INDEX_BOARD,
    asyncStatus: status,
    error: error,
    data: data
  };
};

export const requestBoardIndex = () => {
  return (dispatch) => {
    dispatch(receiveBoardIndex("LOADING", null, {}));
    return APIUtil.boardIndex()
      .then(payload => {
        return dispatch(receiveBoardIndex("SUCCESS", payload.error, payload.data));
      }
    );
  };
};
