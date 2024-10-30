import React from 'react';

export function Login() {
  return (
    <div className="accordion" id="loginAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingLogin">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLogin" aria-expanded="true" aria-controls="collapseLogin">
              Login
            </button>
          </h2>
          <div id="collapseLogin" className="accordion-collapse collapse" aria-labelledby="headingLogin" data-bs-parent="#loginAccordion">
            <div className="accordion-body">
              <form action="/login" method="POST">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}