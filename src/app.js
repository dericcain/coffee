import * as React from 'react';
import { auth, User } from 'firebase';

import { Provider } from './context';
import Pages from './pages';

interface IState {
  isAuthed: boolean;
  user: User;
}

class App extends React.Component<null, IState> {
  state = {
    isAuthed: false,
    user: null,
  }

  stopWatchingAuthChanges;

  componentDidMount() {
    this.stopWatchingAuthChanges = this.watchAuth();
  }

  componentWillUnmount() {
    this.stopWatchingAuthChanges();
  }

  watchAuth() {
    return auth().onAuthStateChanged(user => {
      console.debug('Auth state changed...');
      if (user) {
        this.setState({
          user,
          isAuthed: true,
        });
      } else {
        this.setState({
          user: null,
          isAuthed: false,
        });
      }
    })
  }

  logout = async () => {
    try {
      await auth().signOut();
      this.setState({ user: null, isAuthed: false });
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    const { user, isAuthed } = this.state;

    return (
      <Provider value={{
        isAuthed,
        user,
        logout: this.logout,
      }}>
        <Pages />
      </Provider>
    );
  }
}

export default App;
