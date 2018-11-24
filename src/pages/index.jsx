import * as React from 'react';
import { Router } from "@reach/router";

import Login from './login';
import Coffee from './coffee';
import NotFound from './not-found';

const Pages = () => (
  <Router>
    <Login path="/" />
    <Coffee path="/coffee" />
    <NotFound default />
  </Router>
);

export default Pages;
