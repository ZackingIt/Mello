import React from 'react';
import Greeting from './greeting';
import SessionForm from './session_form';
import BoardIndex from './board_index';
import BoardShow from './board_show';
import Header from './head/header';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <Greeting />
    <Header />
    <Switch>

      <Route exact path="/">
        <Redirect to="/login"/>
      </Route>
      <AuthRoute path="/login" component={SessionForm} />
      <AuthRoute path="/signup" component={SessionForm} />
      <ProtectedRoute path="/home" component={BoardIndex} />
      <ProtectedRoute path="/board/:id" component={BoardShow} />
    </Switch>
  </div>
);

export default App;
