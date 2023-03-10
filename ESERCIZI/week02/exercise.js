'use strict';

function Answer(text, author, score, date){
    this.text;
    this.author = author;
    this.score = score;
    this.date = date;
}

function Question(text, author, date){
    this.text = text;
    this.author = author;
    this.date = date;
    this.answers = [];

    this.add = (answer) => {this.answers.push(answer)};
    //this.findAll = function(author){ return this.answers.filter((a) => (a.author == author)); };
    this.findAll = author => this.answers.filter( a => (a.author == author));  // equal
}

const q1 = new Question('What day is it?', 'Fulvio', '2023-03-07');
q1.add(new Answer('Tuesday', 'Clever guy', 0, '2023-03-07'));

console.log(q1);
// debugger;
console.log(q1.findAll('Clever guy'));
console.log(q1.findAll('Other guy'));
