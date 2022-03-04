from unittest import result
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import mysql.connector as sql
from dotenv import load_dotenv
from os import getenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)


def dbOpenConn():
    return sql.MySQLConnection(
        user=getenv('USERNAME'),
        password=getenv('PASSWORD'),
        host=getenv('HOST'),
        database=getenv('DATABASE')
    )


@app.route("/create", methods=['POST'])
def create():
    db = dbOpenConn()

    id = db.converter.escape(request.json["id"])
    name = db.converter.escape(request.json["name"])
    deployment = db.converter.escape(request.json["deployment"])

    query = f"INSERT INTO items (id, name, deployment) VALUES (\"{id}\", \"{name}\", \"{deployment}\")"
    print(query)
    cursor = db.cursor(dictionary=True)

    cursor.execute(query)
    db.commit()

    cursor.close()
    db.close()

    return Response(status=201)


@ app.route('/deploy', methods=['POST'])
def deploy():
    db = dbOpenConn()

    id = db.converter.escape(request.json["id"])
    deployment = db.converter.escape(request.json["deployment"])

    query = f"UPDATE items SET deployment=\"{deployment}\" WHERE id=\"{id}\""
    cursor = db.cursor(dictionary=True)

    cursor.execute(query)
    db.commit()

    cursor.close()
    db.close()

    return Response(status=200)


@ app.route('/getall', methods=['GET'])
def getall():
    db = dbOpenConn()
    query = "SELECT * FROM items"
    cursor = db.cursor(dictionary=True)

    cursor.execute(query)

    response = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(response)


@ app.route('/remove', methods=['DELETE'])
def remove():
    pass


@ app.route('/update', methods=['POST'])
def update():
    pass


@ app.route('/search', methods=['GET'])
def search():
    searchterm = request.json["searchterm"]

    db = dbOpenConn()
    query = f"SELECT * FROM items WHERE name LIKE \"%{db.converter.escape(searchterm)}%\""
    cursor = db.cursor(dictionary=True)

    cursor.execute(query)

    response = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="localhost")
