import React, { useState, useEffect } from 'react';
import RestaurantList from './components/RestaurantList.jsx';
import RestaurantDetails from './components/RestaurantDetails.jsx';
import RestaurantForm from './components/RestaurantForm.jsx';
import RestaurantPizzaForm from './components/RestaurantPizzaForm.jsx';
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

  const handleCreateRestaurant = (formData) => {
    // Assuming formData contains necessary information for creating a new Restaurant
    fetch('http://127.0.0.1:5000/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful creation, you might want to update the UI or take other actions
        console.log('Restaurant created successfully:', data);
        // Refresh the list of restaurants after creation
        fetch('http://127.0.0.1:5000/restaurants')
          .then(response => response.json())
          .then(data => setRestaurants(data))
          .catch(error => console.error('Error fetching restaurants after creation:', error));
      })
      .catch(error => console.error('Error creating restaurant:', error));
  };

  const handleCreateRestaurantPizza = (formData) => {
    // Assuming formData contains necessary information for creating a new RestaurantPizza
    fetch('http://127.0.0.1:5000/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful creation, you might want to update the UI or take other actions
        console.log('RestaurantPizza created successfully:', data);
      })
      .catch(error => console.error('Error creating RestaurantPizza:', error));
  };

  return (
    <div className="app-container">
      <h1>Pizza Restaurants</h1>
      <div className="main-container">
          <RestaurantList  
            restaurants={restaurants}
            onRestaurantClick={handleRestaurantClick}
            onDeleteRestaurant={handleDeleteRestaurant}
          />
        <br />
        <div className="details-container">
          {selectedRestaurant && (
            <RestaurantDetails restaurant={selectedRestaurant} />
          )}
        </div>
        <div className="forms-container">
          <RestaurantForm onCreateRestaurant={handleCreateRestaurant} />
          <RestaurantPizzaForm onCreateRestaurantPizza={handleCreateRestaurantPizza}/>
        </div>
      </div>
    </div>
  );
}

export default App;
