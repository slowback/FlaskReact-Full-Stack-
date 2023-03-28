from flask import Flask, jsonify, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
from numbers import Number
import flask_cors


db = SQLAlchemy()
app = Flask(__name__)
CORS(app)

# Connect to Databas
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cafes_test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


# Cafe TABLE Configuration
class Cafe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    map_url = db.Column(db.String(500), nullable=False)
    img_url = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    seats = db.Column(db.String(250), nullable=True)
    has_toilet = db.Column(db.Boolean, nullable=False)
    has_wifi = db.Column(db.Boolean, nullable=False)
    has_sockets = db.Column(db.Boolean, nullable=False)
    can_take_calls = db.Column(db.Boolean, nullable=False)
    coffee_price = db.Column(db.String(250), nullable=True)
    
    def __repr__(self) -> str:
        return f'<Cafe {self.name}>'

    def to_dict(self):
        return {column.name: getattr(self, column.name) 
            for column in self.__table__.columns}
        
# with app.app_context():
#     db.create_all()


@app.route('/')
def home():
    return render_template('index.html')

# ------ For test -------
@app.route('/first', methods=['GET'])
def first_database():
    if request.method == 'GET':
        responses = Cafe.query.first()
        return jsonify([responses.to_dict()])

@app.route('/all', methods=['GET'])
def all_database():
    if request.method == 'GET':
        responses = Cafe.query.all()
        return jsonify([data.to_dict() for data in responses])

@app.route('/random', methods=['GET'])
def random_data_on_database():
    if request.method == 'GET':
        responses = Cafe.query.all()
        random_data = random.choice(responses)
        return jsonify([random_data.to_dict()])

@app.route('/add', methods=['POST', 'GET'])
def add_cafe():
    if request.method == 'POST':
        data = request.json
        price = data['coffeePrice']
        if u'£' not in price:
            price = f'£{price}'

        new_cafe = Cafe(name=data['name'],
                        map_url=data['mapUrl'],
                        img_url=data['imgUrl'],
                        location=data['location'],
                        seats=data['seats'],
                        has_toilet=bool(data['hasToilet']),
                        has_wifi=bool(data['hasWifi']),
                        has_sockets=bool(data['hasSockets']),
                        can_take_calls=bool(data['canTakeCalls']),
                        coffee_price=price
                        )
        db.session.add(new_cafe)
        db.session.commit()
        return jsonify(new_cafe.to_dict())

    else:
        return jsonify(response={"error": "Error message."})    


@app.route('/update/<int:cafe_id>', methods=['PUT'])
@flask_cors.cross_origin()
def update_data(cafe_id):
    if request.method == 'PUT':

        try:
            data = request.json
            price = data['coffeePrice']
            if u'£' not in price:
                price = f'£{price}'

            new_name = data['name']
            new_price= data['coffeePrice']
            new_map_url=data['mapUrl'],
            new_img_url=data['imgUrl'],
            new_location=data['location'],
            new_seats=data['seats'],
            new_has_toilet = data['hasToilet'],
            new_has_wifi=data['hasWifi'],
            new_has_sockets=data['hasSockets'],
            new_can_take_calls=data['canTakeCalls'],
            new_coffee_price=price
        except KeyError as err:
            print(err)
        else:
            cafe = db.session.execute(db.select(Cafe).filter_by(id=cafe_id)).scalar_one()
            if cafe:
                cafe.name = new_name
                cafe.coffee_price = new_price
                cafe.map_url = new_map_url[0]
                cafe.img_url = new_img_url[0]
                cafe.location = new_location[0]
                cafe.seats = new_seats[0]
                cafe.has_toilet = new_has_toilet[0]
                cafe.has_wifi = new_has_wifi[0]
                cafe.has_sockets = new_has_sockets[0]
                cafe.can_take_calls = new_can_take_calls[0]
                cafe.coffee_price = new_coffee_price
                db.session.commit()
                return jsonify(cafe.to_dict())
            else:
                return jsonify(error="Not Found.")


@app.route('/remove-cafe/<int:cafe_id>', methods=['DELETE'])
def delete_datas(cafe_id):
    cafe = db.session.execute(db.select(Cafe).filter_by(id=cafe_id)).scalar_one()
    
    if cafe:
        db.session.delete(cafe)
        db.session.commit()
        return jsonify(cafe.to_dict())
    else:
        return jsonify(error="Not Found.")
   

if __name__ == "__main__":
    app.run(debug=True, port=5000)

