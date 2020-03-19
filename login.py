from flask import Flask, jsonify, request
import json
import pymongo
#from bson.objectid import ObjectId

app = Flask(__name__)
CONNECTION_STRING = "mongodb+srv://admin:HRXlwaNuCZMxDeo9@cluster0-zuqby.mongodb.net/test?retryWrites=true&w=majority"
mongo = pymongo.MongoClient(CONNECTION_STRING, maxPoolSize=50, connect=False) #connects to database before running application

database = mongo.movieSuggestor
collection = database.Users

@app.route('/sign-up', methods = ['POST'])
def signUp():
    info = request.get_json()
    if 'username' in info and 'password' in info:
        user = info['username']
        pwd = info['password']
        if len(user) > 6 and len(pwd) > 8:
            if collection.find_one({"username": user}) == None:
                collection.insert_one({"username": user, "password": pwd})
                return jsonify({"message": "user info saved"}), 201
            else:
                return jsonify({"message": "user already exists"}), 400
        else: 
            return jsonify({"message": "invalid username or password"}), 400
    else:
        return jsonify({"message": "missing fields"}), 400

@app.route('/login', methods = ['POST'])
def login():
    info = request.get_json()
    if 'username' in info and 'password' in info:
        user = info['username']
        pwd = info['password']
        if collection.find_one({"username": user}) != None:
            document = collection.find_one({"username": user})
            if document['password'] == pwd: 
                document['_id'] = str(document['_id'])
                return json.dumps(document) #might wanna just return movie list
            else: 
                return jsonify({"message": "incorrect pass"}), 400
        else: 
            return jsonify({"message": "username specified does not exist"}), 400
    else: 
        return jsonify({"message": "missing fields"}), 400

#@app.route('/preferences', methods = ['GET', 'POST'])
#def preferences():

if __name__ == '__main__':
    app.run(debug=True)