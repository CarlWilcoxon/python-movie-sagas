# REST API in Python
_Duration: 4 hours_

## Installation

1. `npm install` the nessecary node components
2. Use `python3 -m venv venv` to create a local virtual environment to work in
3. Activate the virtual environment
4. Use `pip3 install -r requirements.txt` to install all the needed python files
5. Setup a postgresql database using the queries in `database.sql`
6. Use python3 to run the server `movies.py`
7. `npm run client` starts up the JavaScript client

## How it works (I think)

- The first line (after imports) and the last couple lines work together to start the server when the script is run and keep it running as long as the script is being run __name__ becomes __main__ while a script is running, and by passing the script into Flask() we are making this script a Flask app. (I'm far from certain about how Flask functions)
- Next we set some global variables so the app knows how to talk with the database and initialize a psycopg2 connection and a cursor, which is how we will be making SQL queries.
- `@app.route` is used to define how the server will respond to different requests. I use loops to organize the data and `jsonify()` to convert it into something that JavaScript can understand easily.
