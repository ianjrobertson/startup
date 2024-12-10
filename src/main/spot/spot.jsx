import React, { useState } from 'react';
import PostMap from '../../maps/map';
import { HangspotEvent, notifier } from '../../notifications/notifier';

export function Spot({ name, location, description, user, id}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const userName = localStorage.getItem('userName')

  const toggleLike = () => setLiked((prevLiked) => !prevLiked);
  const toggleSave = () => setSaved((prevSaved) => !prevSaved);

  async function like() {
    const currentUser = localStorage.getItem("userName");
    try {
      const response = await fetch(`/api/like`, {
        method: "POST",
        body: JSON.stringify({ user: currentUser, postID: id }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (!response.ok) {
        console.error("Failed to like the spot", response.statusText);
      } else {
        const body = await response.json()
        toggleLike()
        notifier.broadcastEvent(userName, HangspotEvent.Like, {user: userName, creator: user, name})
      }
    } catch(error) {
      console.log(error)
    }
  }

  async function save() {
    const currentUser = localStorage.getItem("userName");
    try {
      const response = await fetch(`/api/save`, {
        method: "POST",
        body: JSON.stringify({ user: currentUser, postID: id }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (!response.ok) {
        console.error("Failed to like the spot", response.statusText);
      } else {
        const body = await response.json();
        toggleSave()
        notifier.broadcastEvent(userName, HangspotEvent.Save, {user: userName, creator: user, name})

      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="card">
        <div>
          <span>Created by: {user}</span>
          <button 
            type="button" 
            className="btn btn-primary header-link" 
            onClick={like}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <button 
            type="button" 
            className="btn btn-primary header-link" 
            onClick={save}
          >
            {saved ? "Unsave" : "Save"}
          </button>
        </div>
        <PostMap
          location={location}
        />
        <div>
          <span>Title: {name}</span>
        </div>
        <div>
          <span>Description: {description}</span>
        </div>
      </div>
    </div>
  );
}
