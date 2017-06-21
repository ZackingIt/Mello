import React from 'react';
import Greeting from './greeting';
import SessionForm from './session_form';
import BoardIndex from './board_index';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

const App = () => (
  <div>
    <Greeting />
    <Route exact path="/">
      <Redirect to="/login"/>
    </Route>
    <Route path="/login" component={SessionForm} />
    <Route path="/signup" component={SessionForm} />
    <Route path="/home" component={BoardIndex} />
  </div>
);

export default App;
