import * as React from 'react';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { auth } from 'firebase';
import './login.scss';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/coffee',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    auth.EmailAuthProvider.PROVIDER_ID,
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.FacebookAuthProvider.PROVIDER_ID,
  ]
};

class Login extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()}/>
      </div>
    );
  }
}

export default Login;
