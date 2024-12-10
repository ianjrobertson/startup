import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spot } from '../main/spot/spot';


import Button from 'react-bootstrap/Button'

export function Saved(props) {
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); 


  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/saved?user=${encodeURIComponent(userName)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.saved) {
            console.log("nothing")
          }
          setPosts(data.saved); 
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchPosts();
  }, [userName]);

  return (
    <div>
      <h2>Saved Spots</h2>
      <div>
        {posts?.length > 0 && posts.map((post) => (
          <Spot
            key={post.postID}
            name={post.name}
            location={post.location}
            description={post.description}
            user={post.user}
          />
        ))
        }
        {posts?.length == 0 && <div>No posts available</div>}
      </div>
    </div>
  );
}
