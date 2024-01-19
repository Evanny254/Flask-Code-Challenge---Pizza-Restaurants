import React from 'react';

function RestaurantList({ restaurants, onRestaurantClick, onDeleteRestaurant }) {
  return (
    <ul className='restaurants'>
      {restaurants && restaurants.map(restaurant => (
        <li key={restaurant.id}>
          <span className='restaurant_name' >{restaurant.name}</span> - <span className='restaurant_address' >{restaurant.address}</span>
          <br />
          <button onClick={() => onRestaurantClick(restaurant.id)}className='details'>Details</button>
          <button onClick={() => onDeleteRestaurant(restaurant.id)}className='delete'>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default RestaurantList;
