// RestaurantForm.jsx
import React, { useState } from 'react';

function RestaurantForm({ onCreateRestaurant }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the function to create a new restaurant
    onCreateRestaurant(formData);

    // Optionally, clear the form after submission
    setFormData({
      name: '',
      address: '',
    });
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Name:
        <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label className="form-label">
        Address:
        <input className="form-input" type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>
      <br />
      <button className="form-button" type="submit">Create Restaurant</button>
    </form>
  );
}

export default RestaurantForm;
