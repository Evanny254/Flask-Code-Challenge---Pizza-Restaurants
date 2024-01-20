import React, { useState } from 'react';

function RestaurantPizzaForm({ onCreateRestaurantPizza }) {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRestaurantPizza(formData);
    setFormData({
        price: '',
        pizza_id: '',
        restaurant_id: '',
        
      });
  };

  return (
    <form className="restaurant-pizza-form" onSubmit={handleSubmit}>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Pizza ID:
        <input type="number" name="pizza_id" value={formData.pizza_id} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Restaurant ID:
        <input type="number" name="restaurant_id" value={formData.restaurant_id} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Create Restaurant Pizza</button>
    </form>
  );
}


export default RestaurantPizzaForm;
