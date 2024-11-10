import React, { useState } from 'react';

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission to add a new plant
  function handleSubmit(e) {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !image || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newPlant = { name, image, price: parseFloat(price) };

    // POST request to add a new plant
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((plant) => {
        onAddPlant(plant); // Add the new plant to the parent component's state
        // Reset the form fields
        setName('');
        setImage('');
        setPrice('');
      })
      .catch((error) => {
        console.error('Error adding plant:', error);
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;