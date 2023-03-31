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
    this.films = [];
    this.addNewFilm = (film) => { this.films.push(film); };
    this.sortByDate = () =>{ 
        let copy = [...this.films]; 
        
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
        this.films = this.films.filter( element => element.id !== id);
    };
    this.resetWatchedFilms = () => {
        this.films.forEach(element => { element.date = null; });
    };
    this.getRated = () => {
        this.films = this.films.filter(element => {return element.score !== null;}).sort( (f1, f2)=>{return f2.score - f1.score});
        this.print();
    };

    this.getFavorites = () => {
        return this.films.filter(element => element.favorite);
    };

    this.getBestFilms = () =>{
        const bestFilms = this.films.filter(element => element.score > 4);
        return bestFilms;
    };

    this.getLastMonthFilms = () => {
        const lastMonthStart = dayjs().subtract(1, 'month').startOf('month');
        const lastMonthFilm = this.films.filter(element => element.date.isBetween(lastMonthStart, dayjs(), null, '[]'));
        return lastMonthFilm;
    };

    this.getUnseen = () => {
        const unseen = this.films.filter(element => element.date == null);
        return unseen;
    };

    this.print = (vect=this.films) => { console.log('***** List of this.films *****'); vect.forEach(element => { printFilm(element) }); console.log('\n');};
}

function main(){
    /* Function to Testing */
    let filmLibrary = new FilmLibrary();
    
    filmLibrary.addNewFilm(new Film(1, 'Pulp Finction', true, '03-17-2023', 5));
    filmLibrary.addNewFilm(new Film(2, '21 Grams', true, '03-17-2023', 4));
    filmLibrary.addNewFilm(new Film(5, 'Shrek', false, 'March 30, 2023', 3));
    filmLibrary.addNewFilm(new Film(3, 'Star Wars', false));
    filmLibrary.addNewFilm(new Film(4, 'Matrix', false));

    for(const filmo of filmLibrary.getBestFilms()){
        console.log(filmo);
    }

    console.log('2');
    const prova = filmLibrary.getUnseen();
    console.log(typeof(prova), prova);
    for(const filmo of filmLibrary.getFavorites()){
        console.log(filmo);
    }

    console.log('fine');
    /*
    console.log('Initial Values: ');
    filmLibrary.print();

    console.log('SortByDate Values: ');
    filmLibrary.print(filmLibrary.sortByDate());
    //                          ^^^^^^^^^^^^^^ returning a NEW ARRAY which is sorted by means of date
    
    console.log('Deleting Value by Id: ');
    filmLibrary.deleteFilm(4);
    filmLibrary.print();

    console.log('Values by Score: ');
    filmLibrary.getRated(); // print inside the method
    
    console.log('Values with resetted Dates: ');
    filmLibrary.resetWatchedFilms();
    filmLibrary.print();
    */
}

main();
