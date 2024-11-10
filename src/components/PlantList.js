import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';

function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((response) => response.json())
      .then((data) => {
        // Ensure each plant has an image property
        const plantsWithImages = data.map(plant => ({
          ...plant,
          image: plant.image || "https://via.placeholder.com/400" // Use placeholder if no image
        }));
        setPlants(plantsWithImages);
      });
  }, []);

  function handleUpdatePrice(updatedPlant) {
    const updatedPlants = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlants(updatedPlants);
  }

  function handleDelete(plantId) {
    const updatedPlants = plants.filter((plant) => plant.id !== plantId);
    setPlants(updatedPlants);
  }

  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onUpdatePrice={handleUpdatePrice}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default PlantList;