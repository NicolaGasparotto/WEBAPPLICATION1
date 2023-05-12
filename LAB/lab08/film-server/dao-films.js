'use strict';

/* 
    DB STRUCTURE:
    CREATE TABLE "films" (
        "id"	INTEGER,
        "title"	TEXT NOT NULL,
        "favorite"	BOOLEAN NOT NULL DEFAULT (0),
        "watchdate"	DATETIME,
        "rating"	INTEGER,
        PRIMARY AUTOINCREMENT KEY("id")
    );
*/

const sqlite = require('sqlite3');
const dayjs = require('dayjs');
const { Film } = require('./films');

// open the database
const db = new sqlite.Database('films.db', (err) => {
    if(err) throw err;
});

// Retrieves the list of all the available films.
function getAllFilms(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            const films = rows.map((e) => new Film(e.id, e.title, e.favorite, e.watchdate, e.rating));
            resolve(films);
        });
    });
};

// Retrieves a list of all the films that fulfill a given filter (i.e., the same filters described so far).
function getFavoriteFilms(){
  return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE favorite = True';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }else{
                const films = rows.map((e) => new Film(e.id, e.title, e.favorite, e.watchdate, e.rating));
                resolve(films);
            }
        });
    })
};

function getUnseenFilms(){
    console.log('here unseen');
  return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE watchdate IS NULL';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }else{
                const films = rows.map((e) => new Film(e.id, e.title, e.favorite, e.watchdate, e.rating));
                resolve(films);
            }
        });
    });
};

function getBestRatedFilms(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE rating = 5';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }else{
                const films = rows.map((e) => new Film(e.id, e.title, e.favorite, e.watchdate, e.rating));
                resolve(films);
            }
        });
    });
};

function getSeenLastMonthFilms(){
    return new Promise((resolve, reject) => {
        const isSeenLastMonth = (film) => {
            const diff = film.watchDate.diff(dayjs(),'month')
            const isLastMonth = diff <= 0 && diff > -1 ;      // last month
            return isLastMonth;
        }
        const sql = 'SELECT * FROM films WHERE watchdate IS NOT NULL';        
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }else{
                const films = rows.map((e) => new Film(e.id, e.title, e.favorite, e.watchdate, e.rating));
                const tmp = films.filter((f) => isSeenLastMonth(f));
                resolve(tmp);
            }
        });
    });
};

// TO DO: implement a way to declare the keys of tha cases from a input element that will be the same for all the structures fot filter in the fututre
exports.getFilmsByFilter = (filter) => {
  switch(filter){
        case 'favorite':
          return getFavoriteFilms();
        case 'unseen':
          return getUnseenFilms();
        case 'bestRated':
          return getBestRatedFilms();
        case 'lastmonth':
          return getSeenLastMonthFilms();
        case 'all':
          return getAllFilms();
        default:
          return throwError('Filter not found');
    }
};



// Retrieves a film, given its “id”.
exports.getFilm = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM films WHERE id=?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row == undefined) {
          resolve({error: 'Question not found.'});
        } else {
          const film = new Film(row.id, row.title, row.favorite, row.watchdate, row.rating);
          resolve(film);
        }
      });
    });
};

// Creates a new film, by providing all relevant information – except the “id” that will be automatically assigned by the back-end.
exports.createFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films(title, favorite, watchdate, rating, user) VALUES(?,?,?,?,1)';
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating], function(err) {
            if(err){
                reject(err);
                return;
            }
            resolve(this.changes); // 
        });
    });
};

// Updates an existing film, by providing all the relevant information, i.e., all the properties except the “id” will overwrite the current properties of the existing film. The “id” will not change after the update.
exports.updateFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id=?';
        db.run(sql, [film.title, film.favorite, film.watchdate, film.rating, film.id], function(err) {
            if(err){
                reject(err);
                return;
            }
            resolve(this.changes); // returns how many rows were changed
        });
    });
};

// Updates the rating of a specific film.
exports.updateRating = (film, newRating) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET rating=? WHERE id=?';
        db.run(sql, [newRating, film.id], function(err) {
            if(err){
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

// Marks an existing film as favorite/unfavorite.
exports.markFavorite = (film, newFavorite) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET favorite=? WHERE id=?';
        db.run(sql, [newFavorite, film.id], function(err) {
            if(err){
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

// Deletes an existing film, given its “id”.
exports.deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM films WHERE id=?';
        db.run(sql, [id], function(err) {
            if(err){
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

