import React from 'react';
import { Provider } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import App from './app';

import { DragSource, DragDropContext, DragDropContextProvider, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>
);

// export default Root;
export default DragDropContext(HTML5Backend)(Root);
