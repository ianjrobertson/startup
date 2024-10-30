import React from 'react';

export function CreateSpot() {
  return (
    <main>
      <h2>Create Hammock Spot Post</h2>
      <form action="/create-hammock-post" method="POST" enctype="multipart/form-data">
      
        <label for="name">Spot Name</label>
        <input type="text" id="name" name="name" placeholder="Enter the spot name" required/>
  
      
        <label for="location">Location</label>
        <input type="text" id="location" name="location" placeholder="Enter the location or click on the map" required/>

        <div>"Map API here"</div>
  
        <label for="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/*" required/>
  
        <label for="description">Description</label>
        <textarea id="description" name="description" placeholder="Describe the hammock spot" required></textarea>
  
        <button type="submit">Post</button>
      </form>
    </main>
  );
}