from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Basic Flask test route is working!"})

if __name__ == '__main__':
    app.run(debug=True)
