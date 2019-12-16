import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Nav from './components/Nav';
import Login from './components/Login';
import Jokes from './components/Jokes';
import Register from './components/Register';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Nav />
      <Route exact path='/' component={Home} />
      <Route path='/jokes' component={Jokes} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  );
}

export default App;
