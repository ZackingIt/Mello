import { combineReducers } from 'redux';
import session from './session_reducer';
import boardIndexReducer from './board_index_reducer';

const rootReducer = combineReducers({
  session: session,
  boardIndexReducer: boardIndexReducer,
});

export default rootReducer;
