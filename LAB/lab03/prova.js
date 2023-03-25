'use strict';

let vect = [5, 2, 1, 6, null, 3, null];


let vars = vect.filter( elements => {return elements !== null }).sort((a,b)=> {return b - a });
//             ^^^^^^^ filter restituisce un NUOVO VETTORE, mentre ^sort^ semplicemente modifica il vettore iniziale

console.log(vars);
