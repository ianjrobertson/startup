import React from 'react';
import { Login } from './login/login';
import { Spot } from "./spot/spot"

export function Main() {
  return (
    <main>
      <Login></Login>
      <Spot></Spot>
      <Spot></Spot>
      <Spot></Spot>
      <Spot></Spot>
    </main>
  );
}