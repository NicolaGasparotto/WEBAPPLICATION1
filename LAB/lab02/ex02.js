'use strict';

const dayjs = require("dayjs");
const sqlite = require("sqlite3");

// obj Film
function Film(id, title, favorite=false, date=null, score=null){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date && dayjs(date);
    this.score = score;
}

function printDate(date){
    if(date != null)
        return date.format('MMMM D, YYYY'); 
    else 
        return '<not defined>';
}

function printFilm(film){
    console.log(`Id: ${film.id}, Title: ${film.title},`,
    `Favorite: ${film.favorite}, Watch date: ${printDate(film.date)}, Score: ${film.score || '<not assigned>'}` );
}

function FilmLibrary(){
    let films = [];
    this.addNewFilm = film => { films.push(film) };
    this.sortByDate = () =>{ 
        let copy = [...films]; 
        
        // chiedere perchè non funziona se metto la parte di codice dentro la lambda dentro al sort in una function esterna con return 
        copy.sort((f1, f2) => {
            if(f1.date === f2.date)
                return 0;    // works also for null === null
            else if(f1.date === null || f1.date === '')
                return 1;    // null/empty date is the lower value
            else if(f2.date === null || f2.date === '')
                return -1;
            else
                return f1.date.diff(f2.date)
          });
         return copy;
    };
    this.deleteFilm = (id) => {
        films = films.filter( element => element.id !== id);
    };
    this.resetWatchedFilms = () => {
        films.forEach(element => { element.date = null; });
    };
    this.getRated = () => {
        films = films.filter(element => {return element.score !== null;}).sort( (f1, f2)=>{return f2.score - f1.score});
        this.print();
    };
    this.print = (vect=films) => { console.log('***** List of films *****'); vect.forEach(element => { printFilm(element) }); console.log('\n');};
}

const db = new sqlite.Database('films.db', (err) => {
    if(err) throw err;
});

function getAllFilm(){
    return new Promise((resolve, reject)=>{
        const sql = 'SELECT * FROM films';
        db.all(sql, (err, rows)=>{
            if(err)
                reject(err);
            else{
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    });
}

function getAllFavorite(){
    return new Promise((resolve, reject)=>{
        const sql = 'SELECT * FROM films WHERE favorite=1';
        db.all(sql, (err, rows)=>{
            if(err)
                reject(err);
            else{
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    });
}

function getAllTodayWatched(today){
    return new Promise((resolve, reject)=>{
        const sql = 'SELECT * FROM films WHERE watchdate=?';
        db.all(sql, [today], (err, rows)=>{
            if(err)
                reject(err);
            else{
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            }
        });
    });
}

function getAllFilmSince(date){

}

function getFilmGreaterScore(score){

}

function getFilmsIncludingTitle(subStringTitle){

}

function main(){
    /* Function to Testing */
    let films = getAllFilm()
                .then(f => {
                    let filmLibrary = new FilmLibrary();
                    f.forEach(element => filmLibrary.addNewFilm(element));
                    filmLibrary.print();
                });
    
    let favorites = getAllFavorite()
                    .then(f => {
                        let filmLibrary = new FilmLibrary();
                        f.forEach(element => filmLibrary.addNewFilm(element));
                        filmLibrary.print();
                    });

    let todayFilms = getAllTodayWatched('2023-03-10') 
                    .then(f => {
                        let filmLibrary = new FilmLibrary();
                        f.forEach(element => filmLibrary.addNewFilm(element));
                        filmLibrary.print();
                    });
}

main();
db.close();