import React from 'react';
import { Login } from './login/login';
import { Spot } from "./spot/spot"
import { AuthState } from './login/authState';

export function Main() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <main>
      <Login
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
          setAuthState(authState);
          setUserName(userName);
        }}
      />
    </main>
  );
}