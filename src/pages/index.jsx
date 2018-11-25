import * as React from 'react';
import { Router } from "@reach/router";

import guarded from '../components/guard';
import Login from './login';
import Coffee from './coffee';
import NotFound from './not-found';

const GuardedCoffee = guarded(Coffee);

const Pages = () => (
  <Router>
    <GuardedCoffee path="/"/>
    <Login path="/login"/>
    <NotFound default/>
  </Router>
);

export default Pages;
