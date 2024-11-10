import React, { useEffect } from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, setPlants, searchedPlant }) { 

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(data => setPlants(data))
  }, [])

  const filteredPlants = searchedPlant === "" ? 
    [...plants] :
    plants.filter(plant => plant.name.toLowerCase().includes(searchedPlant.toLowerCase()))

  function renderPlants() {
    return filteredPlants.map(plant => {
      return <PlantCard key={plant.id} plant={plant}/>
    })
  }

  return (
    <ul className="cards">
      {renderPlants()}
    </ul>
  );
}

export default PlantList;