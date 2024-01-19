import React, { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList.jsx';
import RestaurantDetails from './components/RestaurantDetails.jsx';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Fetch the list of restaurants
    fetch('http://127.0.0.1:5000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleRestaurantClick = (restaurantId) => {
    // Fetch details for the selected restaurant
    fetch(`http://127.0.0.1:5000/restaurants/${restaurantId}`)
      .then(response => response.json())
      .then(data => setSelectedRestaurant(data))
      .catch(error => console.error('Error fetching restaurant details:', error));
  };

  const handleDeleteRestaurant = (restaurantId) => {
    // Delete the selected restaurant
    fetch(`http://127.0.0.1:5000/restaurants/${restaurantId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Refresh the list of restaurants after deletion
          fetch('http://127.0.0.1:5000/restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants after deletion:', error));
        } else {
          console.error(`Error deleting restaurant. Server returned ${response.status} ${response.statusText}`);
        }
      })
      .catch(error => console.error('Error deleting restaurant:', error));
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <RestaurantList  
        restaurants={restaurants}
        onRestaurantClick={handleRestaurantClick}
        onDeleteRestaurant={handleDeleteRestaurant}
      />

      {selectedRestaurant && (
        <RestaurantDetails restaurant={selectedRestaurant} />
      )}
    </div>
  );
}

export default App;
