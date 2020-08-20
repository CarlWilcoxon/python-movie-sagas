import os
import psycopg2
from os.path import exists
from os import makedirs
from flask import Flask, jsonify
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

db = "dbname=%s host=%s " % ('saga_movies_weekend', 'localhost')
schema = "schema.sql"
conn = psycopg2.connect(db)

cur = conn.cursor()


@app.route('/movies', methods=['GET'])
def movieRouter():
  try:
    cur.execute("""SELECT * FROM movies ORDER BY title ASC""")
    rows = cur.fetchall()
    colnames = [desc[0] for desc in cur.description]
    cur.close()
    print(colnames)
    response = []
    for x in range( 0, len(rows) ):
      response.append({'id':rows[x][0]})
      for y in range(1, len(colnames)):
        response[x].update({colnames[y]:rows[x][y]})

    return jsonify(response)
  except Exception as e:
    print(e)
    return []

# router.put('/:id', (req, res) => {
#   // return all genres
#   const queryText = `UPDATE movies
#                     SET title=$1,
#                     description=$2
#                     WHERE ID=$3`;
#   const queryValues = [
#     req.body.title,
#     req.body.description,
#     req.body.id,
#   ]
#   pool.query(queryText, queryValues)
#       .then( (result) => {
#           res.sendStatus(200);
#       })
#       .catch( (error) => {
#           console.log(`Error on query ${error}`);
#           res.sendStatus(500);
#       });
# });


# module.exports = router;


@app.route('/details/<id>', methods=['GET'])
def detailRouter(id):
  try:
    cur.execute('''SELECT
      "movies"."title",
      "movies"."poster",
      "movies"."description",
      ARRAY_AGG("name") "genres"
    FROM "movies"
    JOIN "movies_genres" ON "movie_id" = "movies"."id"
    JOIN "genres" ON "genre_id" = "genres"."id"
    WHERE "movies"."id" = {}
    GROUP BY "movies"."id"
    ORDER BY "movies"."title" ASC'''.format(id))
    rows = cur.fetchall()
    colnames = [desc[0] for desc in cur.description]
    cur.close()
    print(colnames)
    response = []
    for x in range( 0, len(rows) ):
      response.append({'id':id })
      for y in range(0, len(colnames)):
        response[x].update({colnames[y]:rows[x][y]})
    print(response)
    return jsonify(response)
  except Exception as e:
    print(e)
    return []

@app.route('/genres', methods=['GET'])
def genreRouter():
  try:
    cur.execute("""SELECT * FROM genres ORDER BY id ASC""")
    rows = cur.fetchall()
    colnames = [desc[0] for desc in cur.description]
    cur.close()
    print(colnames)
    response = []
    for x in range( 0, len(rows) ):
      response.append({'id':rows[x][0]})
      for y in range(1, len(colnames)):
        response[x].update({colnames[y]:rows[x][y]})

    return jsonify(response)
  except Exception as e:
    print(e)
    return []


if __name__ == "__main__":
  app.run(debug=True)


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
