import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [searchedPlant, setSearchedPlant] = useState('')
  const [plants, setPlants] = useState([])

  function handleAddPlant(newPlant) {
    const updatedPlantList = [...plants, newPlant]
    setPlants(updatedPlantList)
  }

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant}/>
      <Search setSearchedPlant={setSearchedPlant}/>
      <PlantList plants={plants}  setPlants={setPlants} searchedPlant={searchedPlant}/>
    </main>
  );
}

export default PlantPage;