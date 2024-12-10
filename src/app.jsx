import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Main } from "./main/main";
import { Notifications } from "./notifications/notifications";
import { CreateSpot } from "./createSpot/createSpot";
import { Saved } from "./saved/saved";
import { Settings } from "./settings/settings";
import { Created } from "./created/created";
import { Nav } from "react-bootstrap";
import { AuthState } from "./main/login/authState";

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <header>
          <nav>
            <h1>Hangspot</h1>
            <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/">
                Home
              </NavLink>
            </button>
            <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/createSpot">
                Create
              </NavLink>
            </button>
            <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/myPosts">
                My Spots
              </NavLink>
            </button>
            <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/notifications">
                Notifications
              </NavLink>
            </button>
            <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/saved">
                Saved Spots
              </NavLink>
            </button>
          </nav>
        </header>

        <Routes>
            <Route path="/" element={<Main/>} exact/>
            <Route path="/createSpot" element={<CreateSpot/>} />
            <Route path="/notifications" element={<Notifications/>} />
            <Route path="/myPosts" element={<Created/>} />
            <Route path="/saved" element={<Saved/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <p>
            © 2024 Hangspot | Designed with nature in mind |{" "}
            <span>
              <a href="https://github.com/ianjrobertson/startup">github</a>
            </span>
          </p>
        </footer>
      </main>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }


  /**
   * <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/saved">
                Saved Spots
              </NavLink>
            </button>
            <button type="button" className="btn btn-primary header-link">
              <NavLink className="btn-link" to="/settings">
                Settings
              </NavLink>
            </button>
   * 
   * 
   * 
   */