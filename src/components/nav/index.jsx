import * as React from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';

import { Consumer } from '../../context';

const Nav: React.FunctionComponent<{}> = () => (
  <Consumer>
    {({ logout }) => (
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Coffee</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="log-out" text="Logout" onClick={logout} />
        </Navbar.Group>
      </Navbar>
    )}
  </Consumer>
);

export default Nav;
