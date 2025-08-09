import React, { useState } from "react";
import "./App.css";

const pets = [
  {
    id: 1,
    name: "Bella",
    type: "Dog",
    breed: "Labrador",
    age: "2 years",
    cost: 5000,
    image: "https://placedog.net/400/300?id=1",
  },
  {
    id: 2,
    name: "Milo",
    type: "Cat",
    breed: "Siamese",
    age: "1 year",
    cost: 3000,
    image: "https://placekitten.com/400/300",
  },
  {
    id: 3,
    name: "Charlie",
    type: "Rabbit",
    breed: "Angora",
    age: "6 months",
    cost: 2000,
    image: "https://placekitten.com/401/300",
  },
  {
    id: 4,
    name: "Luna",
    type: "Dog",
    breed: "Beagle",
    age: "3 years",
    cost: 4500,
    image: "https://placedog.net/400/301?id=4",
  },
  {
    id: 5,
    name: "Simba",
    type: "Cat",
    breed: "Persian",
    age: "2 years",
    cost: 3500,
    image: "https://placekitten.com/402/300",
  },
];

const breeds = [...new Set(pets.map((pet) => pet.breed))];
const costRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under 3000", min: 0, max: 3000 },
  { label: "3000 to 4500", min: 3000, max: 4500 },
  { label: "Above 4500", min: 4500, max: Infinity },
];

function App() {
  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedCostRange, setSelectedCostRange] = useState("All");
  const [filteredPets, setFilteredPets] = useState(pets);

  const handleFilter = () => {
    let filtered = pets;

    if (selectedBreed !== "All") {
      filtered = filtered.filter((pet) => pet.breed === selectedBreed);
    }

    const costRange = costRanges.find(
      (range) => range.label === selectedCostRange
    );
    if (costRange && costRange.label !== "All") {
      filtered = filtered.filter(
        (pet) => pet.cost >= costRange.min && pet.cost < costRange.max
      );
    }

    setFilteredPets(filtered);
  };

  const handleAdopt = (petName) => {
    alert(`Thank you for your interest in adopting ${petName}!`);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to Pet Adoption Center</h1>
        <p>Find your perfect pet and give them a loving home.</p>
      </header>

      <div className="filters">
        <label>
          Breed:{" "}
          <select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="All">All</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cost:{" "}
          <select
            value={selectedCostRange}
            onChange={(e) => setSelectedCostRange(e.target.value)}
          >
            {costRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleFilter}>Filter</button>

        <button
          onClick={() => {
            setSelectedBreed("All");
            setSelectedCostRange("All");
            setFilteredPets(pets);
          }}
        >
          Reset
        </button>
      </div>

      <div className="pet-list">
        {filteredPets.length === 0 ? (
          <p className="no-pets">No pets match your selection.</p>
        ) : (
          filteredPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.image} alt={pet.name} />
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>Type: {pet.type}</p>
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age}</p>
                <p>Cost: ₹{pet.cost}</p>
                <button
                  className="adopt-btn"
                  onClick={() => handleAdopt(pet.name)}
                >
                  Adopt Me
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
