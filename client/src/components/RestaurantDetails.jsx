import React from 'react';

function RestaurantDetails({ restaurant }) {
  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <h3>Pizzas</h3>
      <ul>
        {restaurant.pizzas && restaurant.pizzas.map(pizza => (
          <div key={pizza.id}><span className='pizza_name' >{pizza.name}</span> - <span className='pizza_ingredients'>{pizza.ingredients}</span></div>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDetails;
