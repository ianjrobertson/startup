import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spot } from '../spot/spot';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
      <Spot></Spot>
      <Spot></Spot>
      <Spot></Spot>
      <Spot></Spot>
    </div>
  );
}
