//due to issues with React Drag and Drop library, the card reducer
//must be set separate from the rendering of the grey box's state:
//the drop library will repeatedly invoke fire thunks, and will override the

import { CREATE_DROPZONE } from '../actions/hover_actions';
import { merge } from 'lodash';

const hoverReducer = (state = {}, action) => {
  Object.freeze(state);

  let output;
  let newCard;
  let newState;

  switch (action.type){
    case CREATE_DROPZONE:
    // return state;
      if (action.response.listHoverIndex){
        let listHoverIndex = action.response.listHoverIndex;
        let cardHoverIndex = action.response.cardHoverIndex;

        // newState = merge({}, state, {listHoverIndex: listHoverIndex, cardHoverIndex: cardHoverIndex});
        // return {listHoverIndex: listHoverIndex, cardHoverIndex: cardHoverIndex};
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default hoverReducer;
