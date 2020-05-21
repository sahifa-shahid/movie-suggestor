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

@app.route('/favourites/<username>', methods = ['POST', 'GET'])
def favourites(username):
    if request.method == 'POST':
        favList = request.get_json()
        collection.update_one({
                "username": username
            },
            {
                "$set": {
                    "favourites": favList['favourites']
                }
            })
        return jsonify({"message": "successfully updated"}), 201
    elif request.method == 'GET':
        user = request.get_json()
        document = collection.find_one({"username": username})
        return jsonify({"favourites": document['favourites']}), 201
    else: 
        return jsonify({"message": "wrong request type"}), 400

@app.route('/movies/<username>', methods = ['POST', 'GET'])
def list(username):
    if request.method == 'POST':
        info = request.get_json()
        document = collection.find_one({"username": username})
        movieList = document['movies']
        if any(i['title'] == info['title'] for i in movieList) == False:
            collection.update_one(
            {
                "username": username
            },
            {
                "$addToSet":
                {
                    "movies":
                    {
                        "title": info['title'],
                        "rating": int(info['rating']),
                        "recommended": bool(info['recommended'])
                    }
                }
            })
            return jsonify({"message": "list successfully updated"}), 201
        else:
            return jsonify({"message": "movie is already in the list"}), 400
    elif request.method == 'GET':
        document = collection.find_one({"username": username})
        return jsonify({"movies": document['movies']})
    else:
        return jsonify({"message": "wrong request type"}), 400

if __name__ == '__main__':
    app.run(debug=True)