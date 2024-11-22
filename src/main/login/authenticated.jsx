import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spot } from '../spot/spot';


import Button from 'react-bootstrap/Button'

export function Authenticated(props) {
  const userName = localStorage.getItem('userName')
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
        const response = await fetch(`/api/posts?user=${encodeURIComponent(userName)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.posts) {

          }
          setPosts(data.posts); 
          console.log(data);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
          setError("Failed to fetch posts."); 
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching posts."); 
      }
    }

    fetchPosts();
  }, [userName]);

  return (
    <div>
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
          />
        ))
        }
        {posts?.length == 0 && <div>No posts available</div>}
      </div>
    </div>
  );
}
