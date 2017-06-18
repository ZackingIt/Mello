import React from 'react';
import Greeting from './greeting';
import SessionForm from './session_form';
import { Route } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <h1>Bench BnB</h1>
      <Greeting />
    </header>

    <Route path="/login" component={SessionForm} />
    <Route path="/signup" component={SessionForm} />
  </div>
);

export default App;
