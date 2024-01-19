from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurant'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    pizzas = relationship('Pizza', secondary='restaurant_pizza')

class Pizza(db.Model, SerializerMixin):
    __tablename__ = 'pizza'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.String(255), nullable=False)
    restaurants = relationship('Restaurant', secondary='restaurant_pizza')

class RestaurantPizza(db.Model, SerializerMixin):
    __tablename__ = 'restaurant_pizza'
    
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id', ondelete='CASCADE'), nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id', ondelete='CASCADE'), nullable=False)
    restaurant = db.relationship('Restaurant', backref=db.backref('restaurant_pizza', cascade='all, delete-orphan'))
    pizza = db.relationship('Pizza', backref=db.backref('restaurant_pizza', cascade='all, delete-orphan'))

    # Validation for price between 1 and 30
    db.CheckConstraint('price >= 1 AND price <= 30')
