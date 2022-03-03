from unittest import result
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import mysql.connector as sql
from dotenv import load_dotenv
from os import getenv

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


@app.route("/create", methods=["POST"])
def create():
    pass


@app.route('/deploy', methods=['POST'])
def deploy():
    pass


@app.route('/getall', methods=['GET'])
def getall():
    db = dbOpenConn()
    query = "SELECT * FROM items"
    cursor = db.cursor(dictionary=True)

    cursor.execute(query)

    response = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(response)


@app.route('/remove', methods=['POST'])
def remove():
    pass


@app.route('/update', methods=['POST'])
def update():
    pass


@app.route('/search', methods=['GET'])
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
