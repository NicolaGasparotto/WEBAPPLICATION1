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
            console.log(films);
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
exports.getFilm = () => {
};

// Creates a new film, by providing all relevant information – except the “id” that will be automatically assigned by the back-end.
exports.createFilm = () => {
};

// Updates an existing film, by providing all the relevant information, i.e., all the properties except the “id” will overwrite the current properties of the existing film. The “id” will not change after the update.
exports.updateFilm = () => {    
};

// Updates the rating of a specific film.
exports.updateRating = () => {
};

// Marks an existing film as favorite/unfavorite.
exports.markFavorite = () => {
};

// Deletes an existing film, given its “id”.
exports.deleteFilm = () => {
};

