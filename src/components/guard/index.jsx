import * as React from 'react';
import { Redirect } from '@reach/router';

import AppContext from '../../context';

export default function(GuardedComponent) {
  return class extends React.Component {
    static contextType = AppContext;

    render() {
      const { isAuthed } = this.context;
      return isAuthed ? <GuardedComponent /> : <Redirect to="/login" />
    }
  }
}

