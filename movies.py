# import os
# import psycopg2
# from flask import Flask, render_template
# import urlparse
# from os.path import exists
# from os import makedirs

# cur = conn.cursor()

# app = Flask(__name__)

# @app.route('/')
# def hello():
#     return 'Hello World!'

# @app.route('/contacts')
# def contacts():
#     try:
#         cur.execute("""SELECT name from salesforce.contact""")
#         rows = cur.fetchall()
#         response = ''
#         my_list = []
#         for row in rows:
#             my_list.append(row[0])

#         return render_template('template.html',  results=my_list)
#     except Exception as e:
#         print e
#         return []

# if __name__ == '__main__':
#     app.run()

import os
import psycopg2
# from urllib.parse import urlparse
from os.path import exists
from os import makedirs
from flask import Flask, render_template
app = Flask(__name__)
# config = {
#         user: process.env.PG_USER || null, //env var: PGUSER
#         password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
#         host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
#         port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
#         database: process.env.DATABASE_NAME || 'saga_movies_weekend', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
#         max: 10, // max number of clients in the pool
#         idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
#     };

# url = urlparse(os.environ.get('DATABASE_URL'))
db = "dbname=%s host=%s " % ('saga_movies_weekend', 'localhost')
schema = "schema.sql"
conn = psycopg2.connect(db)

cur = conn.cursor()


@app.route('/movies', methods=['GET'])
def movies():
  try:
    cur.execute("""SELECT * FROM movies ORDER BY title ASC""")
    rows = cur.fetchall()
    response = ''
    my_list = []
    for row in rows:
      my_list.append(row[0])

    return render_template('template.html',  results=my_list)
  except Exception as e:
    print(e)
    return []




# router.get('/', (req, res) => {
#     // return all categories
#     const queryText = `SELECT * FROM movies ORDER BY title ASC`;
#     pool.query(queryText)
#         .then( (result) => {
#             res.send(result.rows);
#         })
#         .catch( (error) => {
#             console.log(`Error on query ${error}`);
#             res.sendStatus(500);
#         });
# });


@app.route('/<name>')
def hello_name(name):
  return "Hello, {}!".format(name)

if __name__ == "__main__":
  app.run()


# const express = require('express');
# const app = express();
# const bodyParser = require('body-parser');
# const port = process.env.PORT || 5000;

# // require routers
# const detailsRouter = require('./routes/details.router');
# const genresRouter = require('./routes/genres.router');
# const moviesRouter = require('./routes/movies.router');

# /** ---------- MIDDLEWARE ---------- **/
# app.use(bodyParser.json()); // needed for angular requests
# app.use(express.static('build'));

# /** ---------- ROUTES ---------- **/
# app.use('/details', detailsRouter);
# app.use('/genres', genresRouter);
# app.use('/movies', moviesRouter);


# /** ---------- START SERVER ---------- **/
# app.listen(port, function () {
#     console.log('Listening on port: ', port);
# });
