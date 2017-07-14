import { combineReducers } from 'redux';
import session from './session_reducer';
import boardReducer from './board_reducer';
import listReducer from './list_reducer';
import cardReducer from './card_reducer';
import userReducer from './user_reducer';
import sharedBoardReducer from './shared_board_reducer';
import hoverReducer from './hover_reducer';


const rootReducer = combineReducers({
  session: session,
  boards: boardReducer,
  lists: listReducer,
  cards: cardReducer,
  users: userReducer,
  shared_boards: sharedBoardReducer,
  hover: hoverReducer,
});

export default rootReducer;
