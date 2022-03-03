from flask import Flask, request, jsonify
from flask_cors import CORS

import mysql.connector

app = Flask(__name__)
CORS(app)


@app.route("/create", methods=["POST"])
def create():
    pass


@app.route('/deploy', methods=['POST'])
def deploy():
    pass


@app.route('/getall', methods=['GET'])
def getall():
    pass


@app.route('/remove', methods=['POST'])
def remove():
    pass


@app.route('/update', methods=['POST'])
def update():
    pass


@app.route('/search', methods=['GET'])
def search():
    pass


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
