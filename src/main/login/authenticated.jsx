import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spot } from '../spot/spot';


import Button from 'react-bootstrap/Button'

export function Authenticated(props) {
  const userName = props.userName;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); 

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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/allPosts`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.posts) {
            console.log("nothing")
          }
          setPosts(data.posts); 
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
      <h2>Home Page</h2>
      <span>{userName}</span>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
      <div>
        {posts?.length > 0 && posts.map((post) => (
          <Spot
            key={post.postID}
            name={post.name}
            location={post.location}
            description={post.description}
            user={post.user}
            id={post.postID}
          />
        ))
        }
        {posts?.length == 0 && <div>No posts available</div>}
      </div>
    </div>
  );
}
