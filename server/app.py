from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource, abort
from flask_cors import CORS

from models import db, Restaurant, Pizza, RestaurantPizza


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)



class RestaurantsResource(Resource):
    def get(self):
        restaurants = Restaurant.query.all()
        data = [{'id': r.id, 'name': r.name, 'address': r.address} for r in restaurants]
        return jsonify(data)
    def post(self):
        data = request.json
        if 'name' not in data or 'address' not in data:
            return {'error': 'Name and address are required fields'}, 400

        new_restaurant = Restaurant(name=data['name'], address=data['address'])
        db.session.add(new_restaurant)
        db.session.commit()
        return {'id': new_restaurant.id, 'name': new_restaurant.name, 'address': new_restaurant.address}, 201
    
api.add_resource(RestaurantsResource, '/restaurants')


class RestaurantResource(Resource):
    def get(self, restaurant_id):
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            data = {
                'id': restaurant.id,
                'name': restaurant.name,
                'address': restaurant.address,
                'pizzas': [{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in restaurant.pizzas]
            }
            return jsonify(data)
        else:
            abort(404, error='Restaurant not found')

    def delete(self, restaurant_id):
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return '', 204
        else:
            abort(404, error='Restaurant not found')

api.add_resource(RestaurantResource, '/restaurants/<int:restaurant_id>')

class PizzasResource(Resource):
    def get(self):
        pizzas = Pizza.query.all()
        data = [{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in pizzas]
        return jsonify(data)

api.add_resource(PizzasResource, '/pizzas')

class RestaurantPizzasResource(Resource):
    def post(self):
        data = request.json
        try:
            new_pizza = RestaurantPizza(price=data['price'], pizza_id=data['pizza_id'], restaurant_id=data['restaurant_id'])
            db.session.add(new_pizza)
            db.session.commit()
            return jsonify({'id': new_pizza.pizza.id, 'name': new_pizza.pizza.name, 'ingredients': new_pizza.pizza.ingredients})
        except Exception as e:
            abort(400, errors=['validation errors'])

api.add_resource(RestaurantPizzasResource, '/restaurant_pizzas')

if __name__ == '__main__':
    app.run(debug=True)
