import React, { useState } from 'react';

export function Spot() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => setLiked((prevLiked) => !prevLiked);
  const toggleSave = () => setSaved((prevSaved) => !prevSaved);

  return (
    <div>
      <div className="card">
        <div>
          <img className="profile" src="IMG_1840.jpg" height="30px" width="35px" />
          <span>"From DB: Username"</span>
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
          <button type="button" className="btn btn-primary header-link">API: Location</button>
        </div>
        <div>
          <span>"Hammock spot description"</span>
          <img
            src="https://thehammockexpert.com/wp-content/uploads/2018/01/how-to-hang-your-hammock-the-hammock-expert-3-1-768x512.jpg"
            height="100px"
            width="150px"
          />
        </div>
      </div>
    </div>
  );
}
