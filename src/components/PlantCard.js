import React, { useState } from 'react';

function PlantCard({ plant, onUpdatePrice, onDelete }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [price, setPrice] = useState(plant.price);

  // Toggle sold-out status
  function handleSoldOut() {
    setIsSoldOut(!isSoldOut);
  }

  // Handle price update
  function handlePriceChange() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => onUpdatePrice(updatedPlant)); // Update in parent component
  }

  // Handle delete plant
  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE',
    })
      .then(() => onDelete(plant.id)); // Remove from parent component's state
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${price}</p>

      {/* Input and button to update the price */}
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <button onClick={handlePriceChange}>Update Price</button>

      {/* Toggle sold-out status */}
      <button 
        className={isSoldOut ? '' : 'primary'} 
        onClick={handleSoldOut}
      >
        {isSoldOut ? 'Sold Out' : 'In Stock'}
      </button>

      {/* Delete plant */}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;