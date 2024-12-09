import React, { useState } from 'react';
import PostMap from '../../maps/map';

export function Spot({ name, location, description, user}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => setLiked((prevLiked) => !prevLiked);
  const toggleSave = () => setSaved((prevSaved) => !prevSaved);

  return (
    <div>
      <div className="card">
        <div>
          <span>Created by: {user}</span>
          <button 
            type="button" 
            className="btn btn-primary header-link" 
            onClick={toggleLike}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <button 
            type="button" 
            className="btn btn-primary header-link" 
            onClick={toggleSave}
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
