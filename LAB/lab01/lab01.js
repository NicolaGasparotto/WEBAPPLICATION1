'use strict';
/* exercise 0: Warm Up */ 
/*
let vectString = ['spring' , 'it' , 'cat', 'c' ];

let stringa = 'c';
let variable = stringa.substring(0, 2) + stringa.substring(stringa.length - 2);
console.log(variable)

function startEndString(element){
    element.forEach(value => {
        if(value.length > 1 ) console.log(value.substring(0, 2) + value.substring(value.length - 2));
        else console.log('');
    });
}

startEndString([stringa]); // se gli passo solo una stringa genera errore
startEndString(vectString);
*/

/* Exercise 1: */
const dayjs = require('dayjs');

function Film(id, title, favorite=false, date, score){
    this.id = parseInt(id);
    this.title = title;
    this.favorite = (favorite === 'true');
    this.date = date == null ? undefined : dayjs(date);
    this.score = score == null ? undefined : parseInt(score);
};
// prova per git dioca
function compareDate(d1, d2){ 
    if(d1.isAfter(d2))  
        return 1; 
        else return -1 
};

function FilmLibrary(){
    this.films = [];
    this.addNewFilm = (film) => {this.films.push(film)};
    this.print = () => { this.films.forEach(element => { console.log(element) });};
    this.sortByDate = this.films.sort((f1, f2) => { compareDate(f1.date, f2.date) } );
}

function fromStrToFilmObj(stringa){
    let variables = stringa.split(',');
    let notDefined = ['<not assigned>', '<not defined>'];
    let values = []; 
    variables.forEach(element => {
        let substring = element.split(':');
        if(notDefined.some(term => element.toLowerCase().includes(term))) 
            values.push(undefined);
        else 
            values.push((substring[1]).trim());
    });
    
    let film = new Film(...values);  
    return film;
}

let filmListStr = [
    'Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 25 2023, Score: 5',
    'Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17 2023, Score: 4',
    'Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not assigned>',
    'Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: 1',
    'Id: 5, Title: Shrek, Favorite: false, Watch date: March 21 2023, Score: 3'
];

let filmLibrary = new FilmLibrary(); 
filmListStr.forEach(element => { filmLibrary.addNewFilm(fromStrToFilmObj(element)) });
filmLibrary.print();


/* Esercizio 2: */
let var2 = [ undefined, dayjs('July 30 2020'), dayjs('July 17 2020'), undefined];
var2.sort( (d1,d2) => { compareDate(d1, d2)} );


filmLibrary.films.sort((f1, f2) => { compareDate(f1.date, f2.date) } );
/*
filmLibrary.films.forEach(element => {
   if(element.date != null ) console.log(element, "\nDate:", element.date.format('DD/MM/YYYY'));
   else console.log('null date');
});
//console.log(var2[0].format('DD/MM/YYYY'));
*/
