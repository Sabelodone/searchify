# backend/app.py
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Define a route to handle GET requests for job listings
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    description = request.args.get('description', '')  # Get the 'description' query parameter from the request
    location = request.args.get('location', '')        # Get the 'location' query parameter from the request

    # Make a request to the GitHub Jobs API
    url = f'https://jsonplaceholder.typicode.com'
    response = requests.get(url)

    if response.ok:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch jobs from GitHub Jobs API'})

if __name__ == '__main__':
    app.run(debug=True)
    