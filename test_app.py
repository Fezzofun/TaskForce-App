from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "CORS is working!"})

if __name__ == '__main__':
    app.run(debug=True)