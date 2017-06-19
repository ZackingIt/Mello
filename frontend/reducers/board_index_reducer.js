import { RECEIVE_INDEX_BOARD } from '../actions/board_index_actions';

const defaultState = {
  asyncStatus: "LOADING",
  error: null,
  data: {},
};

const boardIndexReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_INDEX_BOARD:
      let newState = {
        asyncStatus: action.asyncStatus,
        data: action.asyncStatus === "SUCCESS" ? action.data : state.data,
        error: action.error
      };
      return newState;
    default:
      return state;
  }
};

export default boardIndexReducer;
