import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import { MessageDialog } from '../main/login/messageDialog'
import LocationPicker from "../maps/locationPicker";

export function CreateSpot() {
  const userName = localStorage.getItem('userName')

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const postID = uuidv4();

    try {
      const response = await fetch('/api/createSpot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email : userName, name : name, location : location, description: description, postID: postID})
      });
      if (!response.ok) {
        console.error("Failed to create spot:", response.statusText);
        return;
      }
      else {
        const body = await response.json();
        console.log(body)
        const post = body.post;
        setDisplayError(`${body.message}: Title:${post.name}, ID:${post.postID}`);
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h2>Create Hammock Spot Post</h2>
      <form
        onSubmit={handleSubmit} 
      >
        <label htmlFor="name">Spot Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the spot name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter the location or click on the map"
          value={location}
          onChange={(e => setLocation(e.target.value))}
          required
        />

        <LocationPicker
          onLocationSelect={(location) => {
            console.log("Location selected: ", location);
            setSelectedLocation(location);
          }}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe the hammock spot"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">Post</button>
      </form>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}
