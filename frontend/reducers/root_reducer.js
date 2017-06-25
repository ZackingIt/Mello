import { combineReducers } from 'redux';
import session from './session_reducer';
import boardReducer from './board_reducer';
import listReducer from './list_reducer';
import cardReducer from './card_reducer';


const rootReducer = combineReducers({
  session: session,
  boards: boardReducer,
  lists: listReducer,
  cards: cardReducer,
});

export default rootReducer;
