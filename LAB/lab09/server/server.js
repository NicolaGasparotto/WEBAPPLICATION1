'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors'); // cross-origin resource sharing

const dao = require('./dao-films'); // module for accessing the DB


// init express
const app = express();
const port = 3000;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

/*** APIs ***/
/** IN THIS SECTION THERE WILL BE ALL THE POSSIBLE ROUTES **/

const filters = [ 'All', 'Favorites', 'Unseen', 'SeenLastMonth', 'BestRated' ];
filters.map( (filter) =>{
  app.get(`/api/${filter}`, (req, res) => {
    dao.getFilmsByFilter(filter)
    .then(films => res.json(films))
    .catch((error) => res.status(500).send(error));
  })}
);

app.get('/api/film/:id', (req, res) => {
  dao.getFilm(req.params.id)
  .then(film => res.json(film))
  .catch(error => res.status(500).send(error));
});

// create a new film by a given JSON body
app.post('/api/add', (req, res) => {
  const film = req.body;
  dao.createFilm(film)
  .then(film => res.json(film))
  .catch((error) => res.status(500).send(error));
});

// edit a film by a given JSON body with a specific id
app.put('/api/edit/:filmId', (req, res) => {
  const film = req.body;
  film.id = req.params.filmId;
  console.log(film);
  dao.updateFilm(film)
  .then(film => res.json(film))
  .catch(error => res.status(500).send(error));
});

app.delete('/api/film/:filmId', (req, res) => {
  dao.deleteFilm(req.params.filmId)
  .then(film => res.json(film))
  .catch(error => res.status(500).send(error));
});

/*** Other express-related instructions ***/

// Activate the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});