from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)  # Initialize the Flask application
CORS(app)  # Enable CORS for all routes

# Define a test route to verify that CORS functionality works
@app.route('/test', methods=['GET'])
def test_route():
    # Return a JSON response with a message
    return jsonify({"message": "CORS is working!"})

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode