'use strict';

import dayjs from 'dayjs';

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
        return date.format('LL'); 
    else 
        return '<not defined>';
}

function printFilm(film){
    console.log("****  Llist of Films  ****");
    console.log('Id: ${film.id}, Title: ${film.title},',
    'Favorite: ${film.favorite}, Watch date: ${printDate(film.date)}, Score: ${film.score}');
}

function FilmLibrary(){
    this.films = [];
    this.addNewFilm = film => { this.films.push(film) };
    this.print = () => { films.forEach(element => { printFilm(element) }) };
}

function main(){
    /* Function to Testing */
    let f1 = new Film(1, 'Pulp Finction', true, 'March 10, 2023', 5);
    let f2 = new Film(2, 'Pulp Finction', true, 'March 17, 2023', 4);
    let f3 = new Film(3, 'Pulp Finction', false, null);
    let f4 = new Film(4, 'Pulp Finction', false, null);
    let f5 = new Film(5, 'Pulp Finction', false, 'March 21, 2023', 3);

    filmLibrary = new FilmLibrary();
    filmLibrary.addNewFilm(f1);
    filmLibrary.addNewFilm(f2);
    filmLibrary.addNewFilm(f3);
    filmLibrary.addNewFilm(f4);
    filmLibrary.addNewFilm(f5);

    filmLibrary.print();
    
}

main();
