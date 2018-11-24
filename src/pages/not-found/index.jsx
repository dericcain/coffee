import * as React from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { Link } from '@reach/router';

import { notFound } from './not-found.module.scss';

const NotFound = () => (
  <div className={notFound}>
    <NonIdealState
      icon="search"
      title="Not found"
      description="Uh oh! That page cannot be found."
      action={<Link to="/">Login?</Link>}
    />
  </div>
);

export default NotFound;


