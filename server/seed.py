from app import app
from app import db, Restaurant, Pizza, RestaurantPizza

def seed_data():
    with app.app_context():
        # Create Restaurants
        print("Creating Restaurants...")
        restaurant1 = Restaurant(name='Sottocasa NYC', address='298 Atlantic Ave, Brooklyn, NY 11201')
        restaurant2 = Restaurant(name='PizzArte', address='69 W 55th St, New York, NY 10019')
        restaurant3 = Restaurant(name='Pizza Place', address='123 Main St, Anytown, USA')
        restaurant4 = Restaurant(name='Italian Delight', address='456 Oak St, Cityville, USA')

        db.session.add_all([restaurant1, restaurant2, restaurant3, restaurant4])
        db.session.commit()

        # Create Pizzas
        print("Creating Pizzas...")
        pizza1 = Pizza(name='Cheese', ingredients='Dough, Tomato Sauce, Cheese')
        pizza2 = Pizza(name='Pepperoni', ingredients='Dough, Tomato Sauce, Cheese, Pepperoni')
        pizza3 = Pizza(name='Margherita', ingredients='Dough, Tomato Sauce, Fresh Mozzarella, Basil')
        pizza4 = Pizza(name='Vegetarian', ingredients='Dough, Tomato Sauce, Cheese, Mushrooms, Bell Peppers, Onions')

        db.session.add_all([pizza1, pizza2, pizza3, pizza4])
        db.session.commit()

        # Create RestaurantPizzas
        print("Creating RestaurantsPizzas...")
        restaurant_pizza1 = RestaurantPizza(price=10, restaurant_id=1, pizza_id=1)
        restaurant_pizza2 = RestaurantPizza(price=15, restaurant_id=1, pizza_id=2)
        restaurant_pizza3 = RestaurantPizza(price=12, restaurant_id=2, pizza_id=1)
        restaurant_pizza4 = RestaurantPizza(price=18, restaurant_id=2, pizza_id=2)
        restaurant_pizza5 = RestaurantPizza(price=20, restaurant_id=3, pizza_id=1)

        db.session.add_all([restaurant_pizza1, restaurant_pizza2, restaurant_pizza3, restaurant_pizza4, restaurant_pizza5])
        db.session.commit()

if __name__ == '__main__':
    seed_data()
