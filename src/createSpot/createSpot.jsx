import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import { MessageDialog } from '../main/login/messageDialog'
import LocationPicker from "../maps/locationPicker";
import { HangspotEvent, notifier } from "../notifications/notifier";
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
        body: JSON.stringify({email : userName, name : name, location : selectedLocation, description: description, postID: postID})
      });
      if (!response.ok) {
        console.error("Failed to create spot:", response.statusText);
        return;
      }
      else {
        const body = await response.json();
        const post = body.post;
        setDisplayError(`${body.message}: Title:${post.name}, ID:${post.postID}`);
        notifier.broadcastEvent(userName, HangspotEvent.Spot, {name: post.name, user: post.user});
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

        <label>Select Location on Map</label>
        <div className="location">
          <LocationPicker
            onLocationSelect={(location) => {
              console.log("Location selected: ", location);
              setSelectedLocation(location);
            }}
          />
        </div>
        

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
