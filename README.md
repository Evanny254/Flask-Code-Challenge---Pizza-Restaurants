# Flask Code Challenge - Pizza Restaurants
Welcome to the Flask Code Challenge for Pizza Restaurants! In this assessment, you'll be working with a Pizza Restaurant domain, building a fully functional React frontend application to interact with your Flask API.

## Models
You are required to create the following relationships in your models:

1. A 'Restaurant' has many 'Pizzas' through 'RestaurantPizza'
2. A 'Pizza' has many 'Restaurants' through 'RestaurantPizza'
3. A 'RestaurantPizza' belongs to a 'Restaurant' and belongs to a 'Pizza'

## Validations
Add validations to the RestaurantPizza model:
@ price must be between 1 and 30

## Routes
Set up the following routes in your Flask application. Ensure you return JSON data in the specified format along with the appropriate HTTP verb.

### GET /restaurants
Return JSON data in the format:
[
  {
    "id": 1,
    "name": "Sottocasa NYC",
    "address": "298 Atlantic Ave, Brooklyn, NY 11201"
  },
  {
    "id": 2,
    "name": "PizzArte",
    "address": "69 W 55th St, New York, NY 10019"
  }
]

### GET /restaurants/:id
If the Restaurant exists, return JSON data in the format:
{
  "id": 1,
  "name": "Sottocasa NYC",
  "address": "298 Atlantic Ave, Brooklyn, NY 11201",
  "pizzas": [
    {
      "id": 1,
      "name": "Cheese",
      "ingredients": "Dough, Tomato Sauce, Cheese"
    },
    {
      "id": 2,
      "name": "Pepperoni",
      "ingredients": "Dough, Tomato Sauce, Cheese, Pepperoni"
    }
  ]
}

If the Restaurant does not exist, return:
{
  "error": "Restaurant not found"
}

### DELETE /restaurants/:id
If the Restaurant exists, remove it from the database, along with associated RestaurantPizzas. Return an empty response body with the appropriate HTTP status code.

If the Restaurant does not exist, return:
{
  "error": "Restaurant not found"
}

### GET /pizzas
Return JSON data in the format:
[
  {
    "id": 1,
    "name": "Cheese",
    "ingredients": "Dough, Tomato Sauce, Cheese"
  },
  {
    "id": 2,
    "name": "Pepperoni",
    "ingredients": "Dough, Tomato Sauce, Cheese, Pepperoni"
  }
]

### POST /restaurant_pizzas
Create a new RestaurantPizza associated with an existing Pizza and Restaurant. Accept an object in the request body:
{
  "price": 5,
  "pizza_id": 1,
  "restaurant_id": 3
}

If the RestaurantPizza is created successfully, send back a response with the related Pizza data:
{
  "id": 1,
  "name": "Cheese",
  "ingredients": "Dough, Tomato Sauce, Cheese"
}

If the RestaurantPizza is not created successfully, return:
{
  "errors": ["validation errors"]
}

## Frontend

Build a fully functional React frontend application to test and interact with your API. Ensure that the frontend communicates effectively with the backend and handles responses appropriately.

## Happy Coding