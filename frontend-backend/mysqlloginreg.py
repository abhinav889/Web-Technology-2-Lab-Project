from flask import Flask, jsonify, request, json
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import (decode_token)
from sqlalchemy import create_engine, Sequence
from sqlalchemy import String, Integer, Float, Boolean, Column, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
app.config['JWT_SECRET_KEY'] = 'super-secret'




class Users(Base):
    __tablename__ = 'users'
    userid = Column(Integer,primary_key=True)
    first_name = Column(String(8080),nullable=False)
    last_name = Column(String(8080), nullable=False)
    email = Column(String(8080),nullable=False)
    password = Column(String(400),nullable=False)
    created = Column(String(400),nullable=False)

engine = create_engine('sqlite:///project.db', connect_args={'check_same_thread': False}, echo=True,pool_pre_ping=True)
cur= engine.connect()
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session=Session()
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/users/register', methods=['POST'])
def register():
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
	
    cur.execute("INSERT INTO users (first_name, last_name, email, password, created) VALUES ('" + 
		str(first_name) + "', '" + 
		str(last_name) + "', '" + 
		str(email) + "', '" + 
		str(password) + "', '" + 
		str(created) + "')")
 
	
    result = {
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'password' : password,
		'created' : created
	}

    return jsonify({'result' : result})
	

@app.route('/users/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    out = cur.execute("SELECT * FROM users where email = '" + str(email) + "'")
    for i in out :
        rv = i
	
    if bcrypt.check_password_hash(rv['password'], password):
        access_token = create_access_token(identity = {'first_name': rv['first_name'],'last_name': rv['last_name'],'email': rv['email']})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

@app.route('/users/data', methods=['POST'])
def store_user_quiz_details():
    print(request.get_json())
    email = request.get_json()['email']
    print(email)
    score = request.get_json()['score']
    numberOfQuestions = request.get_json()['numberOfQuestions']
    numberOfAnsweredQuestions = request.get_json()['numberOfAnsweredQuestions']
    correctAnswers = request.get_json()['correctAnswers']
    wrongAnswers = request.get_json()['wrongAnswers']
    hintsUsed = request.get_json()['hintsUsed']
    #user_details = decode_token(token,app.config.get('JWT_SECRET_KEY'))
    #print(user_details)
    #user_email = user_details['identity']['email']
    '''cur.execute("INSERT INTO userData (email, score, numberOfQuestions, numberOfAnsweredQuestions, correctAnswers, wrongAnswers,hintsUsed) VALUES ('" + 
		str(user_email) + "', '" + 
		score + "', '" + 
		numberOfQuestions + "', '" + 
		numberOfAnsweredQuestions + "', '" + 
        correctAnswers + "', '" + 
        wrongAnswers + "', '" + 
        hintsUsed + "')")
    res = cur.execute('select * from userData')'''
    '''for i in res :
        print(i)'''
    
    return  request.get_json(),200
	
if __name__ == '__main__':
    app.run(debug=True,port=8080)