import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 

export function CreateSpot() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handle file input change
  function handleFileChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      image: event.target.files[0], // Save the file object
    }));
  }

  async function handleSubmit(event) {
    const postData = new FormData();
    const postID = uuidv4();
    const authToken = 1;

    postData.append('name', formData.name);
    postData.append('location', formData.location);
    postData.append('image', formData.image);
    postData.append('description', formData.description);
    postData.append('postID', postID);
    postData.append('token', authToken);

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        body: postData,
      });
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h2>Create Hammock Spot Post</h2>
      <form
        onSubmit={handleSubmit} 
        encType="multipart/form-data"
        method="POST"
      >
        <label htmlFor="name">Spot Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the spot name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter the location or click on the map"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <div>"Map API here"</div>

        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe the hammock spot"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Post</button>
      </form>
    </main>
  );
}
