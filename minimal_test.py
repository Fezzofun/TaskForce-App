from flask import Flask, jsonify

app = Flask(__name__)  # Initialize the Flask application

# Define a basic test route to verify the server is running
@app.route('/test', methods=['GET'])
def test_route():
    # Return a JSON response with a message
    return jsonify({"message": "Basic Flask test route is working!"})

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode