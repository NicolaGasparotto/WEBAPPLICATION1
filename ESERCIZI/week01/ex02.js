"use strict";
// svtonyms.js

const names = " Luigi De Russis, Luca    Mannella, Fulvio Corno, Juan    Pablo Saenz Moreno , Enrico Masala, Antonio Servetti, Eros Fani";

const nameArray = names.split(','); // in this way spaces between names are not removed

for(let i = 0;i < nameArray.length; i++)
    nameArray[i] = nameArray[i].trim();

/*
for(let value of nameArray){
    value = value.trim();
}
*/ // this method it's not modifying the array, value its not saved anywhere. 
// it's not possibile to modify the object referenced in any way. 
// DOESN'T WORK   

// CREATE ACRONYMS

const acronyms = [];

for(const name of nameArray){
    const words = name.split(' '); // more than one separator creates empty elements
    // console.log(words);
    let initials = [];
    for(const word of words){
        if(word){
            initials = initials + word[0];
        }
    }
    acronyms.push(initials);
}


console.log(nameArray);
console.log(acronyms);
