'use strict';

const dayjs = require("dayjs");

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
    this.print = (vect=films) => { console.log('***** List of films *****'); vect.forEach(element => { printFilm(element) }); console.log('\n');};
}

function main(){
    /* Function to Testing */
    let f1 = new Film(1, 'Pulp Finction', true, '03-17-2023', 5);
    let f2 = new Film(2, 'Pulp Finction', true, '03-12-2023', 4);
    let f3 = new Film(3, 'Pulp Finction', false, null);
    let f4 = new Film(4, 'Pulp Finction', false, null);
    let f5 = new Film(5, 'Pulp Finction', false, 'March 30, 2023', 3);

    let filmLibrary = new FilmLibrary();
    filmLibrary.addNewFilm(f1);
    filmLibrary.addNewFilm(f2);
    filmLibrary.addNewFilm(f3);
    filmLibrary.addNewFilm(f4);
    filmLibrary.addNewFilm(f5);

    filmLibrary.print();

    filmLibrary.print(filmLibrary.sortByDate());
}

main();
