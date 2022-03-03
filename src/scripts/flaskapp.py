from unittest import result
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import mysql.connector as sql
from dotenv import load_dotenv
from os import getenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)


def dateToString(date):
    return date.strftime("%m/%d/%Y, %I:%M:%S %p")


# id, name, deployment, created, updated
# 0     1        2          3       4
def resultToJSON(result):
    pass


def dbOpenConn():
    return sql.MySQLConnection(
        user=getenv('USERNAME'),
        password=getenv('PASSWORD'),
        host=getenv('HOST'),
        database=getenv('DATABASE')
    )


@ app.route("/create", methods=["POST"])
def create():
    pass


@ app.route('/deploy', methods=['POST'])
def deploy():
    pass


@ app.route('/getall', methods=['GET'])
def getall():
    db = dbOpenConn()
    query = "SELECT * FROM items"
    cursor = db.cursor()

    cursor.execute(query)

    response = resultToJSON(cursor.fetchall())

    cursor.close()
    db.close()

    return Response(response, mimetype="application/json")


@ app.route('/remove', methods=['POST'])
def remove():
    pass


@ app.route('/update', methods=['POST'])
def update():
    pass


@ app.route('/search', methods=['GET'])
def search():
    pass


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="localhost")
