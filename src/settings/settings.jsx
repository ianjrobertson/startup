import React from 'react';

export function Settings() {
  return (
    <main>
      <h2>Settings</h2>
        <form action="/change-username" method="POST">
            <label htmlFor="username">Change Username</label>
            <input type="text" id="username" name="username" placeholder="Enter new username" required/>
            <button type="submit">Update Username</button>
          </form>
        
          <form action="/change-email" method="POST">
            <label htmlFor="email">Change Email</label>
            <input type="email" id="email" name="email" placeholder="Enter new email" required/>
            <button type="submit">Update Email</button>
          </form>
        
          <form action="/change-password" method="POST">
            <label htmlFor="password">Change Password</label>
            <input type="password" id="password" name="password" placeholder="Enter new password" required/>
            <button type="submit">Update Password</button>
          </form>
        
          <form action="/delete-account" method="POST">
            <label htmlFor="delete-account">Delete Account</label>
            <button type="submit">Delete My Account</button>
          </form>
    </main>
  );
}