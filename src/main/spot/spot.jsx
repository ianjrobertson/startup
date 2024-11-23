import React, { useState } from 'react';
import PostMap from '../../maps/map';

export function Spot({ name, location, description}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const userName = localStorage.getItem("userName");

  const toggleLike = () => setLiked((prevLiked) => !prevLiked);
  const toggleSave = () => setSaved((prevSaved) => !prevSaved);

  return (
    <div>
      <div className="card">
        <div>
          <img className="profile" src="IMG_1840.jpg" height="30px" width="35px" />
          <span>{userName}</span>
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
      </div>
    </div>
  );
}
