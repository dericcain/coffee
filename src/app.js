import * as React from 'react';
import { auth, User } from 'firebase';

import { Provider } from './context';
import Pages from './pages';
import Loader from './components/loader';

interface IState {
  isAuthed: boolean;
  user: User;
  isLoading: boolean;
}

class App extends React.Component<null, IState> {
  state = {
    isAuthed: false,
    user: null,
    isLoading: true,
  };

  stopWatchingAuthChanges;

  constructor(props) {
    super(props);
    this.auth = auth();
    this.stopWatchingAuthChanges = this.watchAuth();
  }

  componentWillUnmount() {
    this.stopWatchingAuthChanges();
  }

  watchAuth() {
    return this.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
          isAuthed: true,
          isLoading: false,
        });
      } else {
        this.setState({
          user: null,
          isAuthed: false,
          isLoading: false,
        });
      }
    });
  }

  logout = async () => {
    try {
      await this.auth.signOut();
      this.setState({ user: null, isAuthed: false });
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const { user, isAuthed, isLoading } = this.state;

    return (
      <Provider
        value={{
          isAuthed,
          user,
          auth: this.auth,
          logout: this.logout,
        }}>
        {isLoading ? <Loader /> : <Pages />}
      </Provider>
    );
  }
}

export default App;
